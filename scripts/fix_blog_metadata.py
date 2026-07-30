import os
import re

BLOG_DIR = "src/app/blog"

BLOG_META = {
    "base64-url-guide": ("Base64与URL编码详解", "Base64和URL编码是Web开发中最常用的编码方式，本文深入浅出地讲解它们的原理和使用场景。"),
    "color-converter-guide": ("颜色转换完全指南：RGB、HEX和HSL详解", "RGB、HEX、HSL三种颜色格式的原理和转换方法，帮助前端开发者和设计师轻松应对颜色编码问题。"),
    "encryption-guide": ("加密解密工具完全使用指南", "详细介绍MD5、SHA、AES等加密解密工具的使用方法和应用场景。"),
    "formatting-best-practices": ("数据格式化最佳实践", "掌握JSON、XML、HTML、CSS、JavaScript、SQL等常用数据格式的格式化技巧。"),
    "how-to-use-word-counter": ("如何使用字数统计工具提升写作效率", "字数统计工具的使用技巧，帮助提升写作效率和分析文章结构。"),
    "json-formatting-best-practices": ("JSON格式化最佳实践", "JSON格式化的最佳实践，包括缩进、校验和常见错误处理。"),
    "online-password-generator": ("在线密码生成器", "利用密码生成器创建真正安全的强密码，保护数字身份安全。"),
    "password-security-tips": ("2024年密码安全完全指南", "如何创建强密码、管理密码以及保护在线账户安全的最佳实践。"),
    "qr-code-applications": ("二维码的10种创意应用场景", "二维码在营销、教育、物流等领域的创意应用。"),
    "regex-guide": ("正则表达式入门完全指南", "从基础语法讲起，全面了解正则表达式的使用方法。"),
    "understanding-unix-timestamp": ("深入理解Unix时间戳", "Unix时间戳的原理、应用场景以及常见转换方法。"),
}

for slug, (title, desc) in BLOG_META.items():
    fp = os.path.join(BLOG_DIR, slug, "page.tsx")
    if not os.path.exists(fp):
        print(f"  SKIP {slug}: not found")
        continue
    
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remove "use client"; line
    content = content.replace('"use client";\n\n', '')
    content = content.replace('"use client";\n', '')
    
    # Add metadata after imports
    meta_block = f'''import type {{ Metadata }} from "next";

export const metadata: Metadata = {{
  title: "{title} - 在线工具箱",
  description: "{desc}",
  alternates: {{ canonical: "./" }},
  openGraph: {{
    title: "{title} - 在线工具箱",
    description: "{desc}",
  }},
}};

'''
    
    # Insert metadata after the last import line
    lines = content.split('\n')
    last_import = -1
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import = i
    
    if last_import >= 0:
        lines.insert(last_import + 1, meta_block)
        content = '\n'.join(lines)
    
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Fixed: {slug} {title}")

print("\nDone!")
