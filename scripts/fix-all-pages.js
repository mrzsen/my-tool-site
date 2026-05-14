const fs = require('fs');
const path = require('path');

const toolMeta = {
  "aes-crypt": { t: "AES 加密解密工具", d: "在线AES对称加密解密工具，支持ECB和CBC模式，128/192/256位密钥。", slug: "tools/aes-crypt" },
  "base64-encode-decode": { t: "Base64 编解码工具", d: "在线Base64编码解码工具，支持文本内容的快速转换。", slug: "tools/base64-encode-decode" },
  "calculator": { t: "在线计算器", d: "简洁实用的在线计算器，支持加减乘除基本数学运算。", slug: "tools/calculator" },
  "case-converter": { t: "大小写转换工具", d: "在线文本大小写转换工具，支持驼峰、下划线等多种格式。", slug: "tools/case-converter" },
  "color-converter": { t: "颜色转换工具", d: "在线颜色格式转换工具，支持RGB、HEX、HSL等多种格式互转。", slug: "tools/color-converter" },
  "css-formatter": { t: "CSS 格式化工具", d: "在线CSS代码格式化美化工具，支持样式表压缩。", slug: "tools/css-formatter" },
  "encrypt-hash": { t: "加密哈希工具(MD5/SHA)", d: "支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法在线计算。", slug: "tools/encrypt-hash" },
  "html-formatter": { t: "HTML 格式化工具", d: "在线HTML代码格式化工具，支持HTML5标签美化、压缩。", slug: "tools/html-formatter" },
  "js-formatter": { t: "JS 格式化工具", d: "在线JavaScript代码格式化工具，支持代码压缩和注释移除。", slug: "tools/js-formatter" },
  "json-formatter": { t: "JSON 格式化工具", d: "在线JSON格式化、压缩、校验工具，支持带注释JSON、键排序、树形视图、路径查询、转义等。", slug: "tools/json-formatter" },
  "number-converter": { t: "进制转换工具", d: "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。", slug: "tools/number-converter" },
  "password-generator": { t: "密码生成器", d: "在线安全密码生成器，可自定义长度和字符类型，生成高强度随机密码。", slug: "tools/password-generator" },
  "qr-generator": { t: "二维码生成器", d: "在线二维码生成工具，支持文本、网址等多种内容，可自定义尺寸并下载。", slug: "tools/qr-generator" },
  "regex-tester": { t: "正则表达式测试工具", d: "在线正则表达式实时测试工具，支持匹配查找和替换功能。", slug: "tools/regex-tester" },
  "sql-formatter": { t: "SQL 格式化工具", d: "在线SQL语句格式化工具，支持SQL美化和压缩。", slug: "tools/sql-formatter" },
  "text-processor": { t: "文本处理工具箱", d: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种功能。", slug: "tools/text-processor" },
  "time-difference": { t: "时间差计算器", d: "在线时间差计算工具，计算两个日期时间之间的天数、小时、分钟、秒数。", slug: "tools/time-difference" },
  "timestamp-converter": { t: "时间戳转换工具", d: "在线Unix时间戳转换工具，支持时间戳与日期时间相互转换。", slug: "tools/timestamp-converter" },
  "url-encode-decode": { t: "URL 编解码工具", d: "在线URL编码解码工具，支持UTF-8中文编码转换。", slug: "tools/url-encode-decode" },
  "word-counter": { t: "字数统计工具", d: "在线字数统计工具，实时统计字符数、词数、行数、段落数，支持中英文混排。", slug: "tools/word-counter" },
  "xml-formatter": { t: "XML 格式化工具", d: "在线XML格式化美化工具，支持XML代码压缩和缩进调整。", slug: "tools/xml-formatter" },
};

const blogMeta = {
  "understanding-unix-timestamp": { t: "深入理解 Unix 时间戳", d: "深入讲解Unix时间戳的原理、应用场景以及常见转换方法。", slug: "blog/understanding-unix-timestamp" },
  "qr-code-applications": { t: "二维码的 10 种创意应用场景", d: "探索二维码在营销、教育、物流等领域的创意应用。", slug: "blog/qr-code-applications" },
  "password-security-tips": { t: "密码安全完全指南", d: "分享如何创建强密码、管理密码以及保护在线账户安全的最佳实践。", slug: "blog/password-security-tips" },
  "json-formatting-best-practices": { t: "JSON 格式化最佳实践", d: "介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。", slug: "blog/json-formatting-best-practices" },
  "how-to-use-word-counter": { t: "如何使用字数统计工具", d: "详细介绍如何充分利用字数统计工具提升写作效率。", slug: "blog/how-to-use-word-counter" },
};

function fixFile(filePath, title, desc, canonical) {
  let c = fs.readFileSync(filePath, 'utf8');

  // 1. 移除 export const metadata 块 (从 export const metadata 到闭合的 };)
  c = c.replace(/export const metadata[\s\S]*?^};\s*\n/m, '');

  // 2. 移除 import type { Metadata } 行
  c = c.replace(/import type \{ Metadata \} from "next";\n?/g, '');

  // 3. 添加 Head import
  if (!c.includes('import Head from "next/head"')) {
    c = c.replace(/("use client";\s*\n)/, `$1import Head from "next/head";\n`);
  }

  // 4. 清理多余的空行（超过2行的空行）
  c = c.replace(/\n{3,}/g, '\n\n');

  // 5. 在 return 后的第一个 JSX 元素前插入 Head
  if (!c.includes('<Head>')) {
    // 定位 return 后的第一个 JSX 开始标签
    const match = c.match(/(return\s*\(\s*\n\s*)(<[A-Z][^>]*>)/);
    if (match) {
      const indent = '      ';
      const headCode = `${match[1]}<Head>\n${indent}<title>${title}</title>\n${indent}<meta name="description" content="${desc}" />\n${indent}<link rel="canonical" href="${canonical}" />\n${indent}</Head>\n\n${match[1]}${match[2]}`;
      c = c.replace(match[0], headCode);
    } else {
      // 尝试匹配 return ( <div 这种格式
      const match2 = c.match(/(return\s*\(\s*)(<div)/);
      if (match2) {
        const indent = '      ';
        const headCode = `${match2[1]}<Head>\n${indent}<title>${title}</title>\n${indent}<meta name="description" content="${desc}" />\n${indent}<link rel="canonical" href="${canonical}" />\n${indent}</Head>\n\n${match2[1]}${match2[2]}`;
        c = c.replace(match2[0], headCode);
      }
    }
  }

  fs.writeFileSync(filePath, c);
  console.log(`✅ ${filePath.replace(/.*\/src\/app\//, '')}`);
}

// 修复工具页面
const toolsDir = path.join(__dirname, '../src/app/tools');
Object.keys(toolMeta).forEach(slug => {
  const p = path.join(toolsDir, slug, 'page.tsx');
  if (fs.existsSync(p)) {
    const m = toolMeta[slug];
    fixFile(p, m.t, m.d, `https://tool.wnsj.net/${m.slug}`);
  }
});

// 修复博客页面
const blogDir = path.join(__dirname, '../src/app/blog');
Object.keys(blogMeta).forEach(slug => {
  const p = path.join(blogDir, slug, 'page.tsx');
  if (fs.existsSync(p)) {
    const m = blogMeta[slug];
    fixFile(p, m.t, m.d, `https://tool.wnsj.net/${m.slug}`);
  }
});

console.log('\n🎉 完成！');