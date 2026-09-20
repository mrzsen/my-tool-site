#!/usr/bin/env python3
"""Add generic content to remaining tool pages."""
import os

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src/app/tools")

GENERIC = """
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">这款在线工具为用户提供了便捷高效的处理方式，帮助您快速完成日常任务。工具完全在浏览器本地运行，确保数据安全和隐私保护，无需安装任何软件即可使用。</p>
          <p className="text-gray-700 leading-relaxed mt-4">无论您是专业开发者还是普通用户，这款工具都能显著提升工作效率。通过直观的界面和即时反馈，复杂的问题变得简单易懂。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>日常办公</strong>：快速完成常见的数据处理和转换任务</li>
            <li><strong>学习工作</strong>：提高工作效率，节省重复操作的时间</li>
            <li><strong>快速原型</strong>：在开发过程中快速测试和验证想法</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">所有处理均在浏览器本地完成，使用 JavaScript 进行计算和处理。用户输入的数据不会离开设备，确保隐私安全。工具基于现代前端框架构建，提供流畅的用户体验。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>使用前请确认输入数据格式正确，以获得最佳结果</li>
            <li>处理完成后建议使用复制功能保存结果</li>
            <li>所有操作均在本地进行，适合处理敏感数据</li>
          </ul>
        </section>
"""

def main():
    tools_dir = CONTENT_DIR
    added = 0
    for tool_name in sorted(os.listdir(tools_dir)):
        tool_path = os.path.join(tools_dir, tool_name, "tool.tsx")
        if not os.path.exists(tool_path):
            continue
        with open(tool_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "为什么这个工具如此重要" in content:
            continue
        
        marker = "      </div>\n\n</div>\n  );"
        if marker not in content:
            marker2 = "          </div>\n        </section>\n      </div>"
            if marker2 in content:
                idx = content.rfind(marker2)
                if idx != -1:
                    end_pos = idx + len(marker2)
                    new_content = content[:end_pos] + "\n" + GENERIC + content[end_pos:]
                    with open(tool_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    added += 1
                    print(f"Added content to {tool_name}")
            else:
                print(f"No marker found for {tool_name}")
            continue
        
        idx = content.find(marker)
        if idx != -1:
            new_content = content[:idx] + GENERIC + "\n" + content[idx:]
            with open(tool_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            added += 1
            print(f"Added content to {tool_name}")
    
    print(f"\nDone! Added content to {added} additional tool pages.")

if __name__ == "__main__":
    main()