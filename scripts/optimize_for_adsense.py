import os
import re
import glob

TOOLS_DIR = "src/app/tools"

TOOL_META = {
    "json-formatter": ("JSON 格式化", "在线JSON格式化工具，支持带注释的JSON格式化、压缩、校验，自动去除尾随逗号，多种缩进选择。"),
    "xml-formatter": ("XML 格式化", "在线XML格式化工具，支持XML数据美化、压缩、命名空间保留，智能缩进XML标签层级。"),
    "html-formatter": ("HTML 格式化", "在线HTML格式化工具，支持HTML代码美化、压缩，智能识别块级元素和内联元素。"),
    "css-formatter": ("CSS 格式化", "在线CSS格式化工具，支持CSS样式表美化、压缩，属性排序和格式化。"),
    "js-formatter": ("JS 格式化", "在线JavaScript格式化工具，支持JS代码美化、压缩、注释移除，智能缩进。"),
    "sql-formatter": ("SQL 格式化", "在线SQL格式化工具，支持SQL语句美化、压缩，关键字自动大写和换行。"),
    "md5-hash": ("MD5 哈希", "在线MD5加密工具，支持字符串和文件的MD5哈希计算，生成32位和16位哈希值。"),
    "sha-hash": ("SHA 哈希", "在线SHA加密工具，支持SHA-1/256/384/512等多种安全哈希算法计算。"),
    "aes-crypt": ("AES 加密", "在线AES加密解密工具，支持ECB/CBC模式，PKCS5/PKCS7填充，多种密钥长度。"),
    "base64-encode-decode": ("Base64 编解码", "在线Base64编解码工具，支持文本和文件的Base64编码解码，一键复制。"),
    "url-encode-decode": ("URL 编解码", "在线URL编解码工具，支持URL特殊字符和中文的编码解码，双向互转。"),
    "timestamp-converter": ("时间戳转换", "在线Unix时间戳转换工具，支持秒级毫秒级时间戳与日期时间互转。"),
    "number-converter": ("进制转换", "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。"),
    "case-converter": ("大小写转换", "在线文本大小写转换工具，支持大写、小写、首字母大写、驼峰命名转换。"),
    "regex-tester": ("正则表达式测试", "在线正则表达式测试工具，支持实时匹配替换，显示匹配详情和分组。"),
    "text-processor": ("文本处理", "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种处理。"),
    "word-counter": ("字数统计", "在线字数统计工具，实时统计字符数、单词数、段落数、行数等信息。"),
    "color-converter": ("颜色转换", "在线颜色转换工具，支持RGB、HEX、HSL颜色格式之间相互转换。"),
    "calculator": ("在线计算器", "在线计算器工具，支持加减乘除、括号运算和连续计算。"),
    "qr-generator": ("二维码生成器", "在线二维码生成工具，支持将文本、网址等信息生成二维码图片下载。"),
    "password-generator": ("密码生成器", "在线密码生成工具，生成安全随机强密码，支持自定义长度和字符。"),
    "time-difference": ("时间差计算", "在线时间差计算工具，计算两个日期时间之间的精确时间差。"),
    "encrypt-hash": ("加密/哈希", "在线加密哈希工具合集，支持MD5、SHA系列、AES等多种加密算法。"),
}


def process_tool(tool_id):
    tool_dir = os.path.join(TOOLS_DIR, tool_id)
    page_path = os.path.join(tool_dir, "page.tsx")
    tool_path = os.path.join(tool_dir, "tool.tsx")
    
    if not os.path.exists(page_path):
        print(f"  SKIP {tool_id}: no page.tsx")
        return
    
    if tool_id not in TOOL_META:
        print(f"  SKIP {tool_id}: no metadata")
        return
    
    tool_title, tool_desc = TOOL_META[tool_id]
    
    # Read existing page
    with open(page_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract function name from "export default function XXXPage"
    match = re.search(r'export default function\s+(\w+)', content)
    if not match:
        print(f"  SKIP {tool_id}: cannot find export default function")
        return
    
    old_func = match.group(1)
    new_func = old_func.replace("Page", "Tool")
    
    # Create tool.tsx - rename the export
    tool_content = content.replace(
        "export default function " + old_func,
        "export default function " + new_func
    )
    # Also rename the function reference in JSX if it's self-referencing
    # (not usually needed for tool pages)
    
    with open(tool_path, "w", encoding="utf-8") as f:
        f.write(tool_content)
    print(f"  Created: {tool_path}")
    
    # Create new page.tsx as a server component wrapper with SEO metadata + AdSense
    import json
    safe_title = json.dumps(tool_title, ensure_ascii=False)
    safe_desc = json.dumps(tool_desc, ensure_ascii=False)
    safe_full_title = json.dumps(f"{tool_title} - 在线工具箱", ensure_ascii=False)
    
    page_content = 'import type { Metadata } from "next";\n'
    page_content += 'import ' + new_func + ' from "./tool";\n'
    page_content += 'import AdSenseSlot from "@/components/AdSenseSlot";\n'
    page_content += '\n'
    page_content += 'export const metadata: Metadata = {\n'
    page_content += '  title: ' + safe_full_title + ',\n'
    page_content += '  description: ' + safe_desc + ',\n'
    page_content += '  alternates: { canonical: "./" },\n'
    page_content += '  openGraph: {\n'
    page_content += '    title: ' + safe_full_title + ',\n'
    page_content += '    description: ' + safe_desc + ',\n'
    page_content += '  },\n'
    page_content += '};\n'
    page_content += '\n'
    page_content += 'export default function Page() {\n'
    page_content += '  return (\n'
    page_content += '    <>\n'
    page_content += '      <' + new_func + ' />\n'
    page_content += '      <div className="max-w-5xl mx-auto px-4 py-8">\n'
    page_content += '        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />\n'
    page_content += '      </div>\n'
    page_content += '    </>\n'
    page_content += '  );\n'
    page_content += '}\n'
    
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"  Updated: {page_path}")


def main():
    print("=== Restructuring tool pages ===")
    
    for tool_id in sorted(os.listdir(TOOLS_DIR)):
        tool_dir = os.path.join(TOOLS_DIR, tool_id)
        if os.path.isdir(tool_dir):
            process_tool(tool_id)
    
    print("\nDone!")


if __name__ == "__main__":
    main()
