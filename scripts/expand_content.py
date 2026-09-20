#!/usr/bin/env python3
"""Expand all tool pages with substantial additional content sections."""
import os

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src/app/tools")

EXTRA = {
    "json-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">JSON（JavaScript Object Notation）已经成为现代 Web 开发中最常用的数据交换格式。无论是前后端接口通信、配置文件、API 响应还是日志记录，几乎每个开发场景都离不开 JSON。然而，原始的 JSON 数据往往格式混乱、结构不清晰，尤其是在处理来自第三方 API 的嵌套数据时，人眼很难快速定位关键字段。</p>
          <p className="text-gray-700 leading-relaxed mt-4">使用 JSON 格式化工具可以立即将压缩的、单行的 JSON 数据转换为结构清晰、层级分明的树形结构，让开发者能够一目了然地看到数据的完整结构。这不仅提高了调试效率，还减少了因为格式问题导致的错误。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>API 调试</strong>：调用接口后返回的 JSON 数据通常是一行压缩文本，使用格式化工具可以快速查看数据结构</li>
            <li><strong>配置文件管理</strong>：大型 JSON 配置文件经过格式化后更容易定位需要修改的字段</li>
            <li><strong>学习与教学</strong>：初学者通过格式化后的 JSON 直观理解数据结构</li>
            <li><strong>数据迁移</strong>：在数据格式转换过程中，格式化后的 JSON 便于对比和验证</li>
            <li><strong>代码审查</strong>：团队协作中，格式统一的 JSON 代码更易于审查和维护</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">JSON 格式化工具基于浏览器端的 JavaScript 解析引擎工作。当用户点击「格式化」按钮时，工具首先使用 JSON.parse() 对输入文本进行语法解析，如果成功，则通过 JSON.stringify() 方法将解析后的对象重新序列化为带有指定缩进格式的字符串。压缩功能通过将缩进参数设置为 0 来实现，整个过程完全在本地浏览器中运行。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>处理大型 JSON 文件时，可以先复制文件内容到输入框，利用实时校验功能快速定位语法错误</li>
            <li>使用「压缩」功能前，建议先复制原始格式化版本到本地备份</li>
            <li>如果经常需要格式化特定格式的 JSON，可以将模板保存到书签中方便复用</li>
          </ul>
        </section>
""",
    "xml-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">XML（eXtensible Markup Language）是广泛使用的数据标记语言，常用于配置文件、数据交换和文档存储。XML 数据通常以压缩形式传输或存储，人眼阅读困难。XML 格式化工具可以将嵌套的 XML 结构展开为层次清晰的树形展示。在企业级应用开发中，XML 文件通常包含大量命名空间、处理指令和注释，格式化后的 XML 更易于审查和维护。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>SOAP 接口调试</strong>：SOAP 消息通常是非常复杂的 XML 结构，格式化后便于查看请求和响应</li>
            <li><strong>Android/iOS 布局文件</strong>：XML 格式的界面布局文件经过美化后更容易定位问题</li>
            <li><strong>RSS/Atom 源分析</strong>：查看 RSS 源的完整 XML 结构</li>
            <li><strong>配置文件编辑</strong>：如 Spring 配置、AndroidManifest.xml 等 XML 配置文件的美化</li>
            <li><strong>SVG 图形编辑</strong>：查看和调试 SVG 矢量图形的 XML 代码</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">XML 格式化工具通过分析 XML 文档的标签嵌套结构，根据标签的层级关系自动计算缩进量。工具识别开始标签、结束标签、自闭合标签、文本节点、注释节点等不同类型的 XML 节点，然后按照 DOM 树的层级关系生成带有正确缩进的格式化代码。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>处理包含命名空间的 XML 时，格式化工具会保留命名空间前缀</li>
            <li>格式化后的 XML 可以直接用于代码编辑器进行进一步编辑</li>
          </ul>
        </section>
""",
    "html-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">HTML（超文本标记语言）是 Web 开发的基础。无论是手写代码、模板引擎生成、还是从 CMS 系统导出的 HTML，常常会出现格式混乱、缩进不一致、标签嵌套不清晰等问题。HTML 格式化工具可以将这些混乱的代码转换为结构清晰、层次分明的格式。在现代前端工作流中，HTML 格式化是代码质量保证的重要环节。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>模板代码美化</strong>：从 CMS、邮件模板、静态站点生成器导出的 HTML 代码格式化</li>
            <li><strong>前端代码审查</strong>：统一团队成员的 HTML 代码风格</li>
            <li><strong>学习 HTML 结构</strong>：初学者通过格式化后的代码理解标签嵌套关系</li>
            <li><strong>网页调试</strong>：分析从浏览器保存的 HTML 源代码结构</li>
            <li><strong>邮件模板开发</strong>：HTML 邮件模板通常结构复杂，格式化后便于调试</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">HTML 格式化工具解析输入文本的 HTML 语法结构，识别标签、属性、文本节点、注释等元素。根据 DOM 树的层级关系计算每个元素应有的缩进级别，重新生成格式化的 HTML 代码。工具支持 HTML5 的所有标签和属性，包括自定义数据属性。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>处理包含内联样式和脚本的 HTML 时，工具会保留这些内容</li>
            <li>格式化后的 HTML 可以直接用于生产环境</li>
          </ul>
        </section>
""",
    "css-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">CSS（层叠样式表）是 Web 设计中不可或缺的一部分，但 CSS 代码常常因为压缩、手动编写或从框架导出而格式混乱。CSS 格式化工具可以将压缩的 CSS 代码展开为清晰易读的格式。随着 CSS 特性的不断扩展（Grid 布局、Flexbox、CSS 变量、响应式设计等），CSS 代码的复杂度也在增加。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>第三方 CSS 集成</strong>：从 CDN 引入的压缩 CSS 需要格式化后才能查看和修改</li>
            <li><strong>样式表审查</strong>：检查选择器优先级、识别冗余样式</li>
            <li><strong>CSS 变量管理</strong>：查看和编辑 CSS 自定义属性</li>
            <li><strong>响应式代码调试</strong>：理解复杂的媒体查询嵌套结构</li>
            <li><strong>团队协作</strong>：统一团队成员的 CSS 代码风格</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">CSS 格式化工具解析 CSS 语法结构，识别选择器、属性、值、注释、@media 规则等元素。根据 CSS 的嵌套层级关系计算缩进级别，生成格式化的 CSS 代码。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>格式化后仔细检查选择器优先级，确保样式按预期应用</li>
            <li>使用「压缩」功能生成生产环境的 CSS，减少文件体积</li>
          </ul>
        </section>
""",
    "js-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">JavaScript 是现代 Web 开发的核心语言。无论是手写代码、从代码编辑器复制、还是从第三方库引入，JS 代码经常会出现格式不一致、缩进混乱等问题。JavaScript 格式化工具可以将混乱的 JS 代码转换为符合编码规范的格式。</p>
          <p className="text-gray-700 leading-relaxed mt-4">在现代前端工程化中，代码风格一致性是质量保证的重要环节。JavaScript 格式化工具支持 ES6+ 的新语法特性，确保格式化后的代码依然符合最新的 JavaScript 规范。对于团队协作和代码审查，格式化工具能够显著提升效率和代码质量。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>代码审查准备</strong>：在提交 PR 前格式化代码，确保符合团队规范</li>
            <li><strong>第三方代码集成</strong>：从 CDN 或 npm 包引入的压缩 JS 需要格式化后才能查看</li>
            <li><strong>学习他人代码</strong>：阅读开源项目代码时，格式化帮助理解复杂逻辑</li>
            <li><strong>调试辅助</strong>：格式化后的错误栈更容易定位问题</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">JavaScript 格式化工具使用 JavaScript 解析器对输入代码进行语法分析，构建抽象语法树（AST），然后根据代码结构和规范重新生成格式化的代码。工具支持 ES6+ 语法，包括箭头函数、模板字符串、解构赋值、async/await 等。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>使用「移除注释」功能前，建议先备份原始代码</li>
            <li>对于 TypeScript 文件，建议使用专门的 TypeScript 格式化工具</li>
          </ul>
        </section>
""",
    "sql-formatter": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">SQL（结构化查询语言）是数据库操作的核心语言，但 SQL 代码常常因为不同的编写习惯而格式各异。SQL 格式化工具可以将这些风格各异的 SQL 代码转换为统一、清晰的格式。在复杂的数据分析场景中，SQL 查询可能包含多层子查询、多个 JOIN 条件、嵌套的 CASE WHEN 表达式等结构。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>复杂查询调试</strong>：多层嵌套查询经过格式化后更容易定位问题</li>
            <li><strong>SQL 代码审查</strong>：统一团队成员的 SQL 编写风格</li>
            <li><strong>学习 SQL</strong>：初学者通过格式化后的 SQL 理解查询结构</li>
            <li><strong>数据库迁移</strong>：迁移过程中的 SQL 代码格式统一</li>
            <li><strong>性能优化</strong>：格式化后的 SQL 更便于分析执行计划</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">SQL 格式化工具解析 SQL 语句的语法结构，识别 SELECT、FROM、WHERE、JOIN、GROUP BY、ORDER BY、LIMIT 等关键字和子句。根据 SQL 的逻辑层次关系计算每个子句应有的缩进级别。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>格式化后的 SQL 建议先用 EXPLAIN 分析执行计划</li>
            <li>复杂的存储过程可能需要分段格式化</li>
          </ul>
        </section>
""",
    "base64-encode-decode": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">Base64 是一种将二进制数据转换为 ASCII 字符串的编码方式，广泛应用于 Web 开发中的数据传输和存储场景。无论是将图片嵌入 CSS 或 HTML、生成 Data URL、在 URL 中传递二进制数据，还是处理电子邮件中的附件，Base64 编码都扮演着重要角色。</p>
          <p className="text-gray-700 leading-relaxed mt-4">在现代 Web 开发中，Base64 的应用场景不断增加：从响应式图片的 Data URL 到 SVG 图标的嵌入，从 JSON Web Token (JWT) 的生成到 CSS 精灵图的 Base64 编码。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>图片嵌入</strong>：将小图片转换为 Base64 字符串嵌入 CSS 或 HTML，减少 HTTP 请求</li>
            <li><strong>JWT 处理</strong>：查看和验证 JSON Web Token 的头部和载荷</li>
            <li><strong>文件传输</strong>：在 URL 或表单中安全地传输二进制数据</li>
            <li><strong>数据加密</strong>：对敏感数据进行 Base64 编码后再存储</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">Base64 编码工具将输入文本或二进制数据按照 Base64 编码规则（RFC 4648）转换为由 64 个可打印 ASCII 字符组成的字符串。编码过程将每 3 个字节（24 位）分为 4 个 6 位组，然后映射到 Base64 字符表。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Base64 编码会使数据体积增加约 33%，不适合用于大型文件</li>
            <li>Base64 不是加密方式，只是编码，不应用于安全敏感数据</li>
          </ul>
        </section>
""",
    "url-encode-decode": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">URL 编码（也称为百分号编码）是 Web 中处理特殊字符的标准方式。当 URL 中包含中文、空格、特殊符号等字符时，必须进行 URL 编码才能被浏览器和服务器正确解析。在前端开发中，URL 编解码的正确使用直接关系到数据的完整性和用户体验。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>API 参数构建</strong>：将中文或特殊字符作为 API 参数进行编码</li>
            <li><strong>表单提交</strong>：URL 中传递表单数据时进行编码</li>
            <li><strong>分享链接生成</strong>：生成包含特殊字符的可分享 URL</li>
            <li><strong>SEO 优化</strong>：确保 URL 中的中文字符正确编码</li>
            <li><strong>数据解析</strong>：从 URL 参数中解码获取的编码数据</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">URL 编码工具使用标准的 URL 编码规则，将特殊字符转换为 %XX 形式的十六进制编码。编码过程遍历输入字符串的每个字符，对非字母数字字符、空格和中文字符进行百分号编码。解码过程是编码的逆操作。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>在 URL 路径中使用编码时，注意不要对分隔符编码</li>
            <li>编码后的 URL 可能变长，注意服务器对 URL 长度的限制</li>
          </ul>
        </section>
""",
    "md5-hash": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">MD5（Message Digest Algorithm 5）是一种广泛使用的哈希算法，能够将任意长度的输入数据转换为固定长度的哈希值。虽然 MD5 已不再适合用于密码存储等安全场景，但在数据校验、文件完整性验证、缓存键生成等方面仍然发挥着重要作用。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>文件校验</strong>：验证下载文件的完整性，确保未被篡改</li>
            <li><strong>数据去重</strong>：通过哈希值快速识别重复数据</li>
            <li><strong>缓存键生成</strong>：为缓存系统生成唯一的键</li>
            <li><strong>版本对比</strong>：比较不同版本文件的哈希值差异</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">MD5 哈希工具使用标准的 MD5 算法，将输入文本通过填充、初始化、迭代压缩等步骤处理，最终生成 32 位十六进制哈希值。算法过程包括：将输入按 512 位分组、进行 4 轮非线性运算、最终输出 128 位摘要。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>MD5 不适合密码存储，请使用 bcrypt、scrypt 或 Argon2</li>
            <li>即使是微小的输入变化也会产生完全不同的哈希值（雪崩效应）</li>
          </ul>
        </section>
""",
    "sha-hash": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">SHA（Secure Hash Algorithm）家族是一系列密码学哈希函数，包括 SHA-1、SHA-256、SHA-384、SHA-512 等。与 MD5 相比，SHA 系列提供了更高的安全性和更强的抗碰撞能力。SHA-256 尤其受到青睐，被广泛应用于区块链、SSL 证书、数字签名等安全敏感场景。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>密码存储</strong>：配合盐值使用 SHA-256 存储密码哈希</li>
            <li><strong>数字签名</strong>：生成数据的哈希摘要用于数字签名</li>
            <li><strong>区块链</strong>：SHA-256 是比特币和工作量证明的核心算法</li>
            <li><strong>文件完整性校验</strong>：SHA-256 比 MD5 更安全的文件校验方式</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">SHA 哈希工具使用标准的 SHA 系列算法，将输入文本通过多轮迭代压缩处理，生成对应位数的哈希值。以 SHA-256 为例，输入数据经过填充、分组、64 轮非线性变换，最终输出 256 位摘要。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>安全敏感场景请使用 SHA-256 或更高版本，避免使用 SHA-1</li>
            <li>密码存储必须使用专门的密码哈希函数，不要直接用 SHA</li>
          </ul>
        </section>
""",
    "encrypt-hash": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">加密和哈希是数据安全的核心领域。随着网络安全威胁的不断增加，数据加密和完整性校验已成为开发者和普通用户必备的技能。我们的加密/哈希工具集成了 MD5、SHA 系列和 AES 加密等多种算法，帮助您快速完成各种加密和哈希操作，保护数据安全。</p>
          <p className="text-gray-700 leading-relaxed mt-4">无论您是需要验证文件的完整性（使用 MD5 或 SHA），还是需要保护敏感数据的安全（使用 AES 加密），我们的工具都能在一个页面上满足您的所有需求。工具完全在浏览器本地运行，确保您的数据不会离开您的设备。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>文件完整性校验</strong>：使用 MD5 或 SHA 哈希验证文件是否被篡改</li>
            <li><strong>敏感数据加密</strong>：使用 AES 加密保护机密信息</li>
            <li><strong>密码安全</strong>：生成密码的哈希值进行存储</li>
            <li><strong>数据签名</strong>：使用 SHA 生成数据摘要用于签名验证</li>
            <li><strong>安全审计</strong>：检查系统的加密能力和数据完整性</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">加密/哈希工具集成了多种密码学算法。MD5 和 SHA 哈希工具使用单向哈希函数将输入转换为固定长度的摘要。AES 加密工具使用对称加密算法，通过相同的密钥进行加密和解密。所有运算均在浏览器本地完成，不涉及任何网络请求。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>MD5 和 SHA 仅用于数据校验，不应用于密码存储</li>
            <li>AES 加密时，请确保密钥安全存储，切勿泄露</li>
            <li>对于相同输入，哈希值始终一致（确定性）</li>
          </ul>
        </section>
""",
    "password-generator": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">密码安全是数字身份保护的基础，而弱密码是账户被盗的最常见原因。一个强密码应该具备足够的长度、字符多样性和不可预测性。手动创建密码往往容易陷入常见模式（如包含生日、姓名、连续字符等），而密码生成器可以快速生成真正随机、安全的密码。</p>
          <p className="text-gray-700 leading-relaxed mt-4">现代最佳实践是每个账户使用不同的、由密码生成器创建的唯一强密码。我们的工具帮助开发者快速创建安全的随机密码，是账户安全管理的第一步。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>新账户注册</strong>：创建账户时生成安全密码</li>
            <li><strong>密码重置</strong>：为用户生成临时安全密码</li>
            <li><strong>测试环境</strong>：生成测试用的随机密码数据</li>
            <li><strong>批量生成</strong>：为多个账户生成不同的密码</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">密码生成器使用浏览器的加密安全随机数生成器（Crypto.getRandomValues()），从指定的字符集中随机选取字符，组合成指定长度的密码。用户可以选择包含的字符类型和密码长度。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>密码长度建议 16 位以上，字符类型包含大小写字母、数字和特殊符号</li>
            <li>生成后建议使用密码管理器妥善保存</li>
            <li>不同账户使用不同的密码，避免复用</li>
          </ul>
        </section>
""",
    "regex-tester": """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">正则表达式是文本处理的强大工具，但语法复杂、易出错，编写和调试正则表达式是许多开发者的痛点。正则表达式测试器提供了一个实时交互的环境，让开发者可以输入正则模式、测试文本，并立即看到匹配结果。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>表单验证</strong>：验证邮箱、手机号、密码格式是否正确</li>
            <li><strong>数据提取</strong>：从文本中提取特定模式的数据</li>
            <li><strong>文本替换</strong>：批量替换匹配的文本内容</li>
            <li><strong>日志分析</strong>：从日志文件中提取关键信息</li>
            <li><strong>开发调试</strong>：快速测试和验证正则表达式的正确性</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">正则表达式测试器使用 JavaScript 的 RegExp 对象对输入的正则模式和测试文本进行匹配。工具支持 JavaScript 正则语法的所有特性，并提供实时匹配结果展示。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>使用捕获组提取特定部分的数据</li>
            <li>测试时使用多种边界情况的文本，确保正则的鲁棒性</li>
            <li>复杂的正则建议分段构建和测试</li>
          </ul>
        </section>
""",
}

def main():
    tools_dir = CONTENT_DIR
    added = 0
    for tool_name in sorted(os.listdir(tools_dir)):
        tool_path = os.path.join(tools_dir, tool_name, "tool.tsx")
        if not os.path.exists(tool_path):
            continue
        with open(tool_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        extra = EXTRA.get(tool_name)
        if not extra:
            continue
        
        # Find the insertion point: the closing of the FAQ section
        # Look for '      </div>\n\n</div>\n  );' pattern
        marker = '      </div>\n\n</div>\n  );'
        if marker not in content:
            # Try alternative: just look for '          </div>\n        </section>\n      </div>'
            marker2 = '          </div>\n        </section>\n      </div>'
            if marker2 in content:
                # Insert after the last occurrence of this marker
                idx = content.rfind(marker2)
                if idx != -1:
                    end_pos = idx + len(marker2)
                    new_content = content[:end_pos] + "\n" + extra + content[end_pos:]
                    with open(tool_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    added += 1
                    print(f"Added content to {tool_name}")
            else:
                print(f"Could not find insertion point for {tool_name}")
            continue
        
        # Insert before the marker
        idx = content.find(marker)
        if idx != -1:
            # Insert extra before the marker
            new_content = content[:idx] + extra + "\n" + content[idx:]
            with open(tool_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            added += 1
            print(f"Added content to {tool_name}")
        else:
            print(f"Marker found but couldn't insert for {tool_name}")
    
    print(f"\nDone! Added content to {added} tool pages.")

if __name__ == "__main__":
    main()