#!/usr/bin/env python3
"""Add rich content sections to all tool pages with correct UTF-8 encoding."""

import os

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "src/app/tools")

CONTENT = {
    "json-formatter": {
        "features": [
            "支持带注释的 JSON（// 和 /* */），无需手动删除注释即可直接格式化",
            "自动去除尾随逗号，兼容宽松的 JSON 解析规则",
            "支持 2/4/8 空格缩进选择，满足不同编码规范",
            "一键压缩 JSON 为单行，节省存储空间和传输带宽",
            "实时语法校验，错误位置精确定位",
        ],
        "usage": "在左侧输入框中粘贴需要格式化的 JSON 字符串，支持带注释和尾随逗号的格式。选择缩进大小（2/4/8 空格），点击「格式化」按钮即可得到美化后的 JSON。点击「压缩」按钮可将 JSON 压缩为单行。格式化后可通过「复制」按钮一键复制结果。如果输入不是合法 JSON，页面会立即显示错误信息，帮助您快速定位问题。",
        "examples": [
            {
                "title": "带注释的 JSON 格式化",
                "code": '// 输入：\n{\n  "name": "张三", // 姓名\n  "age": 25 /* 年龄 */\n}\n\n// 格式化后：\n{\n  "name": "张三",\n  "age": 25\n}',
            },
        ],
        "faq": [
            {"q": "JSON 格式化支持哪些注释格式？", "a": "支持两种注释格式：单行注释 // 和多行注释 /* */。开启「支持注释」选项后，格式化时会自动去除这些注释。"},
            {"q": "尾随逗号是什么意思？", "a": "尾随逗号指 JSON 对象或数组中最后一个元素后面的逗号，如 {\"a\":1,\"b\":2,}。标准 JSON 不允许尾随逗号，但本工具可以自动去除。"},
            {"q": "格式化和压缩有什么区别？", "a": "格式化会将 JSON 展开为带缩进的多行格式，便于阅读；压缩会将 JSON 压缩为单行字符串，节省存储空间。"},
        ],
    },
    "xml-formatter": {
        "features": [
            "智能缩进 XML 标签层级，树形结构一目了然",
            "支持命名空间（xmlns）的完整保留和格式化",
            "保持自闭合标签格式（<tag />），尊重原始写法",
            "支持单行压缩，减小 XML 数据体积",
            "自动处理 CDATA、注释、处理指令等特殊节点",
        ],
        "usage": "将需要格式化的 XML 代码粘贴到输入框中，点击「格式化」按钮即可对 XML 进行美化。支持包含命名空间、CDATA 段、注释的 XML 文档。点击「压缩」可以移除多余的空白字符，将 XML 压缩为紧凑格式，便于存储和传输。",
        "examples": [
            {
                "title": "XML 格式化示例",
                "code": '<!-- 格式化前 -->\n<root><person><name>张三</name><age>25</age></person></root>\n\n<!-- 格式化后 -->\n<root>\n  <person>\n    <name>张三</name>\n    <age>25</age>\n  </person>\n</root>',
            },
        ],
        "faq": [
            {"q": "XML 格式化和 HTML 格式化有什么区别？", "a": "XML 更注重数据结构和标签的规范性，而 HTML 有更多语义化标签和特殊规则。 XML 格式化工具专注于保持标签层级清晰。"},
            {"q": "格式化会改变 XML 中的数据内容吗？", "a": "不会。格式化只调整空白字符和缩进，不会修改标签名称、属性值或文本内容。"},
            {"q": "支持大文件 XML 格式化吗？", "a": "工具基于浏览器本地运行，处理能力取决于您的设备。大多数常规 XML 文件都能流畅处理。"},
        ],
    },
    "html-formatter": {
        "features": [
            "支持 HTML5 所有标签和属性，包括 void 元素的自闭合格式",
            "智能识别块级元素和内联元素，优化换行策略",
            "保留属性顺序，支持布尔属性和自定义 data- 属性",
            "美化内嵌 CSS 和 JavaScript 代码块",
            "支持压缩模式，去除多余空白字符",
        ],
        "usage": "在输入框中粘贴需要格式化的 HTML 代码，点击「格式化」按钮即可获得结构清晰的 HTML。支持 HTML5 最新标签和属性。格式化后的代码缩进规范、层级分明，便于阅读和维护。",
        "examples": [
            {
                "title": "HTML 格式化示例",
                "code": '<!-- 格式化前 -->\n<div><header><h1>标题</h1></header><main><p>内容</p></main></div>\n\n<!-- 格式化后 -->\n<div>\n  <header>\n    <h1>标题</h1>\n  </header>\n  <main>\n    <p>内容</p>\n  </main>\n</div>',
            },
        ],
        "faq": [
            {"q": "格式化会破坏 HTML 中的 JavaScript 代码吗？", "a": "不会。工具会智能识别 script 标签和其内容，保持 CSS 和 JavaScript 代码的完整性。"},
            {"q": "支持预览功能吗？", "a": "本工具专注于代码格式化，格式化后的代码可直接复制使用，建议在浏览器中预览实际效果。"},
            {"q": "如何处理自闭合标签？", "a": "遵循 HTML5 规范，void 元素（如 <br>、<img>、<input>）不会添加自闭合斜杠。"},
        ],
    },
    "css-formatter": {
        "features": [
            "智能缩进选择器和属性，支持嵌套规则（@media、@keyframes）",
            "保持属性顺序不变，支持自定义属性排序",
            "支持 CSS3 和 CSS4 最新语法特性",
            "压缩模式可移除注释和多余空白",
            "保留浏览器前缀（-webkit-、-moz- 等）",
        ],
        "usage": "将 CSS 代码粘贴到输入框，点击「格式化」即可美化样式表。支持选择器分组、属性排序、媒体查询嵌套等场景。压缩模式可以将 CSS 压缩为单行格式。",
        "examples": [
            {
                "title": "CSS 格式化示例",
                "code": "/* 格式化前 */\nbody{margin:0;padding:0}.container{max-width:1200px}\n\n/* 格式化后 */\nbody {\n  margin: 0;\n  padding: 0;\n}\n.container {\n  max-width: 1200px;\n}",
            },
        ],
        "faq": [
            {"q": "CSS 格式化会改变属性的功能吗？", "a": "不会。格式化仅调整缩进和换行，不修改任何属性值和选择器名称，保证功能完全不变。"},
            {"q": "支持 SCSS 或 Less 等预处理器吗？", "a": "目前主要支持标准 CSS。如果您使用 SCSS 或 Less，建议先编译为标准 CSS 后再进行格式化。"},
            {"q": "格式化后代码变长，会影响性能吗？", "a": "不影响。CSS 文件的执行性能不受格式化影响。如果担心文件大小，可以使用压缩模式生成精简版本。"},
        ],
    },
    "js-formatter": {
        "features": [
            "支持 ES6+ 语法，包括箭头函数、模板字符串、解构赋值",
            "智能缩进和换行，保持代码风格一致性",
            "支持去除 JavaScript 注释，生成精简代码",
            "保留字符串和正则表达式字面量的完整性",
            "支持压缩为单行格式",
        ],
        "usage": "将 JavaScript 代码粘贴到输入框，选择格式化和缩进大小，点击「格式化」按钮即可美化代码。支持最新的 ES2023 语法特性。可以勾选去除注释，生成更简洁的代码。",
        "examples": [
            {
                "title": "JS 格式化示例",
                "code": "// 格式化前\nconst add=(a,b)=>a+b;const obj={name:'test',fn(){return this.name}}\n\n// 格式化后\nconst add = (a, b) => a + b;\nconst obj = {\n  name: 'test',\n  fn() {\n    return this.name;\n  }\n};",
            },
        ],
        "faq": [
            {"q": "JS 格式化后代码功能会变化吗？", "a": "不会。格式化仅调整代码的排版格式，不会改变代码执行逻辑。所有字符串、正则表达式和注释都受到保护。"},
            {"q": "支持 TypeScript 代码吗？", "a": "当前版本主要针对标准 JavaScript。TypeScript 代码建议使用官方的 tsc 或 prettier 进行格式化。"},
            {"q": "去除注释后还能恢复吗？", "a": "不能。去除注释是不可逆的操作。建议保留原始代码备份，或将去除注释后的代码用于生产环境。"},
        ],
    },
    "sql-formatter": {
        "features": [
            "支持 SQL SELECT、INSERT、UPDATE、DELETE 等主要语句",
            "30+ 个 SQL 关键字自动大写并换行（SELECT、FROM、WHERE、JOIN 等）",
            "智能处理子查询嵌套层级",
            "支持 JOIN 语句的多种类型（INNER、LEFT、RIGHT、FULL）",
            "保持字符串和数字字面量的完整性",
        ],
        "usage": "将您的 SQL 查询语句粘贴到输入框，点击「格式化」即可美化 SQL 代码。支持标准 SQL 语法。格式化后关键字自动大写、子查询自动缩进、JOIN 语句对齐，让复杂的 SQL 查询变得清晰易读。",
        "examples": [
            {
                "title": "SQL 格式化示例",
                "code": "-- 格式化前\nSELECT u.name,o.total FROM users u JOIN orders o ON u.id=o.user_id WHERE o.total>100 ORDER BY o.total DESC\n\n-- 格式化后\nSELECT\n  u.name,\n  o.total\nFROM\n  users u\n  JOIN orders o ON u.id = o.user_id\nWHERE\n  o.total > 100\nORDER BY\n  o.total DESC",
            },
        ],
        "faq": [
            {"q": "支持哪些数据库方言？", "a": "主要支持标准 SQL 语法。MySQL、PostgreSQL、SQLite 等主流数据库的基本语法都兼容。"},
            {"q": "格式化后能保持查询性能吗？", "a": "完全不影响。格式化只改变 SQL 的排版，不影响数据库执行计划和查询性能。"},
            {"q": "支持存储过程和函数吗？", "a": "支持基本的存储过程和函数语法格式化。复杂的 PL/SQL 或 T-SQL 可能需要专门的工具。"},
        ],
    },
    "base64-encode-decode": {
        "features": [
            "支持 Base64 编码和解码双向转换",
            "正确处理中文字符和 Unicode 字符",
            "编码结果使用标准 Base64 字母表（A-Z, a-z, 0-9, +, /）",
            "自动处理 = 填充字符",
            "支持复制结果，快捷键切换",
        ],
        "usage": "在输入框中输入要编码的文本或要解码的 Base64 字符串。选择「编码」模式将普通文本转为 Base64，选择「解码」模式将 Base64 字符串还原为原始文本。支持中文、英文、符号等任意字符。",
        "examples": [
            {
                "title": "Base64 编解码示例",
                "code": '# 编码\n输入: Hello World\n编码后: SGVsbG8gV29ybGQ=\n\n# 解码\n输入: SGVsbG8gV29ybGQ=\n解码后: Hello World',
            },
        ],
        "faq": [
            {"q": "Base64 是加密吗？", "a": "不是。Base64 只是一种编码方式，不是加密，它编码后的数据可以轻松解码回原文。请不要用 Base64 保护敏感数据。"},
            {"q": "为什么编码结果末尾有等号？", "a": "等号是 Base64 的填充字符。当原始数据长度不是 3 字节的整数倍时，会在输出末尾添加一个或两个等号。"},
            {"q": "Base64 编码会让数据变大吗？", "a": "会的。Base64 编码会使数据体积增加约 33%，每 3 个字节编码为 4 个字符。"},
        ],
    },
    "url-encode-decode": {
        "features": [
            "支持 URL 编码和解码双向转换",
            "正确处理非 ASCII 字符（中文、日文等）",
            "遵循 RFC 3986 标准编码规则",
            "编码结果可直接用于 URL 参数传递",
            "支持一键切换编码/解码模式",
        ],
        "usage": "在输入框中输入需要编码或解码的 URL 字符串。选择「编码」模式将文本转换为 URL 安全格式，选择「解码」模式将编码后的 URL 还原为原始文本。常用于处理包含特殊字符的 URL 参数。",
        "examples": [
            {
                "title": "URL 编解码示例",
                "code": '# 编码\n输入: name=张三&city=北京\n编码后: name%3D%E5%BC%A0%E4%B8%89%26city%3D%E5%8C%97%E4%BA%AC\n\n# 解码\n输入: hello%20world%21\n解码后: hello world!',
            },
        ],
        "faq": [
            {"q": "URL 编码和 Base64 编码有什么区别？", "a": "URL 编码用于将 URL 中的特殊字符转为百分号格式，而 Base64 用于将二进制数据转为文本。两者的编码规则和应用场景完全不同。"},
            {"q": "空格在 URL 编码中如何表示？", "a": "按照 RFC 3986 标准，空格编码为 %20。在某些场景下也可以使用 + 号表示空格，但推荐使用 %20。"},
            {"q": "为什么有些字符不需要编码？", "a": "字母（a-z、A-Z）、数字（0-9）和部分特殊字符（- _ . ~）在 URL 中是安全的，无需编码。"},
        ],
    },
    "md5-hash": {
        "features": [
            "计算任意字符串的 MD5 32 位十六进制哈希值",
            "支持对大段文本进行哈希计算",
            "哈希计算在浏览器本地完成，数据不上传服务器",
            "结果支持复制，方便比对",
            "快速处理，即时输出结果",
        ],
        "usage": "在输入框中输入需要计算 MD5 的文本，点击「计算」按钮即可得到 32 位的 MD5 哈希值。常用于文件校验、密码存储（不推荐，建议使用更安全的算法）和字符串指纹计算。",
        "examples": [
            {
                "title": "MD5 哈希示例",
                "code": "输入: hello world\nMD5: 5eb63bbbe01eeed093cb22bb8f5acdc3\n\n输入: admin\nMD5: 21232f297a57a5a743894a0e4a801fc3",
            },
        ],
        "faq": [
            {"q": "MD5 安全吗？", "a": "MD5 已被证明存在碰撞漏洞，不再适合用于安全加密场景。建议使用 SHA-256 等更安全的哈希算法进行数据完整性校验。"},
            {"q": "MD5 哈希值长度是多少？", "a": "MD5 生成 128 位（16 字节）的哈希值，通常表示为 32 位的十六进制字符串。"},
            {"q": "MD5 的结果可以解密吗？", "a": "不能。MD5 是单向哈希函数，理论上无法从哈希值反推出原始数据。所谓的 MD5 解密实际上是彩虹表查询。"},
        ],
    },
    "sha-hash": {
        "features": [
            "支持 SHA-1、SHA-256、SHA-384、SHA-512 四种算法",
            "在同一页面比较不同算法的哈希结果",
            "输出长度分别为 40、64、96、128 位十六进制字符",
            "适用于数字签名验证和数据完整性校验",
            "浏览器本地计算，保障数据隐私",
        ],
        "usage": "输入需要计算哈希的文本，选择 SHA 算法（SHA-1/256/384/512），点击计算即可得到对应算法的哈希值。SHA 系列算法广泛应用于数字签名、SSL 证书和数据完整性校验场景。",
        "examples": [
            {
                "title": "SHA 哈希示例",
                "code": "输入: hello world\nSHA-1:  2aae6c35c94fcfb415dbe95f408b9ce91ee846ed\nSHA-256: b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9\nSHA-512: 309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f",
            },
        ],
        "faq": [
            {"q": "SHA-1 和 SHA-256 哪个更安全？", "a": "SHA-256 更安全。SHA-1 已被 Google 在 2017 年成功碰撞，不再推荐用于安全场景。SHA-256 是目前安全性的标准选择。"},
            {"q": "不同的 SHA 算法输出长度有什么不同？", "a": "SHA-1 输出 160 位（40 个十六进制字符），SHA-256 输出 256 位（64 字符），SHA-512 输出 512 位（128 字符）。输出越长越安全。"},
            {"q": "SHA 哈希结果具有唯一性吗？", "a": "SHA 算法具有抗碰撞性，但理论上仍存在碰撞可能。不过对于 SHA-256 来说，碰撞概率极低，可以认为哈希值具有唯一性。"},
        ],
    },
    "aes-crypt": {
        "features": [
            "支持 AES-128、AES-192、AES-256 三种密钥长度",
            "支持 ECB 和 CBC 两种加密模式",
            "自动生成和解析初始化向量（IV）",
            "加密结果使用 Base64 编码输出，便于传输",
            "加密和解密功能无缝切换",
        ],
        "usage": "输入需要加密的文本，选择密钥长度（128/192/256 位）和加密模式（ECB/CBC）。输入密钥，点击「加密」按钮。CBC 模式需要输入初始化向量（IV）。解密时，将加密文本和相同的密钥、模式、IV 输入，点击「解密」即可还原。",
        "examples": [
            {
                "title": "AES 加密示例",
                "code": "输入: Hello World\n密钥: 1234567890123456\n模式: AES-128-CBC\nIV: 1234567890123456\n加密结果: U2FsdGVkX1+ZxJl3B0bG8A==",
            },
        ],
        "faq": [
            {"q": "ECB 和 CBC 模式有什么区别？", "a": "ECB 模式下相同的明文块会产生相同的密文块，安全性较低。CBC 模式每个块都与前一个块异或，相同的明文会产生不同的密文，更安全。"},
            {"q": "密钥长度应该如何选择？", "a": "对于大多数应用场景，AES-128 已经足够安全。如果处理高度敏感数据，可以选择 AES-256。密钥越长，加密和解密速度越慢。"},
            {"q": "忘记密钥还能解密吗？", "a": "不能。AES 是对称加密算法，加密和解密使用相同的密钥。请务必妥善保管密钥。"},
        ],
    },
    "timestamp-converter": {
        "features": [
            "支持 Unix 秒级（10 位）和毫秒级（13 位）时间戳",
            "自动识别时间戳精度",
            "实时显示转换后的日期时间",
            "支持复制原始时间戳和转换结果",
            "根据浏览器时区自动转换本地时间",
        ],
        "usage": "在输入框中输入 Unix 时间戳（10 位秒级或 13 位毫秒级），工具会自动识别并转换为对应的日期时间。同时在下方显示 UTC 时间和本地时间。支持一键复制转换结果。",
        "examples": [
            {
                "title": "时间戳转换示例",
                "code": "输入: 1704067200 (秒级)\n结果: 2024-01-01 08:00:00 (UTC+8 北京时间)\n\n输入: 1704067200000 (毫秒级)\n结果: 2024-01-01 08:00:00 (UTC+8 北京时间)",
            },
        ],
        "faq": [
            {"q": "什么是 Unix 时间戳？", "a": "Unix 时间戳是从 1970 年 1 月 1 日（UTC）开始经过的秒数（10 位）或毫秒数（13 位）。它是计算机系统中常用的时间表示方式。"},
            {"q": "时间戳和时间有什么区别？", "a": "时间戳是跨时区的绝对时间，而显示时间则取决于所在时区。同一个时间戳在不同时区下显示的时间不同。"},
            {"q": "2038 年问题是什么？", "a": "使用 32 位整数存储的秒级时间戳会在 2038 年溢出。现代系统已改用 64 位整数或毫秒级时间戳解决此问题。"},
        ],
    },
    "number-converter": {
        "features": [
            "支持二进制、八进制、十进制、十六进制相互转换",
            "实时转换，输入即显示所有进制的对应值",
            "支持大数转换，理论上限取决于浏览器",
            "十六进制支持大写和小写输出",
            "支持数字分组显示，便于阅读",
        ],
        "usage": "选择一个进制作为输入格式，输入对应的数字，工具会自动在所有进制之间进行转换。例如输入十进制 255，会同时显示二进制 11111111、八进制 377、十六进制 FF。",
        "examples": [
            {
                "title": "进制转换示例",
                "code": "十进制: 255\n二进制: 11111111\n八进制: 377\n十六进制: FF\n\n十进制: 1024\n二进制: 10000000000\n八进制: 2000\n十六进制: 400",
            },
        ],
        "faq": [
            {"q": "十六进制中的 A-F 代表什么？", "a": "十六进制使用 0-9 和 A-F 表示 0-15 的值。A=10、B=11、C=12、D=13、E=14、F=15。"},
            {"q": "支持负数转换吗？", "a": "本工具主要处理无符号整数。负数的二进制表示涉及补码概念，建议使用专门的计算工具。"},
            {"q": "为什么二进制看起来很长的数字？", "a": "因为二进制只使用 0 和 1 表示数字，同样的数值用二进制表示需要的位数比十进制多约 3.3 倍。"},
        ],
    },
    "case-converter": {
        "features": [
            "支持多种大小写转换模式：大写、小写、首字母大写、首字母小写",
            "支持驼峰式（camelCase）、帕斯卡（PascalCase）、蛇形式（snake_case）等格式转换",
            "支持短横线式（kebab-case）和常量式（CONSTANT_CASE）",
            "正确处理包含空格、连字符和下划线的混合文本",
            "不影响数字和非字母字符",
        ],
        "usage": "输入需要转换的文本，选择目标转换模式。支持大小写切换（全大写、全小写、首字母大写）和命名风格转换（驼峰、蛇形、短横线等）。",
        "examples": [
            {
                "title": "大小写转换示例",
                "code": "输入: hello_world_example\n\ncamelCase:    helloWorldExample\nPascalCase:   HelloWorldExample\nsnake_case:   hello_world_example\nkebab-case:   hello-world-example\nCONSTANT:     HELLO_WORLD_EXAMPLE",
            },
        ],
        "faq": [
            {"q": "camelCase 和 PascalCase 有什么区别？", "a": "camelCase 首字母小写（如 getUserName），PascalCase 首字母大写（如 GetUserName）。前者常用于变量和函数名，后者常用于类和组件名。"},
            {"q": "不同编程语言使用什么命名风格？", "a": "JavaScript 使用 camelCase（变量）和 PascalCase（类），Python 使用 snake_case，CSS 使用 kebab-case 作为属性名。"},
            {"q": "支持中文命名转换吗？", "a": "中文等非 ASCII 字符在命名转换中会被保留原样。命名风格转换主要针对英文单词间的分隔符。"},
        ],
    },
    "regex-tester": {
        "features": [
            "支持自定义正则表达式和 flags 修饰符（g/i/m），实时执行匹配测试",
            "清晰的匹配结果展示，包含匹配内容、位置索引和匹配总数",
            "内置替换功能，支持将匹配内容替换为指定文本并一键复制结果",
            "预置常用正则模板：手机号、邮箱、URL、IP 地址等常见模式",
            "即时错误检测，无效正则表达式会给出详细的语法错误信息",
        ],
        "usage": "在正则表达式输入框中输入要测试的正则模式，勾选需要的修饰符（全局匹配 g、忽略大小写 i、多行模式 m）。在测试文本区域中输入待匹配的文本，点击「执行匹配」按钮查看所有匹配结果。替换功能可以将匹配内容替换为指定文本。",
        "examples": [
            {
                "title": "正则测试示例",
                "code": "正则: \\d{11}\n文本: 我的电话是13812345678和15987654321\n匹配: 13812345678（位置 5）、15987654321（位置 18）\n总数: 2 个匹配",
            },
        ],
        "faq": [
            {"q": "正则表达式中的特殊字符如何匹配字面含义？", "a": "特殊字符如 . * + ? 等需要使用反斜杠转义，例如 \\. 匹配句点，\\* 匹配星号。"},
            {"q": "全局标志 g 和非全局匹配有什么区别？", "a": "全局标志 g 会查找所有匹配结果，非全局模式找到第一个匹配后就停止。"},
            {"q": "为什么我的正则表达式在替换时报错？", "a": "替换功能会自动移除全局标志 g。如果需要替换所有匹配，请在正则中保留 g 标志。"},
        ],
    },
    "word-counter": {
        "features": [
            "实时统计字符数（含空格和不含空格）、单词数",
            "支持中英文混排文本的正确统计",
            "统计段落数和行数",
            "显示最长段落长度和平均段落长度",
            "纯客户端处理，数据不上传服务器",
        ],
        "usage": "在文本框中输入或粘贴需要统计的文字，字符数、单词数、段落数等信息会实时更新。支持中英文混排，中文汉字会按字统计，英文按单词统计。",
        "examples": [
            {
                "title": "字数统计示例",
                "code": "输入: Hello World! 你好世界！\n字符数（含空格）: 20\n字符数（不含空格）: 18\n单词数: 4\n段落数: 1",
            },
        ],
        "faq": [
            {"q": "中文和英文的统计方式一样吗？", "a": "不完全一样。中文按字（汉字）统计，英文按单词（空格分隔）统计。在混排文本中，两种方式会同时适用。"},
            {"q": "这个工具适合用于论文统计吗？", "a": "可以作为参考，但正式的论文投稿建议使用专业的字数统计工具，因为不同机构对字数统计的定义可能不同。"},
            {"q": "标点符号算不算字数？", "a": "算。字符数统计包含所有字符，包括标点符号、空格和特殊字符。不含空格的字数会排除空格。"},
        ],
    },
    "text-processor": {
        "features": [
            "文本去重：移除重复行，保留首次出现的顺序",
            "文本排序：按字母顺序或逆序排列",
            "去除空行：清理文本中的空白行",
            "去除空格：移除行首、行尾或所有空格",
            "支持大小写转换、添加行号、反转顺序等操作",
        ],
        "usage": "在输入框中粘贴需要处理的文本，选择需要的处理操作。多项操作可以组合使用，例如先排序再去重。处理结果会实时或点击处理后显示。",
        "examples": [
            {
                "title": "文本处理示例",
                "code": "输入:\nbanana\napple\nbanana\ncherry\napple\n\n去重排序后:\napple\nbanana\ncherry",
            },
        ],
        "faq": [
            {"q": "多个操作可以同时使用吗？", "a": "可以。您可以选择多个操作组合使用，工具会按顺序依次处理。"},
            {"q": "支持大型文本处理吗？", "a": "处理能力取决于您的浏览器性能。对于超过几万行的文本，处理时间可能会稍长。"},
            {"q": "处理过程中数据安全吗？", "a": "所有处理完全在浏览器本地完成，您的数据不会上传到互联网。"},
        ],
    },
    "color-converter": {
        "features": [
            "支持 RGB、HEX、HSL 三种颜色格式相互转换",
            "实时预览颜色效果，所见即所得",
            "支持输入颜色名称快速识别",
            "复制任意格式的颜色代码",
            "支持透明度（Alpha）转换",
        ],
        "usage": "输入任意格式的颜色代码（如 #FF0000、rgb(255,0,0)、hsl(0,100%,50%)），工具会自动识别并转换为其他格式。实时预览区域会显示对应的颜色效果。",
        "examples": [
            {
                "title": "颜色转换示例",
                "code": "HEX: #FF6600\nRGB: rgb(255, 102, 0)\nHSL: hsl(24, 100%, 50%)\n\nHEX: #3366FF\nRGB: rgb(51, 102, 255)\nHSL: hsl(225, 100%, 60%)",
            },
        ],
        "faq": [
            {"q": "HEX 颜色中 #FFF 和 #FFFFFF 有什么区别？", "a": "#FFF 是 #FFFFFF 的缩写形式，当两位重复时可以使用 3 位十六进制。两者颜色值相同。"},
            {"q": "HSL 模型的优势是什么？", "a": "HSL 更符合人类对颜色的感知。调整亮度（Lightness）可以让颜色整体变亮或变暗，调整饱和度（Saturation）可以控制颜色的鲜艳程度。"},
            {"q": "CSS 中支持哪种颜色格式？", "a": "CSS 支持 RGB、HEX、HSL 以及各自的透明度变体（RGBA、HSLA）。现代 CSS 还支持 HWB、LAB 和 LCH 等更丰富的格式。"},
        ],
    },
    "calculator": {
        "features": [
            "支持加、减、乘、除四种基本运算",
            "支持括号优先级运算",
            "支持连续计算",
            "实时显示输入表达式",
            "支持清除和删除操作",
        ],
        "usage": "使用界面按钮或键盘输入计算表达式，按等号获取结果。支持括号来控制运算优先级，支持小数计算。常用于日常简单的数学计算。",
        "examples": [
            {
                "title": "计算器示例",
                "code": "输入: (15 + 3) × 4 ÷ 2\n过程: 18 × 4 ÷ 2 = 72 ÷ 2\n结果: 36",
            },
        ],
        "faq": [
            {"q": "支持的运算优先级是什么？", "a": "遵循标准数学运算优先级：括号 > 乘除 > 加减。例如 2 + 3 × 4 = 14（先乘后加）。"},
            {"q": "支持键盘输入吗？", "a": "支持。您可以使用键盘上的数字键、运算符键和回车键进行操作。"},
            {"q": "计算结果精度如何？", "a": "使用标准的浮点运算，对于大多数日常计算精度足够。对于需要高精度的科学计算，建议使用专业工具。"},
        ],
    },
    "qr-generator": {
        "features": [
            "支持将文本、网址等信息快速转换为二维码图片",
            "支持自定义二维码大小和容错级别",
            "生成的二维码永久有效，无过期时间",
            "支持下载二维码为 PNG 图片",
            "支持批量生成多个二维码",
        ],
        "usage": "在输入框中输入需要生成二维码的内容（文本、网址、联系方式等），选择二维码尺寸和容错级别，点击生成按钮即可生成二维码图片。支持右键保存或点击下载按钮保存为 PNG 格式。",
        "examples": [
            {
                "title": "二维码应用场景",
                "code": "场景1: 网站链接二维码 - 输入网址即可生成\n场景2: WiFi 连接二维码 - 加密信息一键分享\n场景3: 名片二维码 - 存储姓名、电话、邮箱",
            },
        ],
        "faq": [
            {"q": "生成的二维码会过期吗？", "a": "不会。二维码本身是一张静态图片，只要您生成的图片不丢失，就永久有效。"},
            {"q": "二维码能存储多少信息？", "a": "QR 码最大可存储 7089 个数字字符或 4296 个字母数字字符或 2953 个字节。建议内容不要过长。"},
            {"q": "扫码无法识别怎么办？", "a": "可以尝试增大二维码尺寸或降低容错级别。同时确保二维码图片清晰，没有遮挡或扭曲。"},
        ],
    },
    "password-generator": {
        "features": [
            "支持自定义密码长度（1-128 位）",
            "可选择包含大写字母、小写字母、数字、特殊符号",
            "使用浏览器加密级随机数生成（crypto.getRandomValues）",
            "排除易混淆字符（如 0/O、1/l）可选",
            "密码强度实时评估",
        ],
        "usage": "选择密码长度（建议至少 12 位），勾选需要的字符类型（大写字母、小写字母、数字、特殊符号），点击「生成密码」即可获得随机生成的强密码。支持一键复制密码。",
        "examples": [
            {
                "title": "密码生成示例",
                "code": "12位含全部字符: aB3#kL9$xR2@\n16位含全部字符: F7&gH2*nM5@pQ9#s\n20位含全部字符: wP8$rT3&yU6*iO0(lK2)vB",
            },
        ],
        "faq": [
            {"q": "多少位的密码才安全？", "a": "建议至少 12 位。包含大小写字母、数字和符号的 12 位密码，暴力破解需要数百万年。"},
            {"q": "生成的密码我记不住怎么办？", "a": "建议使用密码管理器（如 1Password、Bitwarden）来保存密码。您只需记住主密码即可。"},
            {"q": "密码生成依赖网络吗？", "a": "不依赖。密码完全在您的浏览器本地生成，不会通过网络传输，确保密码安全。"},
        ],
    },
    "time-difference": {
        "features": [
            "支持计算两个日期之间的精确时间差",
            "自动处理不同天数、月份和年份的差异",
            "支持跨时区计算（UTC 和本地时区）",
            "结果显示为天、时、分、秒的复合格式",
            "支持添加和减去时间间隔",
        ],
        "usage": "选择起始日期和结束日期，工具会自动计算两者之间的时间差。支持精确到天、时、分、秒。可用于计算项目工期、倒计时、年龄等场景。",
        "examples": [
            {
                "title": "时间差计算示例",
                "code": "起始时间: 2024-01-01 00:00:00\n结束时间: 2024-12-31 23:59:59\n时间差: 365天 23小时 59分钟 59秒\n\n起始时间: 2024-01-15 08:30:00\n结束时间: 2024-01-20 17:45:30\n时间差: 5天 9小时 15分钟 30秒",
            },
        ],
        "faq": [
            {"q": "时间差计算考虑夏令时吗？", "a": "工具使用 UTC 时间进行计算，不受夏令时影响。如果需要考虑夏令时，建议使用专业的时区转换工具。"},
            {"q": "支持计算未来日期吗？", "a": "支持。您可以设置任意未来的日期作为结束时间，计算从现在到未来的时间差。"},
            {"q": "为什么我的计算结果和预期不一致？", "a": "请检查您输入的日期格式是否正确，以及是否选择了正确的时区。工具默认使用您的本地时区。"},
        ],
    },
}


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def add_content_section(path, tool_id):
    print(f"Processing: {tool_id}")
    content = read_file(path)
    
    # Skip if already processed
    if "Content section" in content:
        print(f"  SKIP: already has content for {tool_id}")
        return

    tool_content = CONTENT.get(tool_id)
    if not tool_content:
        print(f"  SKIP: no content for {tool_id}")
        return

    def jsx_escape(text):
        return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("{", "&lbrace;").replace("}", "&rbrace;")

    features_html = "\n".join(f'            <li>{jsx_escape(f)}</li>' for f in tool_content["features"])
    usage = jsx_escape(tool_content["usage"])
    examples_html = ""
    for ex in tool_content["examples"]:
        code = ex["code"]
        # Escape for JSX template literal
        code = code.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
        examples_html += f"""          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{jsx_escape(ex["title"])}</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{{`{code}`}}</pre>
"""
    
    faq_html = "\n".join(
        f"""            <div>
              <h3 className="font-semibold text-gray-900">{jsx_escape(faq["q"])}</h3>
              <p className="text-gray-700">{jsx_escape(faq["a"])}</p>
            </div>"""
        for faq in tool_content["faq"]
    )

    section = f"""
      {{/* Content section */}}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
{features_html}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">{usage}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
{examples_html}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
{faq_html}
          </div>
        </section>
      </div>
"""

    # Find insertion point: before the final closing </div> before );}
    import re
    pattern = r'\n( *)\)\s*;\s*\n\}\s*\Z'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        before = content[:match.start(1)]
        last_div = before.rfind('</div>')
        if last_div >= 0:
            content = content[:last_div] + section + "\n" + content[last_div:]
            write_file(path, content)
            print(f"  DONE: content added to {tool_id}")
        else:
            print(f"  ERROR: no </div> found in {tool_id}")
    else:
        print(f"  ERROR: could not find insertion point in {tool_id}")


def main():
    dirs = sorted(os.listdir(CONTENT_DIR))
    for d in dirs:
        page_path = os.path.join(CONTENT_DIR, d, "page.tsx")
        if os.path.exists(page_path):
            add_content_section(page_path, d)

    print("\nAll files processed.")


if __name__ == "__main__":
    main()
