#!/usr/bin/env python3
"""Expand each tool page with substantial original content to fix AdSense 'low value content' issue."""

import os
import re

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src/app/tools")

# Extended content for each tool page: adds "为什么重要", "应用场景", "工作原理", "使用技巧" sections
ADDITIONAL_CONTENT = {
    "json-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 JSON 格式化工具如此重要？</h2>
<p className="text-gray-700 leading-relaxed">JSON（JavaScript Object Notation）已经成为现代 Web 开发中最常用的数据交换格式。无论是前后端接口通信、配置文件、API 响应还是日志记录，几乎每个开发场景都离不开 JSON。然而，原始的 JSON 数据往往格式混乱、结构不清晰，尤其是在处理来自第三方 API 的嵌套数据时，人眼很难快速定位关键字段。</p>
<p className="text-gray-700 leading-relaxed mt-4">使用 JSON 格式化工具可以立即将压缩的、单行的 JSON 数据转换为结构清晰、层级分明的树形结构，让开发者能够一目了然地看到数据的完整结构。这不仅提高了调试效率，还减少了因为格式问题导致的错误。尤其是在处理深层嵌套的 JSON 数据时，良好的缩进和层级展示能够帮助开发者快速理解数据关系。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>API 调试</strong>：调用接口后返回的 JSON 数据通常是一行压缩文本，使用格式化工具可以快速查看数据结构</li>
<li><strong>配置文件管理</strong>：大型 JSON 配置文件经过格式化后更容易定位需要修改的字段</li>
<li><strong>学习与教学</strong>：初学者通过格式化后的 JSON 直观理解数据结构</li>
<li><strong>数据迁移</strong>：在数据格式转换过程中，格式化后的 JSON 便于对比和验证</li>
<li><strong>代码审查</strong>：团队协作中，格式统一的 JSON 代码更易于审查和维护</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">JSON 格式化工具基于浏览器端的 JavaScript 解析引擎（JSON.parse()）工作。当用户输入文本并点击「格式化」按钮时，工具首先使用 JSON.parse() 对输入文本进行语法解析，如果解析成功，则通过 JSON.stringify() 方法将解析后的 JavaScript 对象重新序列化为带有指定缩进格式的字符串。压缩功能则是通过将缩进参数设置为 0 来实现的，整个过程完全在本地浏览器中运行，不涉及任何网络请求，确保数据安全和隐私保护。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>处理大型 JSON 文件时，可以先复制文件内容到输入框，利用实时校验功能快速定位语法错误</li>
<li>使用「压缩」功能前，建议先复制原始格式化版本到本地备份</li>
<li>结合浏览器的开发者工具（Console），可以更方便地处理复杂的 JSON 数据</li>
<li>如果经常需要格式化特定格式的 JSON，可以将模板保存到书签或笔记中方便复用</li>
</ul>""",
        "additional_faq": [
            {"q": "JSON 格式化工具能处理多大的文件？", "a": "由于所有处理都在浏览器本地进行，处理能力取决于您的设备内存。大多数常规 JSON 文件（几 MB 以内）都能流畅处理。超过 10MB 的文件可能会导致浏览器响应变慢。"},
            {"q": "这个工具支持 JSON5 或 BSON 吗？", "a": "本工具严格遵循 JSON 标准格式（RFC 8259），不支持 JSON5 的扩展语法（如单引号、尾随逗号等）或 BSON 二进制格式。对于非标准格式，可能需要转换为标准 JSON 后使用。"},
        ],
    },
    "xml-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 XML 格式化工具不可或缺？</h2>
<p className="text-gray-700 leading-relaxed">XML（eXtensible Markup Language）是另一种广泛使用的数据标记语言，常用于配置文件、数据交换和文档存储。与 JSON 类似，XML 数据通常以压缩形式传输或存储，人眼阅读困难。XML 格式化工具可以将嵌套的 XML 结构展开为层次清晰的树形展示，帮助开发者快速理解文档结构和数据组织方式。</p>
<p className="text-gray-700 leading-relaxed mt-4">在企业级应用开发中，XML 文件通常包含大量命名空间、处理指令和注释，格式化后的 XML 更易于审查和维护。特别是在处理 SOAP 消息、RSS 源、SVG 图形等复杂的 XML 文档时，良好的格式化展示能够显著提高开发效率。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>SOAP 接口调试</strong>：SOAP 消息通常是非常复杂的 XML 结构，格式化后便于查看请求和响应</li>
<li><strong>Android/iOS 布局文件</strong>：XML 格式的界面布局文件经过美化后更容易定位问题</li>
<li><strong>RSS/Atom 源分析</strong>：查看 RSS 源的完整 XML 结构</li>
<li><strong>配置文件编辑</strong>：如 Spring 配置、AndroidManifest.xml 等 XML 配置文件的美化</li>
<li><strong>SVG 图形编辑</strong>：查看和调试 SVG 矢量图形的 XML 代码</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">XML 格式化工具通过分析 XML 文档的标签嵌套结构，根据标签的层级关系自动计算缩进量。工具识别开始标签、结束标签、自闭合标签、文本节点、注释节点等不同类型的 XML 节点，然后按照 DOM 树的层级关系生成带有正确缩进的格式化代码。压缩功能则通过移除不必要的空白字符和换行符来实现。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>对于包含命名空间的 XML，格式化工具会保留命名空间前缀，不会进行转换</li>
<li>处理大型 XML 文件时，可以分段格式化以获得更好的性能</li>
<li>格式化后的 XML 可以直接用于代码编辑器进行进一步编辑</li>
</ul>""",
        "additional_faq": [
            {"q": "XML 格式化工具能处理带 DTD 的文档吗？", "a": "是的，工具会保留 DOCTYPE 声明和 DTD 引用，确保格式化后的文档仍然有效。"},
            {"q": "XML 和 JSON 格式化有什么区别？", "a": "XML 格式化需要处理标签嵌套、属性排序、命名空间等更多细节，而 JSON 格式化主要处理对象和数组的层级。"},
        ],
    },
    "html-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 HTML 格式化工具是前端开发的必备利器？</h2>
<p className="text-gray-700 leading-relaxed">HTML（超文本标记语言）是 Web 开发的基础。无论是手写代码、模板引擎生成、还是从 CMS 系统导出的 HTML，常常会出现格式混乱、缩进不一致、标签嵌套不清晰等问题。HTML 格式化工具可以将这些混乱的代码转换为结构清晰、层次分明的格式，帮助前端开发者快速定位标签错误、优化代码结构、提升团队协作效率。</p>
<p className="text-gray-700 leading-relaxed mt-4">在现代前端工作流中，HTML 格式化是代码质量保证的重要环节。通过自动化的格式化工具，团队成员可以保持统一的代码风格，减少因格式差异导致的代码审查争议。特别是在处理大型 HTML 模板或从其他来源粘贴的 HTML 代码时，格式化工具的价值尤为突出。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>模板代码美化</strong>：从 CMS、邮件模板、静态站点生成器导出的 HTML 代码格式化</li>
<li><strong>前端代码审查</strong>：统一团队成员的 HTML 代码风格</li>
<li><strong>学习 HTML 结构</strong>：初学者通过格式化后的代码理解标签嵌套关系</li>
<li><strong>网页调试</strong>：分析从浏览器保存的 HTML 源代码结构</li>
<li><strong>邮件模板开发</strong>：HTML 邮件模板通常结构复杂，格式化后便于调试</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">HTML 格式化工具首先解析输入文本的 HTML 语法结构，识别标签、属性、文本节点、注释等元素。工具根据 DOM 树的层级关系计算每个元素应有的缩进级别，然后重新生成格式化的 HTML 代码。工具支持 HTML5 的所有标签和属性，包括自定义数据属性（data-*）。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>处理包含内联样式和脚本的 HTML 时，格式化工具会保留这些内容</li>
<li>格式化后的 HTML 可以直接用于生产环境，但建议先进行语法验证</li>
<li>对于大型 HTML 文件，建议分段处理以获得最佳性能</li>
</ul>""",
        "additional_faq": [
            {"q": "HTML 格式化会改变 CSS 样式吗？", "a": "不会。格式化工具只调整 HTML 代码的布局和缩进，不会修改任何 CSS 样式或属性值。"},
            {"q": "能格式化包含 JavaScript 的 HTML 吗？", "a": "可以。工具会保留 script 和 style 标签内的原始内容，只格式化 HTML 结构本身。"},
        ],
    },
    "css-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 CSS 格式化工具对样式开发至关重要？</h2>
<p className="text-gray-700 leading-relaxed">CSS（层叠样式表）是 Web 设计中不可或缺的一部分，但 CSS 代码常常因为压缩、手动编写或从框架导出而格式混乱。CSS 格式化工具可以将压缩的 CSS 代码展开为清晰易读的格式，帮助开发者快速定位样式规则、理解选择器优先级、优化样式表结构。在大型项目中，良好的 CSS 格式化管理能够显著提升样式表的可维护性。</p>
<p className="text-gray-700 leading-relaxed mt-4">随着 CSS 特性的不断扩展（Grid 布局、Flexbox、CSS 变量、响应式设计等），CSS 代码的复杂度也在增加。格式化工具不仅能美化代码，还能帮助开发者更好地理解复杂的嵌套结构和选择器关系。对于前端开发者和设计师来说，CSS 格式化是提高工作效率的重要工具。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>第三方 CSS 集成</strong>：从 CDN 引入的压缩 CSS 需要格式化后才能查看和修改</li>
<li><strong>样式表审查</strong>：检查选择器优先级、识别冗余样式</li>
<li><strong>CSS 变量管理</strong>：查看和编辑 CSS 自定义属性（变量）</li>
<li><strong>响应式代码调试</strong>：理解复杂的媒体查询嵌套结构</li>
<li><strong>团队协作</strong>：统一团队成员的 CSS 代码风格</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">CSS 格式化工具解析 CSS 语法结构，识别选择器、属性、值、注释、@media 规则等元素。根据 CSS 的嵌套层级关系，工具自动计算每个规则应有的缩进级别，生成格式化的 CSS 代码。工具支持最新的 CSS 特性，包括嵌套规则、容器查询和 CSS 作用域。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>格式化后仔细检查选择器优先级，确保样式按预期应用</li>
<li>使用「压缩」功能生成生产环境的 CSS，减少文件体积</li>
<li>结合浏览器的开发者工具，对比格式化前后的样式差异</li>
</ul>""",
        "additional_faq": [
            {"q": "CSS 格式化会改变样式效果吗？", "a": "不会。格式化只改变代码的布局和缩进，不会修改任何样式属性或选择器。"},
            {"q": "能格式化 SCSS/Less 吗？", "a": "本工具主要处理标准 CSS。预处理语言（SCSS/Less）的特殊语法可能需要专门的工具。"},
        ],
    },
    "js-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 JavaScript 格式化工具是前端开发的必备工具？</h2>
<p className="text-gray-700 leading-relaxed">JavaScript 是现代 Web 开发的核心语言。无论是手写代码、从代码编辑器复制、还是从第三方库引入，JS 代码经常会出现格式不一致、缩进混乱、注释位置不当等问题。JavaScript 格式化工具可以将混乱的 JS 代码转换为符合编码规范的格式，帮助开发者快速阅读他人代码、保持团队代码风格统一、减少代码审查中的格式争议。</p>
<p className="text-gray-700 leading-relaxed mt-4">在现代前端工程化中，代码风格一致性是质量保证的重要环节。JavaScript 格式化工具支持 ES6+ 的新语法特性（箭头函数、模板字符串、解构赋值、异步等待等），确保格式化后的代码依然符合最新的 JavaScript 规范。对于团队协作和代码审查，格式化工具能够显著提升效率和代码质量。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>代码审查准备</strong>：在提交 PR 前格式化代码，确保符合团队规范</li>
<li><strong>第三方代码集成</strong>：从 CDN 或 npm 包引入的压缩 JS 需要格式化后才能查看</li>
<li><strong>学习他人代码</strong>：阅读开源项目代码时，格式化帮助理解复杂逻辑</li>
<li><strong>教学与文档</strong>：编写技术文档时，格式化后的代码更易读</li>
<li><strong>调试辅助</strong>：格式化后的错误栈更容易定位问题</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">JavaScript 格式化工具使用 JavaScript 解析器对输入代码进行语法分析，构建抽象语法树（AST），然后根据代码结构和规范重新生成格式化的代码。工具支持 ES6+ 语法，包括箭头函数、模板字符串、解构赋值、async/await 等。压缩功能通过移除注释、空白字符和缩短变量名来减少代码体积。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>使用「移除注释」功能前，建议先备份原始代码</li>
<li>ES6+ 代码（如箭头函数、可选链）格式化效果最佳</li>
<li>对于 TypeScript 文件，建议使用专门的 TypeScript 格式化工具</li>
</ul>""",
        "additional_faq": [
            {"q": "JS 格式化会影响代码性能吗？", "a": "不会。格式化只改变代码的外观布局，不影响执行逻辑。但压缩代码可能改变变量名，需谨慎用于生产环境。"},
            {"q": "支持 TypeScript 吗？", "a": "本工具主要处理标准 JavaScript。TypeScript 的类型注解可能需要专门的格式化工具。"},
        ],
    },
    "sql-formatter": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 SQL 格式化工具对数据库开发至关重要？</h2>
<p className="text-gray-700 leading-relaxed">SQL（结构化查询语言）是数据库操作的核心语言，但 SQL 代码常常因为不同的编写习惯而格式各异——有的全大写、有的小写、有的缩进不一致、有的关键字换行位置随意。SQL 格式化工具可以将这些风格各异的 SQL 代码转换为统一、清晰、易读的格式，帮助数据库管理员和开发者快速理解查询逻辑、检查语法错误、优化查询性能。</p>
<p className="text-gray-700 leading-relaxed mt-4">在复杂的数据分析场景中，SQL 查询可能包含多层子查询、多个 JOIN 条件、嵌套的 CASE WHEN 表达式等结构。格式化后的 SQL 代码能够清晰地展示查询的逻辑层次，使复杂的数据操作变得易于理解和审查。对于团队协作和代码审计，规范化的 SQL 代码能够显著减少误解和错误。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>复杂查询调试</strong>：多层嵌套查询经过格式化后更容易定位问题</li>
<li><strong>SQL 代码审查</strong>：统一团队成员的 SQL 编写风格</li>
<li><strong>学习 SQL</strong>：初学者通过格式化后的 SQL 理解查询结构</li>
<li><strong>数据库迁移</strong>：迁移过程中的 SQL 代码格式统一</li>
<li><strong>性能优化</strong>：格式化后的 SQL 更便于分析执行计划</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">SQL 格式化工具解析 SQL 语句的语法结构，识别 SELECT、FROM、WHERE、JOIN、GROUP BY、ORDER BY、LIMIT 等关键字和子句。工具根据 SQL 的逻辑层次关系计算每个子句应有的缩进级别，生成格式化的 SQL 代码。支持常见 SQL 关键字（SELECT、INSERT、UPDATE、DELETE、CREATE、DROP 等）的自动识别和格式化。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>格式化后的 SQL 建议先用 EXPLAIN 分析执行计划</li>
<li>复杂的存储过程可能需要分段格式化</li>
<li>不同数据库方言的 SQL 语法略有差异，本工具基于标准 SQL</li>
</ul>""",
        "additional_faq": [
            {"q": "SQL 格式化支持哪些数据库？", "a": "本工具基于标准 SQL 语法，兼容 MySQL、PostgreSQL、SQLite、Oracle 等主流数据库的基本语法。"},
            {"q": "能格式化存储过程和触发器吗？", "a": "支持基本的存储过程和触发器语法格式化，复杂过程建议分段处理。"},
        ],
    },
    "base64-encode-decode": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 Base64 编解码工具在 Web 开发中如此常用？</h2>
<p className="text-gray-700 leading-relaxed">Base64 是一种将二进制数据转换为 ASCII 字符串的编码方式，广泛应用于 Web 开发中的数据传输和存储场景。无论是将图片嵌入 CSS 或 HTML、生成 Data URL、在 URL 中传递二进制数据，还是处理电子邮件中的附件，Base64 编码都扮演着重要角色。Base64 编解码工具帮助开发者快速完成这些转换，无需安装任何软件。</p>
<p className="text-gray-700 leading-relaxed mt-4">在现代 Web 开发中，Base64 的应用场景不断增加：从响应式图片的 Data URL 到 SVG 图标的嵌入，从 JSON Web Token (JWT) 的生成到 CSS 精灵图的 Base64 编码。掌握 Base64 编解码技术，是每个前端开发者的基本功之一。我们的工具让这些转换变得简单快捷。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>图片嵌入</strong>：将小图片转换为 Base64 字符串嵌入 CSS 或 HTML，减少 HTTP 请求</li>
<li><strong>JWT 处理</strong>：查看和验证 JSON Web Token 的头部和载荷</li>
<li><strong>文件传输</strong>：在 URL 或表单中安全地传输二进制数据</li>
<li><strong>数据加密</strong>：对敏感数据进行 Base64 编码后再存储</li>
<li><strong>跨平台兼容</strong>：在只支持文本的系统间传输二进制数据</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">Base64 编码工具将输入文本或二进制数据按照 Base64 编码规则（RFC 4648）转换为由 64 个可打印 ASCII 字符组成的字符串。编码过程将每 3 个字节（24 位）分为 4 个 6 位组，然后映射到 Base64 字符表。解码过程是编码的逆过程。工具完全在浏览器本地运行，数据不会离开用户的设备。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>Base64 编码会使数据体积增加约 33%，不适合用于大型文件</li>
<li>在 URL 中使用 Base64 时，注意替换特殊字符（+/=）</li>
<li>Base64 不是加密方式，只是编码，不应用于安全敏感数据</li>
</ul>""",
        "additional_faq": [
            {"q": "Base64 编码是加密吗？", "a": "不是。Base64 只是编码方式，不是加密。任何人都可以解码 Base64 字符串。如果需要安全保护，请使用真正的加密算法。"},
            {"q": "Base64 支持中文字符吗？", "a": "支持。中文经过 UTF-8 编码后再进行 Base64 编码，可以正确处理。解码后会自动还原为原始 UTF-8 文本。"},
        ],
    },
    "url-encode-decode": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 URL 编解码工具是 Web 开发的基础工具？</h2>
<p className="text-gray-700 leading-relaxed">URL 编码（也称为百分号编码）是 Web 中处理特殊字符的标准方式。当 URL 中包含中文、空格、特殊符号等字符时，必须进行 URL 编码才能被浏览器和服务器正确解析。无论是构建 API 请求参数、处理表单提交、还是生成分享链接，URL 编解码都是不可或缺的工具。我们的工具让这些转换变得简单快捷。</p>
<p className="text-gray-700 leading-relaxed mt-4">在前端开发中，URL 编解码的正确使用直接关系到数据的完整性和用户体验。错误的 URL 编码可能导致参数丢失、数据损坏或安全漏洞。掌握 URL 编码的原理和正确使用方法，是每个 Web 开发者必须具备的技能。我们的工具帮助开发者快速完成编码和解码操作。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>API 参数构建</strong>：将中文或特殊字符作为 API 参数进行编码</li>
<li><strong>表单提交</strong>：URL 中传递表单数据时进行编码</li>
<li><strong>分享链接生成</strong>：生成包含特殊字符的可分享 URL</li>
<li><strong>SEO 优化</strong>：确保 URL 中的中文字符正确编码</li>
<li><strong>数据解析</strong>：从 URL 参数中解码获取的编码数据</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">URL 编码工具使用标准的 URL 编码规则（application/x-www-form-urlencoded），将特殊字符转换为 %XX 形式的十六进制编码。编码过程遍历输入字符串的每个字符，对非字母数字字符、空格和中文字符进行百分号编码。解码过程是编码的逆操作，将 %XX 序列还原为原始字符。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>在 URL 路径中使用编码时，注意不要对 / 和 ? 等分隔符编码</li>
<li>编码后的 URL 可能变长，注意服务器对 URL 长度的限制</li>
<li>不同场景可能需要不同的编码方式（标准 URL 编码 vs 路径编码）</li>
</ul>""",
        "additional_faq": [
            {"q": "URL 编码和 URI 编码有什么区别？", "a": "URL 编码是 URI 编码的一种具体实现。URI 编码范围更广，但 URL 编码是最常用的形式。"},
            {"q": "编码后的 URL 可以直接在浏览器中使用吗？", "a": "可以。浏览器会自动处理 URL 编码，用户看到的解码后的 URL 就是原始 URL。"},
        ],
    },
    "md5-hash": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 MD5 哈希工具在数据安全中如此重要？</h2>
<p className="text-gray-700 leading-relaxed">MD5（Message Digest Algorithm 5）是一种广泛使用的哈希算法，能够将任意长度的输入数据转换为固定长度（128 位）的哈希值。虽然 MD5 已不再适合用于密码存储等安全场景，但在数据校验、文件完整性验证、缓存键生成等方面仍然发挥着重要作用。MD5 哈希工具帮助开发者快速生成和验证哈希值。</p>
<p className="text-gray-700 leading-relaxed mt-4">在实际开发中，MD5 哈希常用于文件完整性校验（验证文件是否在传输过程中被篡改）、数据去重（通过哈希值快速识别重复数据）、以及生成缓存键。需要注意的是，MD5 不适合用于密码存储等安全敏感场景，应使用 SHA-256 等更安全的算法。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>文件校验</strong>：验证下载文件的完整性，确保未被篡改</li>
<li><strong>数据去重</strong>：通过哈希值快速识别重复数据</li>
<li><strong>缓存键生成</strong>：为缓存系统生成唯一的键</li>
<li><strong>快速摘要</strong>：快速生成文本内容的数字指纹</li>
<li><strong>版本对比</strong>：比较不同版本文件的哈希值差异</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">MD5 哈希工具使用标准的 MD5 算法（RFC 1321），将输入文本通过填充、初始化、迭代压缩等步骤处理，最终生成 32 位十六进制哈希值。算法过程包括：将输入按 512 位分组、进行 4 轮非线性运算、最终输出 128 位摘要。工具完全在浏览器本地运行。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>MD5 不适合密码存储，请使用 bcrypt、scrypt 或 Argon2</li>
<li>即使是微小的输入变化也会产生完全不同的哈希值（雪崩效应）</li>
<li>MD5 碰撞已被证明存在，不应依赖其唯一性</li>
</ul>""",
        "additional_faq": [
            {"q": "MD5 哈希能逆向解密吗？", "a": "不能。MD5 是单向哈希函数，无法从哈希值逆向得到原始输入。"},
            {"q": "MD5 和 SHA-256 有什么区别？", "a": "MD5 输出 128 位，SHA-256 输出 256 位。SHA-256 更安全但速度稍慢。对于数据校验，两者都可用。"},
        ],
    },
    "sha-hash": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 SHA 哈希工具是数据安全的基石？</h2>
<p className="text-gray-700 leading-relaxed">SHA（Secure Hash Algorithm）家族是一系列密码学哈希函数，包括 SHA-1、SHA-256、SHA-384、SHA-512 等。与 MD5 相比，SHA 系列提供了更高的安全性和更强的抗碰撞能力。SHA-256 尤其受到青睐，被广泛应用于区块链、SSL 证书、数字签名等安全敏感场景。SHA 哈希工具帮助开发者快速生成和验证各种 SHA 算法的输出。</p>
<p className="text-gray-700 leading-relaxed mt-4">在现代安全架构中，SHA 哈希是不可或缺的基础设施。从 HTTPS 证书验证到软件分发校验，从密码存储（配合盐值）到区块链中的 Merkle 树，SHA 系列哈希无处不在。需要注意的是，不同的 SHA 变体适用于不同的安全级别需求，应根据具体场景选择合适的算法。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>密码存储</strong>：配合盐值使用 SHA-256 存储密码哈希</li>
<li><strong>数字签名</strong>：生成数据的哈希摘要用于数字签名</li>
<li><strong>区块链</strong>：SHA-256 是比特币和工作量证明的核心算法</li>
<li><strong>文件完整性校验</strong>：SHA-256 比 MD5 更安全的文件校验方式</li>
<li><strong>API 安全</strong>：使用 SHA 哈希生成 API 签名</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">SHA 哈希工具使用标准的 SHA 系列算法（SHA-1、SHA-256、SHA-384、SHA-512），将输入文本通过多轮迭代压缩处理，生成对应位数的哈希值。以 SHA-256 为例，输入数据经过填充、分组、64 轮非线性变换，最终输出 256 位（64 字符十六进制）摘要。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>安全敏感场景请使用 SHA-256 或更高版本，避免使用 SHA-1</li>
<li>密码存储必须使用专门的密码哈希函数（bcrypt、Argon2），不要直接用 SHA</li>
<li>对于相同输入，SHA 算法的输出始终一致（确定性）</li>
</ul>""",
        "additional_faq": [
            {"q": "SHA-1 还安全吗？", "a": "SHA-1 已被证明存在碰撞漏洞，不建议用于安全敏感场景。请使用 SHA-256 或更高版本。"},
            {"q": "SHA-256 和 SHA-512 怎么选？", "a": "SHA-256 更通用且性能更好。SHA-512 安全性更高但计算成本更大。根据安全需求选择。"},
        ],
    },
    "aes-crypt": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么 AES 加密工具是数据保护的核心？</h2>
<p className="text-gray-700 leading-relaxed">AES（Advanced Encryption Standard）是目前最广泛使用的对称加密算法，被美国政府指定为联邦标准，广泛应用于数据加密、信息安全等领域。AES 支持 ECB 和 CBC 两种工作模式，能够有效地保护敏感数据不被未授权访问。AES 加密工具帮助开发者快速测试和理解 AES 加密的基本原理。</p>
<p className="text-gray-700 leading-relaxed mt-4">在现代应用中，AES 加密无处不在：从 HTTPS 通信到数据库加密，从文件加密到移动应用安全。AES-256 更是被认为是目前最安全的加密标准之一。需要注意的是，在实际生产环境中，密钥管理、初始化向量（IV）的使用等细节至关重要。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>数据加密</strong>：加密敏感数据，防止未授权访问</li>
<li><strong>安全通信</strong>：保护传输中的数据不被窃听</li>
<li><strong>文件保护</strong>：对重要文件进行加密存储</li>
<li><strong>学习研究</strong>：理解 AES 加密的工作原理和模式</li>
<li><strong>安全审计</strong>：测试系统的加密能力</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">AES 加密工具使用 AES 算法对输入数据进行加密和解密。在 ECB 模式下，数据被分为固定大小的块独立加密；在 CBC 模式下，每个数据块与前一个密文块进行异或操作后再加密，增加了安全性。工具在浏览器本地运行，使用 JavaScript 加密库实现 AES 算法。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>生产环境请使用专业的加密库和安全的密钥管理方案</li>
<li>ECB 模式不适合加密重复数据，请优先使用 CBC 模式</li>
<li>密钥必须安全存储，切勿硬编码在前端代码中</li>
</ul>""",
        "additional_faq": [
            {"q": "AES 加密是可逆的吗？", "a": "是的。AES 是对称加密算法，使用相同密钥可以加密和解密数据。"},
            {"q": "ECB 和 CBC 有什么区别？", "a": "ECB 独立加密每个块，相同明文产生相同密文；CBC 使用前一个密文块影响当前块，加密结果更随机。"},
        ],
    },
    "password-generator": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么密码生成器是账户安全的第一道防线？</h2>
<p className="text-gray-700 leading-relaxed">密码安全是数字身份保护的基础，而弱密码是账户被盗的最常见原因。一个强密码应该具备足够的长度、字符多样性和不可预测性。手动创建密码往往容易陷入常见模式（如包含生日、姓名、连续字符等），而密码生成器可以快速生成真正随机、安全的密码，大幅提升账户安全性。</p>
<p className="text-gray-700 leading-relaxed mt-4">在密码管理器普及之前，人们常常在多个网站重复使用同一个弱密码，这被称为「密码复用」问题，是数据泄露的主要原因之一。现代最佳实践是每个账户使用不同的、由密码生成器创建的唯一强密码。我们的工具帮助开发者快速创建安全的随机密码。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>新账户注册</strong>：创建账户时生成安全密码</li>
<li><strong>密码重置</strong>：为用户生成临时安全密码</li>
<li><strong>测试环境</strong>：生成测试用的随机密码数据</li>
<li><strong>密码审计</strong>：验证现有密码的强度</li>
<li><strong>批量生成</strong>：为多个账户生成不同的密码</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">密码生成器使用浏览器的加密安全随机数生成器（Crypto.getRandomValues()），从指定的字符集（大小写字母、数字、特殊符号）中随机选取字符，组合成指定长度的密码。用户可以选择包含的字符类型和密码长度，确保生成的密码满足安全要求。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>密码长度建议 16 位以上，字符类型包含大小写字母、数字和特殊符号</li>
<li>生成后建议使用密码管理器妥善保存</li>
<li>不同账户使用不同的密码，避免复用</li>
</ul>""",
        "additional_faq": [
            {"q": "生成的密码真的随机吗？", "a": "是的。使用浏览器内置的加密安全随机数生成器（Crypto.getRandomValues()），确保密码的真正随机性。"},
            {"q": "密码长度多少合适？", "a": "建议至少 16 位。长度越长，被暴力破解的可能性越低。"},
        ],
    },
    "regex-tester": {
        "why_important": """<h2 className="text-2xl font-bold text-gray-900 mb-4">为什么正则表达式测试器是开发者的高效助手？</h2>
<p className="text-gray-700 leading-relaxed">正则表达式（Regular Expression）是文本处理的强大工具，但语法复杂、易出错，编写和调试正则表达式是许多开发者的痛点。正则表达式测试器提供了一个实时交互的环境，让开发者可以输入正则模式、测试文本，并立即看到匹配结果。这大大降低了学习和使用正则表达式的门槛。</p>
<p className="text-gray-700 leading-relaxed mt-4">在实际开发中，正则表达式广泛应用于表单验证、数据提取、文本替换、日志分析等场景。一个复杂的正则表达式可能需要多次调试才能达到预期效果。我们的测试器提供即时反馈，帮助开发者快速构建正确的正则表达式。</p>""",
        "use_cases": """<h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li><strong>表单验证</strong>：验证邮箱、手机号、密码格式是否正确</li>
<li><strong>数据提取</strong>：从文本中提取特定模式的数据</li>
<li><strong>文本替换</strong>：批量替换匹配的文本内容</li>
<li><strong>日志分析</strong>：从日志文件中提取关键信息</li>
<li><strong>开发调试</strong>：快速测试和验证正则表达式的正确性</li>
</ul>""",
        "how_it_works": """<h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
<p className="text-gray-700 leading-relaxed">正则表达式测试器使用 JavaScript 的 RegExp 对象对输入的正则模式和测试文本进行匹配。工具支持 JavaScript 正则语法的所有特性（包括捕获组、量词、字符类、断言等），并提供实时匹配结果展示。用户输入的正则模式会被转换为 RegExp 对象，然后对测试文本进行匹配操作。</p>""",
        "tips": """<h2 className="text-2xl font-bold text-gray-900 mb-4">使用技巧</h2>
<ul className="list-disc list-inside space-y-2 text-gray-700">
<li>使用捕获组提取特定部分的数据</li>
<li>测试时使用多种边界情况的文本，确保正则的鲁棒性</li>
<li>复杂的正则建议分段构建和测试</li>
</ul>""",
        "additional_faq": [
            {"q": "正则表达式支持哪些语法？", "a": "支持完整的 JavaScript 正则语法，包括普通字符、元字符、量词、字符类、分组、断言等。"},
            {"q": "可以替换匹配的文本吗？", "a": "可以。工具支持替换功能，可以将匹配到的文本替换为指定的字符串。"},
        ],
    },
}

def generate_extra_content(tool_id, tool_data):
    """Generate additional content sections for a tool page."""
    data = ADDITIONAL_CONTENT.get(tool_id, {})
    sections = []
    if data.get("why_important"):
        sections.append(data["why_important"])
    if data.get("use_cases"):
        sections.append(data["use_cases"])
    if data.get("how_it_works"):
        sections.append(data["how_it_works"])
    if data.get("tips"):
        sections.append(data["tips"])
    return "\n\n".join(sections)

def main():
    tools_dir = os.path.join(CONTENT_DIR)
    added = 0
    for tool_name in sorted(os.listdir(tools_dir)):
        tool_path = os.path.join(tools_dir, tool_name, "tool.tsx")
        if not os.path.exists(tool_path):
            continue
        with open(tool_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        extra = generate_extra_content(tool_name, None)
        if not extra:
            continue
        
        # Find the last section </div> before closing </div>
        # Insert after the existing FAQ section
        if "常见问题" in content and "</div>\n    </div>" in content:
            # Insert before the final closing tags
            # Find the position after "常见问题" section
            insert_marker = "      </div>\n    </div>\n  );\n}"
            if insert_marker not in content:
                insert_marker = "      </div>\n    </div>\n</div>\n  );\n}"
            if insert_marker in content:
                new_content = content.replace(insert_marker, extra + "\n\n" + insert_marker)
                with open(tool_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                added += 1
                print(f"Added content to {tool_name}")
            else:
                print(f"Could not find insertion point for {tool_name}")
        else:
            print(f"No FAQ section found in {tool_name}")
    
    print(f"\nDone! Added content to {added} tool pages.")

if __name__ == "__main__":
    main()