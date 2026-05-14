#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""为所有页面正确添加SEO Head标签（使用Fragment包裹）"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

REPO = r"G:\ZSEN\shop\my-tool-site"

TOOL_META = {
    "aes-crypt": ("AES 加密解密工具", "在线AES对称加密解密，支持ECB和CBC模式。"),
    "base64-encode-decode": ("Base64 编解码工具", "在线Base64编码解码工具。"),
    "calculator": ("在线计算器", "基础计算器，支持加减乘除运算。"),
    "case-converter": ("大小写转换工具", "文本大小写转换，支持驼峰、下划线等。"),
    "color-converter": ("颜色转换工具", "支持RGB、HEX、HSL互转。"),
    "css-formatter": ("CSS 格式化工具", "CSS代码格式化和压缩。"),
    "encrypt-hash": ("加密哈希工具", "支持MD5、SHA-1、SHA-256等算法。"),
    "html-formatter": ("HTML 格式化工具", "HTML代码格式化和压缩。"),
    "js-formatter": ("JS 格式化工具", "JavaScript代码格式化和压缩。"),
    "json-formatter": ("JSON 格式化工具", "JSON格式化、压缩、校验、树形视图等。"),
    "number-converter": ("进制转换工具", "支持二进制、八进制、十进制、十六进制。"),
    "password-generator": ("密码生成器", "生成安全随机密码。"),
    "qr-generator": ("二维码生成器", "将文本、网址转换为二维码图片。"),
    "regex-tester": ("正则表达式测试", "实时测试正则表达式，支持匹配替换。"),
    "sql-formatter": ("SQL 格式化工具", "SQL语句格式化和压缩。"),
    "text-processor": ("文本处理工具箱", "去重、排序、大小写转换等。"),
    "time-difference": ("时间差计算器", "计算两个日期时间之间的时间差。"),
    "timestamp-converter": ("时间戳转换工具", "Unix时间戳与日期时间互转。"),
    "url-encode-decode": ("URL 编解码工具", "支持UTF-8中文编码转换。"),
    "word-counter": ("字数统计工具", "实时统计字符数、单词数、段落数等。"),
    "xml-formatter": ("XML 格式化工具", "XML代码格式化和压缩。"),
}

BLOG_META = {
    "understanding-unix-timestamp": ("深入理解Unix时间戳", "讲解Unix时间戳原理、应用场景和转换方法。"),
    "json-formatting-best-practices": ("JSON格式化最佳实践", "JSON格式化的最佳实践，包括缩进、校验等。"),
    "qr-code-applications": ("二维码的10种应用场景", "二维码在营销、教育、物流等领域的创意应用。"),
    "password-security-tips": ("密码安全完全指南", "如何创建强密码、管理密码及保护账户安全。"),
    "how-to-use-word-counter": ("如何使用字数统计工具", "充分利用字数统计工具提升写作效率。"),
}

def fix_page(fpath, title, desc, url):
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()

    if '<Head>' in c:
        return 'exists'

    # 1. 添加 import Head
    if 'import Head' not in c:
        react_imp = 'import { useState'
        if react_imp in c:
            c = c.replace(react_imp, 'import Head from "next/head";\n' + react_imp)
        else:
            c = c.replace(
                '"use client";\n',
                '"use client";\n\nimport Head from "next/head";\n'
            )

    # 2. 匹配 return ( 后第一个 JSX 标签
    # 格式: return (\n    <div...  或 return (\n  <svg... 等
    pattern = r'(return\s*\(\s*\n)(\s*)(<)'
    m = re.search(pattern, c)
    if not m:
        return 'no_match'

    indent = m.group(2)  # e.g., "    " or "  "

    # 构建 Head 块（与 div 同级缩进）
    head = (
        f'{indent}<Head>\n'
        f'{indent}  <title>{title} | 在线工具箱</title>\n'
        f'{indent}  <meta name="description" content="{desc}" />\n'
        f'{indent}  <link rel="canonical" href="{url}" />\n'
        f'{indent}</Head>\n\n'
        f'{indent}<Fragment>'
    )

    # 插入 Head 和 Fragment 开头
    # 原内容: return (\n{indent}<div...
    # 新内容: return (\n{indent}<Head>...\n{indent}<Fragment>\n\n{indent}<div...
    new_return = m.group(1) + head + '\n\n' + m.group(2) + m.group(3)
    c = c[:m.start()] + new_return + c[m.end():]

    # 3. 在最后一个 </div> 后添加 </>
    # 匹配函数体内最后一个 </div> 后直到闭合括号
    # 需要找到属于 return 块中最后一个 </div>
    # 简单策略：从后往前找第一个 </div>，然后在其后插入 </>
    # 但要避开 <Head> 内的内容

    # 找到 return 后的最后部分
    return_match = re.search(r'return\s*\(', c)
    if return_match:
        after_return = c[return_match.start():]
        # 在 after_return 找最后一个 </div>（不在 Head 内）
        # 先去掉 Head 部分
        headless = re.sub(r'<Head>.*?</Head>', '', after_return, flags=re.DOTALL)
        # 在 headless 中找最后一个 </div>
        last_div = headless.rfind('</div>')
        if last_div >= 0:
            # 对应到原字符串中的位置
            # 更简单：直接在原字符串的最后一个 </div> 后插入
            # 找到整个 c 中 return 后的最后一个 </div>
            ri = c.rfind('</div>')
            if ri > return_match.start():
                # 确认不是 Head 内的
                head_section = c[m.start():m.start() + len(new_return)]
                if ri >= m.start() + len(new_return):
                    # 在 </div> 后插入 </> 和换行
                    c = c[:ri + 6] + f'\n{indent}</>\n' + c[ri + 6:]

    return 'ok'

# === 执行 ===
for slug, (t, d) in TOOL_META.items():
    fp = os.path.join(REPO, 'src', 'app', 'tools', slug, 'page.tsx')
    if os.path.exists(fp):
        print(f'{fix_page(fp, t, d, f"https://tool.wnsj.net/tools/{slug}"):10s} {slug}')

for slug, (t, d) in BLOG_META.items():
    fp = os.path.join(REPO, 'src', 'app', 'blog', slug, 'page.tsx')
    if os.path.exists(fp):
        print(f'{fix_page(fp, t, d, f"https://tool.wnsj.net/blog/{slug}"):10s} blog/{slug}')

print('\ndone!')