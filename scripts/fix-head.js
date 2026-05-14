// 修复脚本：移除 client 组件中的 metadata 导出，改用 <Head>
const fs = require('fs');
const path = require('path');

function fixPage(filePath, title, description, canonical) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 移除旧的 metadata 导出块
  const metadataRegex = /import type \{ Metadata \}.*?export const metadata[\s\S]*?^};\s*\n/m;
  content = content.replace(metadataRegex, '');

  // 移除可能残留的空 import type 行
  content = content.replace(/import type \{ Metadata \} from "next";\n?/g, '');

  // 添加 Head
  content = content.replace(
    /("use client";\s*\n)/,
    `$1import Head from "next/head";\n`
  );

  // 在 return 的 JSX 最前面添加 Head 标签
  // 查找第一个 return ( 并在其后添加 Head
  const returnMatch = content.match(/return\s*\(\s*\n(\s*)(<[^>]+>)/);
  if (returnMatch) {
    const indent = returnMatch[1] || '';
    const headTag = `${indent}<Head>\n${indent}  <title>${title}</title>\n${indent}  <meta name="description" content="${description}" />\n${indent}  <link rel="canonical" href="${canonical}" />\n${indent}</Head>\n\n`;
    content = content.replace(returnMatch[0], `return (\n${headTag}${indent}${returnMatch[2]}`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

const toolMetadata = {
  "aes-crypt": { title: "AES 加密解密工具", desc: "在线AES对称加密解密工具，支持ECB和CBC模式，128/192/256位密钥。", slug: "tools/aes-crypt" },
  "base64-encode-decode": { title: "Base64 编解码工具", desc: "在线Base64编码解码工具，支持文本内容的快速转换。", slug: "tools/base64-encode-decode" },
  "calculator": { title: "在线计算器", desc: "简洁实用的在线计算器，支持加减乘除基本数学运算。", slug: "tools/calculator" },
  "case-converter": { title: "大小写转换工具", desc: "在线文本大小写转换工具，支持驼峰、下划线等多种格式。", slug: "tools/case-converter" },
  "color-converter": { title: "颜色转换工具", desc: "在线颜色格式转换工具，支持RGB、HEX、HSL等多种格式互转。", slug: "tools/color-converter" },
  "css-formatter": { title: "CSS 格式化工具", desc: "在线CSS代码格式化美化工具，支持样式表压缩。", slug: "tools/css-formatter" },
  "encrypt-hash": { title: "加密哈希工具(MD5/SHA)", desc: "支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法在线计算。", slug: "tools/encrypt-hash" },
  "html-formatter": { title: "HTML 格式化工具", desc: "在线HTML代码格式化工具，支持HTML5标签美化、压缩。", slug: "tools/html-formatter" },
  "js-formatter": { title: "JS 格式化工具", desc: "在线JavaScript代码格式化工具，支持代码压缩和注释移除。", slug: "tools/js-formatter" },
  "json-formatter": { title: "JSON 格式化工具", desc: "在线JSON格式化、压缩、校验工具，支持带注释JSON、键排序、树形视图、路径查询、转义等。", slug: "tools/json-formatter" },
  "number-converter": { title: "进制转换工具", desc: "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。", slug: "tools/number-converter" },
  "password-generator": { title: "密码生成器", desc: "在线安全密码生成器，可自定义长度和字符类型，生成高强度随机密码。", slug: "tools/password-generator" },
  "qr-generator": { title: "二维码生成器", desc: "在线二维码生成工具，支持文本、网址等多种内容，可自定义尺寸并下载。", slug: "tools/qr-generator" },
  "regex-tester": { title: "正则表达式测试工具", desc: "在线正则表达式实时测试工具，支持匹配查找和替换功能。", slug: "tools/regex-tester" },
  "sql-formatter": { title: "SQL 格式化工具", desc: "在线SQL语句格式化工具，支持SQL美化和压缩。", slug: "tools/sql-formatter" },
  "text-processor": { title: "文本处理工具箱", desc: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种功能。", slug: "tools/text-processor" },
  "time-difference": { title: "时间差计算器", desc: "在线时间差计算工具，计算两个日期时间之间的天数、小时、分钟、秒数。", slug: "tools/time-difference" },
  "timestamp-converter": { title: "时间戳转换工具", desc: "在线Unix时间戳转换工具，支持时间戳与日期时间相互转换。", slug: "tools/timestamp-converter" },
  "url-encode-decode": { title: "URL 编解码工具", desc: "在线URL编码解码工具，支持UTF-8中文编码转换。", slug: "tools/url-encode-decode" },
  "word-counter": { title: "字数统计工具", desc: "在线字数统计工具，实时统计字符数、词数、行数、段落数，支持中英文混排。", slug: "tools/word-counter" },
  "xml-formatter": { title: "XML 格式化工具", desc: "在线XML格式化美化工具，支持XML代码压缩和缩进调整。", slug: "tools/xml-formatter" },
};

const blogMetadata = {
  "understanding-unix-timestamp": { title: "深入理解 Unix 时间戳", desc: "深入讲解Unix时间戳的原理、应用场景以及常见转换方法。", slug: "blog/understanding-unix-timestamp" },
  "qr-code-applications": { title: "二维码的 10 种创意应用场景", desc: "探索二维码在营销、教育、物流等领域的创意应用。", slug: "blog/qr-code-applications" },
  "password-security-tips": { title: "密码安全完全指南", desc: "分享如何创建强密码、管理密码以及保护在线账户安全的最佳实践。", slug: "blog/password-security-tips" },
  "json-formatting-best-practices": { title: "JSON 格式化最佳实践", desc: "介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。", slug: "blog/json-formatting-best-practices" },
  "how-to-use-word-counter": { title: "如何使用字数统计工具", desc: "详细介绍如何充分利用字数统计工具提升写作效率。", slug: "blog/how-to-use-word-counter" },
};

// 修复工具页面
const toolsDir = path.join(__dirname, '../src/app/tools');
Object.keys(toolMetadata).forEach(slug => {
  const pagePath = path.join(toolsDir, slug, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const meta = toolMetadata[slug];
    fixPage(pagePath, meta.title, meta.desc, `https://tool.wnsj.net/${meta.slug}`);
  }
});

// 修复博客页面
const blogDir = path.join(__dirname, '../src/app/blog');
Object.keys(blogMetadata).forEach(slug => {
  const pagePath = path.join(blogDir, slug, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const meta = blogMetadata[slug];
    fixPage(pagePath, meta.title, meta.desc, `https://tool.wnsj.net/${meta.slug}`);
  }
});

console.log('\n🎉 修复完成！所有页面现在使用 <Head> 组件进行 SEO。');