# NSRM V3.84.0 迁移改造技术方案

> 文档状态：评审稿 v2.0（AI 模块化接手 + 旧系统维护 + NSRM_Core 原地升 net10）
> 适用范围：`E:\svn\dev\nsrm\V3.84.0` 代码库
> 编写依据：基于对仓库实际代码、依赖清单、.NET 官方支持策略的核查

---

## 1. 背景

### 1.1 项目现状
`NSRM V3.84.0` 是一套企业级 .NET 采购/供应链管理系统，代码库目前呈 **双栈并存** 状态：

- **旧栈 `ZT.SRM.*`（.NET Framework 4.5.2）**：经典三层架构（`IBLL / IDAL / BLL / DAL / Model`）+ ASP.NET MVC（`AdminUI`、`SupplierUI`，Razor + 大量 JS），数据层为 **EF6 Database-First（`.edmx`）**，配合 Quartz、Redis、MongoDB、WindowsService、Log4net、Apollo，`packages.config` 管理依赖。
- **新栈 `NSRM_Core`（.NET 5，已建）**：`NSRM.Client.Api`（ASP.NET Core）+ `ApiExternal / Services / Repository / Model / Tool`，前端 `WebFront` 已是 **Vue3 + Vite + TypeScript** SPA。新栈已包含约 40 个业务服务（`NSRM.Client.Services`，覆盖合同、采购计划、检验、供应商、商品、订单、权限等），已引用 `Core.External.AuthCenter.ServiceExtend.SDK` 做 JWT 鉴权。

### 1.2 为什么要改造
- **旧栈框架已 EOL**：.NET Framework 4.5.2 早已停止支持，存在安全与合规风险；但旧系统业务逻辑庞大，全量重写成本过高。
- **移动端 / 新能力需要现代框架**：H5 移动端、AuthCenter JWT、现代内部包（`ZT.Core.*`）要求 netstandard2.0+ / net6+，旧 net452 支持极差。
- **避免重复造轮子**：新栈 `NSRM_Core` 已覆盖大部分核心业务域且已是 ASP.NET Core，应**原地升级到 .NET 10** 作为统一目标，而非另起新框架。

### 1.3 已确认的关键决策
| 项 | 决策 |
|---|---|
| 改造形态 | **旧系统维护 + NSRM_Core 原地升 net10 作目标**：`ZT.SRM`(net452) 进入**维护态**，由 **AI 全托管维护**（读懂旧代码、修 bug/小修）；仅改造量大的模块才迁入 `NSRM_Core`(net10) 用新框架模式重写，**新作的接口在 NSRM_Core 实现**；不再新建独立框架 |
| 目标框架 | **.NET 10 LTS**（应用于 `NSRM_Core` / 迁入的新模块；旧 `ZT.SRM` 维持 net452 维护，**不升级**） |
| 运行约束 | **新旧双栈独立部署 + 独立子域名隔离**；由**外部菜单/角色权限**按菜单路径切割，可灰度、可回滚 |
| 数据层 | 迁入 `NSRM_Core` 的模块用 **SqlSugar**（新栈已采用）；旧系统维持 EF6 不动 |
| 移动端 | 经 `NSRM.Client.ApiExternal`（升级到 net10，已含 AuthCenter.SDK），H5 形态；旧 net452 不承接移动端 |
| AI 职责边界 | 旧系统 = **AI 全托管维护**（同框架内改）；新接口/大改模块 = **在 NSRM_Core(net10) 新建实现** |

---

## 2. 现状诊断（代码事实）

### 2.1 代码量统计（排除 bin/obj/.vs/packages/node_modules 与二进制）
| 类型 | 行数 | 文件数 |
|---|---|---|
| 源码合计 | **1,717,758** | 8,509 |
| ├ C# (.cs) | 644,306 | — |
| ├ JS (.js) | 424,885 | — |
| ├ cshtml (.cshtml) | 186,106 | — |
| ├ Vue (.vue) | 137,440 | — |
| ├ json / css / xml / ts / edmx / html / resx 等 | 约 324,021 | — |

> 含全部文件（字体/dll/图片等二进制）总计 3,812,108 行 / 10,076 文件。

### 2.2 前后端分布
- **前端**（js/ts/tsx/vue/css/less/scss/html）：约 **681,498** 行，主要分布在 `WebFront`、`ZT.SRM.AdminUI`、`NSRM_Core`。
- **后端**（cs/cshtml/edmx/resx/config/csproj/xml/json/sln 等）：约 **1,036,260** 行，分布在新旧栈各项目。

### 2.3 依赖事实
- 旧栈使用 `EntityFramework 6.1.3`（DB-First，`.edmx` 约 28k 行）、`Autofac.Mvc5`、`Microsoft.AspNet.Mvc/WebApi/Owin/Identity`、`Quartz 2.4.1`、`StackExchange.Redis 1.2.1`、`DevExpress 11.1`、`Topshelf 3.3.1`、`log4net 2.0.13`、`Newtonsoft.Json 6.0.4`、`MySql.Data 6.9.9` 等（共 13 个 `packages.config`）。
- 新栈(`NSRM_Core`)使用 `SqlSugarCore`（`BaseNewRepository.cs` 已确认）、`Swashbuckle.AspNetCore 5.6.3`、`Microsoft.AspNetCore.SignalR.Client 5.0.17`、`Quartz.Plugins 3.3.2` + `Autofac.Extras.Quartz 6.0.0`、`DinkToPdf`、`iTextSharp.LGPLv2.Core`、`ExcelDataReader`、`RazorEngineCore`，以及公司内部包 `ZT.Core.*` / `Core.External.*.SDK` / `Core.BT.*` / `TableDataSys.SDK`。

---

## 3. 总体策略

### 3.1 目标态架构
| 维度 | 旧系统 `ZT.SRM`(net452) | 目标 `NSRM_Core`(net5→net10) |
|---|---|---|
| 组成 | MVC + EF6 + 旧认证(`ZT.FCL.Authentication`) | `Api` + `ApiExternal`(移动出口) + `Services`(SqlSugar) + H5/Vue3 |
| 定位 | **维护态**：AI 全托管维护，修 bug/小改，**不升框架** | 新业务/移动接入面；**大改模块迁入重写**的承载；新接口在此实现 |
| 是否改动框架 | 否（保持 net452） | 是：net5 → net10（原地升级，已是 Core，低成本） |

- **两套独立部署**：旧 `ZT.SRM`(net452) 与 新 `NSRM_Core`(net10) 是**不同的应用/解决方案**，不混编框架、不互相项目引用。二者仅通过 **同一数据库** 与 **外部菜单/子域名** 关联——这从结构上彻底隔离了"人/AI 改同一处"和"发布时间不一致"的冲突（见 §11）。
- **共享基础设施**：同一数据库（双栈同库）、Apollo 配置、Redis、MongoDB、AuthCenter SSO。

### 3.2 模块迁移判定规则
- **改造量小 / 稳定模块** → 留在 `ZT.SRM`(net452)，由 **AI 全托管维护**（同框架内修 bug、小修小补，不升框架、不大改）。
- **改造量大 / 需新能力（移动端、新交互、性能、脱旧依赖）的模块** → 迁入 `NSRM_Core`(net10)，用 `Services + SqlSugar Repository + DTO` 重写，**新接口在 NSRM_Core 实现**；旧路径经外部菜单切到新子域。
- 判定由"模块改造评估"决定，而非一刀切。

### 3.3 灰度与回滚（菜单模块级）
- 以**菜单模块**为最小迁移单位；迁入 `NSRM_Core` 的模块独立可灰度、可回切；双栈同库保证数据一致性。
- 旧系统 AI 维护与 NSRM_Core 升级**各自独立发布**，互不影响（独立部署）。

### 3.4 菜单/角色切割与子域名隔离
- **独立子域名**：旧 `old-nsrm.xxx.com`（net452，旧认证）；新 `new-nsrm.xxx.com`（net10，JWT/AuthCenter）。两者并行运行。
- **切割由外部菜单系统完成（NSRM 不改造菜单）**：在外部系统新增该模块的新菜单项（不同路径）并绑定**试点角色**，原菜单项保留给原角色。用户看到哪个菜单取决于角色权限。
- **角色灰度**：试点角色用户走新子域；验证通过后扩大角色范围直至全量。回滚只需把菜单项指回旧路径。
- **共享登录态**：`NSRM_Core` 用 Bearer JWT（不绑定 Cookie 域），同一门户登录在旧/新子域通用，无跨域 Cookie 问题（详见 §10）。

### 3.5 移动端接入（H5 形态）
- **形态：H5（可封装为 App）**：移动端采用 H5（响应式 Vue3），可作企业微信/钉钉/H5 微应用或浏览器入口，亦可用 WebView/Capacitor/uni-app 封装成 App。
- **移动端 API 出口**：复用 `NSRM.Client.ApiExternal`（升级 net10，已含 `AuthCenter.SDK`）作为对外/移动 API 出口；H5 前端在 `NSRM_Core` 上对接 `ApiExternal`。**移动端不接旧 net452**。
- **鉴权**：`NSRM_Core` 沿用既有 JWT 鉴权（基于 `AuthCenter.SDK`）；H5/移动端用安全存储保存 token，请求带 `Authorization: Bearer`，无 Cookie/Session。
- **CORS**：`AddCorsSetup` 放开企业微信/钉钉域名或封装 App scheme。
- **实时/推送**：复用 `NSRM_Core` 已有 SignalR 经 WebSocket；原生推送（APNs/FCM）仅封装 App 场景另行评估。

### 3.6 原生 App vs H5 选型对比
| 维度 | 原生 App | H5（已选） |
|---|---|---|
| 开发/维护 | 双端独立，成本高，发版走商店 | 复用 Vue3 WebFront，单代码库，迭代快 |
| 入口 | 应用商店下载 | 企业微信/钉钉/H5 微应用、浏览器；可 WebView/Capacitor/uni-app 封装 |
| 设备能力 | 完整 | 受浏览器限制，经 JSBridge/宿主能力补齐大部分 |
| 推送 | APNs/FCM 原生 | 依赖宿主或 SignalR 长连 |
| 性能/体验 | 最佳 | 内部业务系统足够 |
| 与现有栈契合 | 需另起移动客户端工程 | 直接复用 WebFront + `ApiExternal` |

---

## 4. 目标框架选型：.NET 10 LTS

### 4.1 官方支持周期（截至 2026-08）
| 版本 | 类型 | 支持截止 | 状态 |
|---|---|---|---|
| .NET 8 | LTS | **2026-11-10** | 约 3 个月后 EOL |
| .NET 9 | STS | **2026-11-10** | 约 3 个月后 EOL |
| .NET 10 | LTS | **2028-11-14** | 当前最新、受支持 |

> 微软已将 STS 支持从 18 个月延长至 24 个月，故 net8 与 net9 同在 2026-11-10 EOL。

### 4.2 选型结论
- **`NSRM_Core` 直接锁定 .NET 10 LTS**：net8 / net9 将在 3 个月内 EOL，升到即将 EOL 的版本无意义。
- 内部 `ZT.Core.*` 等包已被 net9 项目验证，对 net9 / netstandard2.0 资产在 net10 下完全兼容（运行时前滚），原"内部 SDK 阻塞"风险基本消失。
- **旧 `ZT.SRM`(net452) 不升级**：维持维护态，规避"单解决方案混编框架"的编译死结。

---

## 5. 第三方组件影响与升级矩阵（NSRM_Core net5 → net10）

### 5.1 升级清单
| 包 | 当前 | net10 建议 | 说明 |
|---|---|---|---|
| `Swashbuckle.AspNetCore` | 5.6.3 | **≥6.5（或 v10）** | 5.x 不支持 net10；v10 原生支持 net10（见 §6.4） |
| `Microsoft.AspNetCore.SignalR.Client` | 5.0.17 | **10.0.0** | 跟随框架，API 稳定 |
| `System.Text.Encoding.CodePages` | 7.0.0 | **10.0.0** | 跟随框架 |
| `SqlSugarCore` | 5.1.4.169 | **最新 5.1.x** | 已在新栈使用，跨框架 ORM |
|/| | | |
| `iTextSharp.LGPLv2.Core` | 3.4.17 | 最新 3.x | netstandard2.0，兼容 |
| `ExcelDataReader` | 3.9.0 | 3.9.0+ | netstandard，兼容 |
| `RazorEngineCore` | 2024.4.1 | 最新 | netstandard，兼容 |
| `JWT.Extensions.AspNetCore` | 8.2.0 | 最新 | netstandard，兼容 |
| `Quartz.Plugins` | 3.3.2 | **3.8+** | 3.8+ 支持 net8/net10 |
| `Autofac.Extras.Quartz` | 6.0.0 | **10.0.0** | 升 Autofac 8 + Quartz 3.8.1 |
| `Flurl.Http.Newtonsoft` | 0.9.1 | 换 `Flurl.Http` 4.x（用 STJ） | 旧变体 |
| `DotXxlJob.Core` | 2.3.6 | 最新 | 验证 netstandard |
| `DinkToPdf` | 1.0.8/1.1.0 | 托管层兼容 | ⚠️ 依赖原生 libwkhtmltox 部署 |
| `SmartThreadPool.dll` | 2.3.0 | **建议弃用** | 老旧线程池 → Task/Parallel/Channel |
| `ZT.Core.*`（内部） | 1.1.x | **需验证 net10/net9/netstandard 资产** | P0 验证 |
| `Core.External.*.SDK` / `Core.BT.*` / `TableDataSys.SDK`（内部） | 1.x | **需验证** | P0 验证 |

### 5.2 旧栈依赖（仅作"若逻辑需复用"的参考，旧栈终将退役）
旧栈依赖（`EntityFramework 6`、旧 MVC/WebApi、Quartz 2.4.1、`DevExpress 11.1`、`Topshelf 3.3.1`、`MySql.Data 6.9.9` 等）在维护期内**不升级**；仅当模块迁入 `NSRM_Core` 时，才按 §5.1 / 新栈模式重写对应能力。

---

## 6. net5 → net10 破坏性变更清单（NSRM_Core 升级）

### 6.1 宿主 / Startup
- 现有 `Program.cs + Startup.cs`（Generic Host + `UseStartup<Startup>()`）在 net6+ **仍然支持**，可直接升 net10。
- 可选现代化：将 `Startup` 内联进 `Program.cs`，建议留到稳定后做。
- `NSRM.Client.Services` 若使用 ASP.NET 类型，需确认 `<FrameworkReference Include="Microsoft.AspNetCore.App" />`。

### 6.2 System.Text.Json 序列化（最易"编译过、运行错"）
- net5→net10 间 `JsonSerializerOptions` 默认值多次变化。API 返回 DTO 与 JWT 载荷需一致性。
- 对策：在 `AddJsonOptions` 显式锁定 `PropertyNameCaseInsensitive`、`PropertyNamingPolicy`。

### 6.3 转发头 / 代理（net8 行为变更）
- net8 起 `ForwardedHeaders` 默认忽略未知代理的 `X-Forwarded-*`。走网关/YARP 时须 `UseForwardedHeaders` + `KnownProxies`/`KnownNetworks`。

### 6.4 Swagger / Swashbuckle（5.6.3 → net10）
- 5.x→6.x 主 API 稳定；v10 依赖 `Microsoft.OpenApi v2.3`，公共 API 大改（命名空间/类型改接口）。**建议**先升 6.x 最新版（低风险），稳定后再评估 v10。

### 6.5 Quartz（3.3.2 → 3.8+）
- API 基本兼容；配套 `Autofac.Extras.Quartz` 升 10.0.0。
- ⚠️ **双栈并行互操作告警**：Quartz 3.3.x（旧）与 3.8.x（新）跨组件通信会报 `RemotingException`。维护期旧 `ZT.SRM.QuartzTask` 与新 `NSRM.Tool` 共享 job store/远程调度时，必须**统一 Quartz 大版本或彻底隔离调度器**。

### 6.6 SignalR / 6.7 SqlSugar / 6.8 其它
- SignalR 5.0.17→10.0.0 公共 API 极稳；SqlSugar 升包即可，核对 `DbType`/`ConnectionConfig`/AOP 签名；`ISystemClock`→`TimeProvider`；日志过滤默认变化需核对 `appsettings`。

---

## 7. 分阶段实施计划

### P0 地基与可行性验证（1–2 周，先于一切业务代码）
1. **内部包 net10 资产验证**：确认 `ZT.Core.*` / `Core.External.*.SDK` / `Core.BT.*` / `TableDataSys.SDK` 有 net10/net9/netstandard2.0 资产（`ZT.Core.WebFramework.AddAuth`、`Core.External.AuthCenter.ServiceExtend.SDK` 关键）。
2. **NSRM_Core 原地升 net10 骨架**：net5→net10（改 TargetFramework + 升包 + 编译修复），跑通启动、健康检查、Apollo；旧 `ZT.SRM`(net452) 保持不改动。
3. **SSO/身份对齐**：确认门户 SSO 与 `NSRM_Core` 现有 AuthCenter JWT 一致；移动端经 `ApiExternal` 的 Bearer 互通。
4. **菜单/角色切割**：外部系统新增试点菜单项绑定试点角色，NSRM 代码内无需路由/feature-flag。
5. **移动端出口验证**：`ApiExternal`(net10) 对接可行性 + H5 形态。
6. 编译冒烟：net10 模板引用内部包跑通 CI。

### P1 旧系统 AI 全托管维护机制落地（贯穿全程）
- 建立"旧系统代码地图"：按模块梳理 `ZT.SRM` 的 `BLL/DAL/Model/Controller`、EF6 `.edmx`、旧认证 `ZT.FCL.Authentication`、授权 `ZTAuthorizeAttribute`，供 AI 接手时检索（详见 §11）。
- 旧系统维护走固定分支/PR 流程，AI 改 bug 不升框架、不触架构。

### P2 按菜单模块迁入 NSRM_Core（每模块独立回滚 + 角色灰度）
- 顺序：先迁新栈已覆盖且低耦合模块，再迁核心模块。
- 每模块：在 `NSRM_Core` 实现 `Service` + `SqlSugar Repository` + DTO + 前端页(Vue3)；**新接口在 NSRM_Core 实现**，旧 `ZT.SRM` 对应模块保留作兜底。
- 切割：外部菜单将该模块菜单指向新子域；验证后扩大角色直至全量。回滚指回旧路径。
- 后台任务：`ZT.SRM.QuartzTask` → `NSRM.Tool`（Worker），注意 §6.5 Quartz 版本统一。

### P3 前端迁移
- `WebFront`(Vue3) 为终态，按页将 `AdminUI/SupplierUI` 的 `.cshtml`+JS 迁到 SPA；未迁移页用反向代理/iframe 共存。

### P4 退役
- 旧域流量归零、模块全部迁完后，旧 `ZT.SRM.*` 进入只读归档，最终下线。

---

## 8. 新技术方式建议（现代化机会，限 NSRM_Core）
- **弃用 `SmartThreadPool`** → `Task / Parallel / Channel`。
- **替换 `DinkToPdf` 原生依赖** → 纯托管方案（`QuestPDF`/`Playwright`）。
- **可选**：Controller → Minimal API；分层 → Vertical Slice（非必须）。
- **不推荐**：在维护期动旧栈架构、或把 SqlSugar 换成 EF Core（与"复用 NSRM_Core"目标冲突）。

---

## 9. 风险与对策
| 风险 | 对策 |
|---|---|
| 内部 `ZT.Core.*` / 外部 SDK 无 net10 资产 | P0 验证；若仅 net452/net5 需包 owner 重发 |
| 旧系统 AI 改出回归（无测试覆盖） | §11 质量闸门：先补表征测试 / 小步 PR / 人工 review |
| 旧系统与新 NSRM_Core 同库写冲突 | 维护期旧栈主写、新栈迁入模块按表归属；Schema 变更走统一评审，避免并行 DDL |
| Quartz 双版本互操作 | 灰度期统一 Quartz 大版本或隔离调度器 |
| 网关转发头丢失 | 新子域前置代理时 `UseForwardedHeaders` + `KnownProxies` |
| JSON 行为前后不一致 | `AddJsonOptions` 显式锁定序列化选项 |
| 身份源不一致 | 新 NSRM_Core 统一信任 AuthCenter JWT；旧系统维护期保留旧认证 |
| AI 与人工并发改旧系统同模块 | §11 模块锁 + 单一所有者 + 分支隔离 |

---

## 10. 登录校验改造方案

### 10.1 现状
- **旧栈**：`App_Start\Startup.Auth.cs` 中 `UseCookieAuthentication` 已注释，认证由 `ZT.FCL.Authentication` 独立完成（自带 `Users/Roles/Permissions` + `LoginController` + `DESEncrypt/MD5`），授权靠 `ZTAuthorizeAttribute`（Session + URL 列表）。
- **新栈 `NSRM_Core`**：`services.AddAuth(Configuration)`（`ZT.Core.WebFramework`）做 **JWT Bearer** 校验，引用 `Core.External.AuthCenter.ServiceExtend.SDK` 对接外部 AuthCenter。无登录页。

### 10.2 改造原则
- **旧系统维护期保留旧认证**（`ZT.FCL.Authentication` + `ZTAuthorizeAttribute`）不变，AI 维护不触认证。
- **NSRM_Core(net10) 沿用既有 JWT/AuthCenter 鉴权**：迁入模块、移动端、`ApiExternal` 统一 Bearer JWT，无需新建登录体系。
- 仅当 P0 发现 `AddAuth` 无 net10 资产时，用 `Microsoft.AspNetCore.Authentication.JwtBearer` 10.x 显式注册等效校验（代码见 v1.x §10.4）。

### 10.3 迁移期双轨共存
- 试点期：旧子域走旧认证，新子域走 JWT(AuthCenter)，互不影响；靠菜单角色把试点用户指到新子域。
- 后期：模块迁完、旧栈退役，`ZT.FCL.Authentication` 整模块随旧系统下线，全系统统一 AuthCenter JWT。

---

## 11. AI 全托管接手与冲突管控（核心）

本策略下，AI 承担两类工作，机制不同：

### 11.1 两类工作边界
| 工作 | 位置 | AI 动作 | 框架 |
|---|---|---|---|
| 旧系统维护 | `ZT.SRM`(net452) | **全托管**：读懂旧代码逻辑、修 bug、小修小补 | 不升级 |
| 大改模块 / 新接口 | `NSRM_Core`(net10) | **新建实现**：用 Services+SqlSugar 重写，新接口在此落地 | net10 |

二者是**独立部署的应用**，AI 在旧系统的改动与 NSRM_Core 的改动**不会编译期冲突**；发布节奏相互独立，从根本上化解"人/AI 改同一处""发布时间不一致"的担忧。

### 11.2 旧系统 AI 全托管维护机制
- AI 接手前先构建**模块级代码地图**：梳理 `BLL/IBLL/DAL/IDAL/Model/Controller` 调用链、EF6 `.edmx` 实体、旧认证与授权逻辑，存入可检索知识库，降低"读懂旧框架"成本。
- 小步改动：每次仅围绕一个缺陷/小需求，避免大范围重构引发不可控回归。

### 11.3 模块锁 / 分支 / PR / 统一发布窗口
- **模块锁（ownership）**：任一时刻某旧系统模块要么"AI 维护中"要么"人工维护中"，禁止并发改同一模块文件；用模块状态看板登记。
- **分支策略**：旧系统维护走 `hotfix/*` 分支 → PR（**人工 review**，哪怕 AI 生成）→ 合并；AI 不直推主干。
- **统一发布窗口**：旧系统按固定节奏（如双周）集成发布；紧急修复走独立 hotfix，不混入常规改动。
- **NSRM_Core 侧**：迁入模块走独立 `feature/*` 分支 → PR → 合并，与主框架升级分离。

### 11.4 共享核心先稳
- `NSRM_Core` 的 `ApiExternal`、AuthCenter 接入、公共 `Services`/`Repository` 基类先做一次性夯实并冻结；之后各迁入模块 AI 任务只消费、不改动共享文件，避免跨模块连带回归。

### 11.5 质量闸门与回滚
- **旧系统**：AI 改动须编译通过 + 关键路径补**表征/快照测试** + 人工 review diff；无测试覆盖的模块先补最小验证再改。
- **NSRM_Core 迁入**：每模块补表征测试；PR 编译 + 测试全绿；上线配功能开关/菜单路由，坏模块即时切回旧路径。
- 用**一个已迁入的参考模块**作模板，AI 输出风格一致，降低评审成本。

### 11.6 模块迁移看板（建议模板）
| 模块 | 当前位置 | 改造评估 | 负责人(AI/人) | 状态 | 目标版本 | 预计合并窗口 | 已发布 |
|---|---|---|---|---|---|---|---|
| 示例：字典管理 | ZT.SRM | 小 → 留旧维护 | AI | 维护中 | net452 | 双周窗口 | 是 |
| 示例：采购计划 | ZT.SRM | 大 → 迁 NSRM_Core | AI | 迁入中 | net10 | 2026-09 | 否 |

---

## 12. 可行性论证与 PoC 计划

### 12.1 内部包 net10 兼容性（最高优先级，阻塞项）
- 目标：确认 `ZT.Core.*` / `Core.External.*.SDK` / `Core.BT.*` / `TableDataSys.SDK` 有 net10/net9/netstandard2.0 资产。
- 通过标准：NSRM_Core net10 能成功引用并编译通过。

### 12.2 NSRM_Core 升 net10 骨架
- 目标：net5→net10 升级后启动、健康检查、Apollo、既有 JWT/AuthCenter 校验正常。
- 通过标准：骨架编译+运行通过，关键接口用 Bearer 可调。

### 12.3 数据层同库共存（EF6 ↔ SqlSugar）
- 目标：NSRM_Core 的 SqlSugar 可连**同一数据库**只读查询旧表，与旧 EF6 并存。
- 通过标准：新栈读旧库数据与旧栈一致；旧栈运行不受影响。

### 12.4 切割与灰度（子域 + 外部菜单 + 角色）
- 目标：外部菜单按菜单路径 + 角色把试点用户切到新子域且可回滚。
- 通过标准：角色切换生效、回滚即时、无鉴权重登问题。

### 12.5 H5 移动端形态
- 目标：H5 前端经 `ApiExternal`(net10, Bearer) 调用成功，可封装。
- 通过标准：H5 在移动端/微应用内正常调用；封装方案评估通过。

### 12.6 后台任务双版本共存
- 目标：避免 Quartz 3.3(旧) 与 3.8(新) `RemotingException`。
- 通过标准：新旧任务调度互不影响。

### 12.7 动工前置（Go / No-Go）
- 上述 PoC 全部通过 → 进入按模块迁移（P1–P4）；阻塞项（尤其 12.1 / 12.2）未解 → 先解决再动工。

---

## 13. 待确认 / 下一步
- [x] **NSRM_Core 原地升 net10，不新建框架**（已确认）
- [x] **旧系统 AI 全托管维护；新接口在 NSRM_Core 实现**（已确认）
- [ ] P0：验证内部包 net10 资产（重点 `ZT.Core.WebFramework.AddAuth`、`Core.External.AuthCenter.ServiceExtend.SDK`）
- [ ] 确认 `NSRM_Core` 升到 **.NET 10** 还是先 net8（建议 10 LTS）
- [ ] 确认 SPA/移动端从门户 SSO 获取 Bearer token 的交付方式（重定向 / code 交换）
- [ ] 待办：输出**域覆盖缺口分析**（旧 `BLL/APIBLL` 接口 vs `NSRM_Core` `Services`，列出未迁移接口）——作为模块判定与排期直接依据
- [ ] 待办：旧系统**模块状态看板**初始化（模块名/负责人/状态/目标版本/发布窗口）
- [ ] 待办：旧系统**代码地图**首轮梳理（优先高频维护模块）

---

*生成说明：本方案基于仓库实际代码、依赖清单及 .NET 官方支持策略整理。v2.0 相对 v1.2 的核心变化：由"新建独立 net10 框架"改为"NSRM_Core 原地升 net10 + 旧系统 AI 全托管维护 + 大改模块迁入 NSRM_Core"，并新增 §11 AI 接手与冲突管控。*
