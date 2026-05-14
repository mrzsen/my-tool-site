// 批量添加 SEO 元数据到所有工具页面
// 运行方式: node scripts/add-metadata.js
const fs = require('fs');
const path = require('path');

const toolMetadata = {
  "json-formatter": { title: "JSON 格式化工具", desc: "在线JSON格式化、压缩、校验工具，支持带注释JSON、键排序、树形视图、路径查询、转义等。" },
  "base64-encode-decode": { title: "Base64 编解码工具", desc: "在线Base64编码解码工具，支持文本内容的快速转换。" },
  "url-encode-decode": { title: "URL 编解码工具", desc: "在线URL编码解码工具，支持UTF-8中文编码转换。" },
  "encrypt-hash": { title: "加密哈希工具(MD5/SHA)", desc: "支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法在线计算。" },
  "aes-crypt": { title: "AES 加密解密工具", desc: "在线AES对称加密解密工具，支持ECB和CBC模式，128/192/256位密钥。" },
  "regex-tester": { title: "正则表达式测试工具", desc: "在线正则表达式实时测试工具，支持匹配查找和替换功能。" },
  "qr-generator": { title: "二维码生成器", desc: "在线二维码生成工具，支持文本、网址等多种内容，可自定义尺寸并下载。" },
  "word-counter": { title: "字数统计工具", desc: "在线字数统计工具，实时统计字符数、词数、行数、段落数，支持中英文混排。" },
  "text-processor": { title: "文本处理工具箱", desc: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种功能。" },
  "case-converter": { title: "大小写转换工具", desc: "在线文本大小写转换工具，支持驼峰、下划线等多种格式。" },
  "color-converter": { title: "颜色转换工具", desc: "在线颜色格式转换工具，支持RGB、HEX、HSL等多种格式互转。" },
  "number-converter": { title: "进制转换工具", desc: "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。" },
  "timestamp-converter": { title: "时间戳转换工具", desc: "在线Unix时间戳转换工具，支持时间戳与日期时间相互转换。" },
  "calculator": { title: "在线计算器", desc: "简洁实用的在线计算器，支持加减乘除基本数学运算。" },
  "password-generator": { title: "密码生成器", desc: "在线安全密码生成器，可自定义长度和字符类型，生成高强度随机密码。" },
  "time-difference": { title: "时间差计算器", desc: "在线时间差计算工具，计算两个日期时间之间的天数、小时、分钟、秒数。" },
  "xml-formatter": { title: "XML 格式化工具", desc: "在线XML格式化美化工具，支持XML代码压缩和缩进调整。" },
  "html-formatter": { title: "HTML 格式化工具", desc: "在线HTML代码格式化工具，支持HTML5标签美化、压缩。" },
  "css-formatter": { title: "CSS 格式化工具", desc: "在线CSS代码格式化美化工具，支持样式表压缩。" },
  "js-formatter": { title: "JS 格式化工具", desc: "在线JavaScript代码格式化工具，支持代码压缩和注释移除。" },
  "sql-formatter": { title: "SQL 格式化工具", desc: "在线SQL语句格式化工具，支持SQL美化和压缩。" },
};

const blogMetadata = {
  "understanding-unix-timestamp": { title: "深入理解 Unix 时间戳", desc: "深入讲解Unix时间戳的原理、应用场景以及常见转换方法。" },
  "json-formatting-best-practices": { title: "JSON 格式化最佳实践", desc: "介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。" },
  "qr-code-applications": { title: "二维码的 10 种创意应用场景", desc: "探索二维码在营销、教育、物流等领域的创意应用。" },
  "password-security-tips": { title: "密码安全完全指南", desc: "分享如何创建强密码、管理密码以及保护在线账户安全的最佳实践。" },
  "how-to-use-word-counter": { title: "如何使用字数统计工具", desc: "详细介绍如何充分利用字数统计工具提升写作效率。" },
  "encryption-guide": { title: "加密解密工具使用指南", desc: "详细介绍MD5、SHA、AES等加密解密工具的使用方法和应用场景。" },
  "formatting-best-practices": { title: "数据格式化最佳实践", desc: "掌握JSON、XML、HTML、CSS、JavaScript、SQL等常用数据格式的格式化技巧。" },
  "regex-guide": { title: "正则表达式入门指南", desc: "从零开始全面了解正则表达式的使用方法，掌握模式匹配技巧。" },
  "base64-url-guide": { title: "Base64 与 URL 编码详解", desc: "深入浅出地讲解Base64和URL编码的原理和使用场景。" },
};

function addMetadataToToolPage(filePath, slug) {
  const meta = toolMetadata[slug];
  if (!meta) {
    console.log(`⚠️  未找到元数据: ${slug}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 如果已有 export const metadata，跳过
  if (content.includes('export const metadata')) {
    console.log(`⏭️  已存在 metadata，跳过: ${slug}`);
    return;
  }

  // 在 "use client"; 后面添加 metadata
  content = content.replace(
    /("use client";\s*\n)/,
    `$1import type { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "${meta.title} | 在线工具箱",\n  description: "${meta.desc}",\n  alternates: {\n    canonical: "https://tool.wnsj.net/tools/${slug}"\n  }\n};\n\n`
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ ${slug} 添加成功`);
}

function addMetadataToBlogPage(filePath, slug) {
  const meta = blogMetadata[slug];
  if (!meta) {
    console.log(`⚠️  未找到元数据: ${slug}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('export const metadata')) {
    console.log(`⏭️  已存在 metadata，跳过: blog/${slug}`);
    return;
  }

  content = content.replace(
    /("use client";\s*\n)/,
    `$1import type { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "${meta.title} | 博客 - 在线工具箱",\n  description: "${meta.desc}",\n  alternates: {\n    canonical: "https://tool.wnsj.net/blog/${slug}"\n  }\n};\n\n`
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ blog/${slug} 添加成功`);
}

// 处理工具页面
const toolsDir = path.join(__dirname, '../src/app/tools');
const toolDirs = fs.readdirSync(toolsDir);

toolDirs.forEach(dir => {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    addMetadataToToolPage(pagePath, dir);
  }
});

// 处理博客页面
const blogDir = path.join(__dirname, '../src/app/blog');
if (fs.existsSync(blogDir)) {
  const blogDirs = fs.readdirSync(blogDir);
  blogDirs.forEach(dir => {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      addMetadataToBlogPage(pagePath, dir);
    }
  });
}

console.log('\n🎉 所有页面 SEO 元数据添加完成！');