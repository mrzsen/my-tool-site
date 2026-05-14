#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有页面添加SEO <Head>标签
- 工具页面: 在 return ( 和第一个 <div 之间插入 <Head>
- 博客页面: 在 return ( 和第一个 <div 之间插入 <Head>
"""
import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

REPO = r"G:\ZSEN\shop\my-tool-site"

TOOL_META = {
    "aes-crypt": ("AES 加密解密工具", "在线AES对称加密解密，支持ECB和CBC模式，128/192/256位密钥。"),
    "base64-encode-decode": ("Base64 编解码工具", "在线Base64编码解码工具，支持文本内容的快速转换。"),
    "calculator": ("在线计算器", "基础计算器，支持加、减、乘、除运算。"),
    "case-converter": ("大小写转换工具", "在线文本大小写转换工具，支持驼峰、下划线等多种格式。"),
    "color-converter": ("颜色转换工具", "在线颜色格式转换工具，支持RGB、HEX、HSL等多种格式互转。"),
    "css-formatter": ("CSS 格式化工具", "在线CSS代码格式化美化工具，支持样式表压缩。"),
    "encrypt-hash": ("加密哈希工具", "支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法。"),
    "html-formatter": ("HTML 格式化工具", "在线HTML代码格式化工具，支持HTML5标签美化、压缩。"),
    "js-formatter": ("JS 格式化工具", "在线JavaScript代码格式化工具，支持代码压缩和注释移除。"),
    "json-formatter": ("JSON 格式化工具", "在线JSON格式化、压缩、校验工具，支持树形视图、路径查询、转义等。"),
    "number-converter": ("进制转换工具", "支持二进制、八进制、十进制、十六进制之间相互转换。"),
    "password-generator": ("密码生成器", "生成安全、随机的强密码，支持自定义长度。"),
    "qr-generator": ("二维码生成器", "将文本、网址等信息快速转换为二维码图片。"),
    "regex-tester": ("正则表达式测试", "实时测试正则表达式，支持匹配和替换功能。"),
    "sql-formatter": ("SQL 格式化工具", "SQL语句格式化工具，支持关键字高亮。"),
    "text-processor": ("文本处理工具箱", "文本去重、排序、去空格、大小写转换等多种处理。"),
    "time-difference": ("时间差计算器", "计算两个日期/时间之间的时间差。"),
    "timestamp-converter": ("时间戳转换工具", "Unix时间戳与日期时间相互转换，支持毫秒级。"),
    "url-encode-decode": ("URL 编解码工具", "支持UTF-8中文编码转换。"),
    "word-counter": ("字数统计工具", "实时统计字符数、单词数、段落数等信息。"),
    "xml-formatter": ("XML 格式化工具", "支持XML代码美化、压缩。"),
}

BLOG_META = {
    "understanding-unix-timestamp": ("深入理解Unix时间戳", "深入讲解Unix时间戳的原理、应用场景以及常见转换方法。"),
    "json-formatting-best-practices": ("JSON格式化最佳实践", "介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。"),
    "qr-code-applications": ("二维码的10种创意应用场景", "探索二维码在营销、教育、物流等领域的创意应用。"),
    "password-security-tips": ("2024年密码安全完全指南", "分享如何创建强密码、管理密码以及保护在线账户安全的最佳实践。"),
    "how-to-use-word-counter": ("如何使用字数统计工具提升写作效率", "详细介绍如何充分利用字数统计工具提升写作效率。"),
}

def head_block(title, desc, url):
    return f'''<Head>
        <title>{title} | 在线工具箱</title>
        <meta name="description" content="{desc}" />
        <link rel="canonical" href="{url}" />
      </Head>'''

def process_file(fpath, title, desc, url):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 如果已有Head标签，跳过
    if '<Head>' in content:
        return 'exists'

    # 1. 添加 import Head
    if 'import Head' not in content:
        # 在第一个 import 语句前添加（通常是 react import）
        react_import = 'import { useState'
        if react_import in content:
            content = content.replace(
                react_import,
                'import Head from "next/head";\n' + react_import
            )
        else:
            # 放到 "use client" 之后
            content = content.replace(
                '"use client";\n',
                '"use client";\n\nimport Head from "next/head";\n'
            )

    # 2. 在 return ( 之后、第一个 JSX 元素之前插入 <Head>
    # 匹配 return (\n....<div 或 return (\n....<svg 等
    # 简单策略：在 return ( 后的第一个 JSX 标签前插入
    pattern = r'(return\s*\(\s*\n)(\s*<)'
    match = re.search(pattern, content)
    if match:
        indent = match.group(2)  # 缩进
        # 计算缩进量
        spaces = len(indent)
        head_indent = ' ' * spaces
        head = f'''{match.group(1)}{head_indent}<Head>
{head_indent}  <title>{title} | 在线工具箱</title>
{head_indent}  <meta name="description" content="{desc}" />
{head_indent}  <link rel="canonical" href="{url}" />
{head_indent}</Head>
{head_indent}{match.group(2)}'''
        content = content[:match.start()] + head + content[match.end():]
    else:
        return 'no_match'

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    return 'ok'


# === 处理工具页面 ===
tools_dir = os.path.join(REPO, 'src', 'app', 'tools')
for slug, (title, desc) in TOOL_META.items():
    fpath = os.path.join(tools_dir, slug, 'page.tsx')
    if os.path.exists(fpath):
        result = process_file(fpath, title, desc, f'https://tool.wnsj.net/tools/{slug}')
        print(f'{result:10s} tools/{slug}')
    else:
        print(f'NOT_FOUND tools/{slug}')

# === 处理博客页面 ===
blog_dir = os.path.join(REPO, 'src', 'app', 'blog')
for slug, (title, desc) in BLOG_META.items():
    fpath = os.path.join(blog_dir, slug, 'page.tsx')
    if os.path.exists(fpath):
        result = process_file(fpath, title, desc, f'https://tool.wnsj.net/blog/{slug}')
        print(f'{result:10s} blog/{slug}')
    else:
        print(f'NOT_FOUND blog/{slug}')

print('\n完成！')