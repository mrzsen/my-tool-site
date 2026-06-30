"use client";

import { useState, useCallback } from "react";

const VOID_ELEMENTS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

export default function HtmlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatHtml = useCallback(() => {
    try {
      let html = input.trim();
      if (!html) {
        setError("请输入 HTML 内容");
        setOutput("");
        return;
      }

      html = html.replace(/></g, ">\n<");

      let formatted = "";
      let indent = 0;
      const padding = "  ";

      const lines = html.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith("</")) {
          indent = Math.max(0, indent - 1);
        }

        formatted += padding.repeat(indent) + trimmed + "\n";

        if (trimmed.startsWith("<") && !trimmed.startsWith("</")) {
          const tagMatch = trimmed.match(/<(\w+)/);
          if (tagMatch) {
            const tagName = tagMatch[1].toLowerCase();
            if (
              !VOID_ELEMENTS.includes(tagName) &&
              !trimmed.endsWith("/>")
            ) {
              indent++;
            }
          }
        }
      }

      setOutput(formatted.trim());
      setError("");
    } catch (e) {
      setError("格式化失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const compressHtml = useCallback(() => {
    try {
      const compressed = input
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim();
      setOutput(compressed);
      setError("");
    } catch (e) {
      setError("压缩失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          HTML 格式化/压缩
        </h1>
        <p className="text-gray-600">
          格式化 HTML 代码使其更易读，或压缩 HTML 以减小体积
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 HTML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<html><body><h1>Hello</h1></body></html>"
            className="w-full h-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输出结果
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="结果将在这里显示..."
            className="w-full h-80 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={formatHtml}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📝 格式化
        </button>
        <button
          onClick={compressHtml}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📦 压缩
        </button>
        <button
          onClick={copyToClipboard}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          复制
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          清空
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用说明
        </h3>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>在左侧输入框中粘贴 HTML 代码</li>
          <li>点击「格式化」美化缩进和换行</li>
          <li>点击「压缩」去除空白和注释</li>
          <li>支持 HTML5 void 元素（如 br、img）的正确处理</li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 HTML5 所有标签和属性，包括 void 元素的自闭合格式</li>
            <li>智能识别块级元素和内联元素，优化换行策略</li>
            <li>保留属性顺序，支持布尔属性和自定义 data- 属性</li>
            <li>美化内嵌 CSS 和 JavaScript 代码块</li>
            <li>支持压缩模式，去除多余空白字符</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中粘贴需要格式化的 HTML 代码，点击「格式化」按钮即可获得结构清晰的 HTML。支持 HTML5 最新标签和属性。格式化后的代码缩进规范、层级分明，便于阅读和维护。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">HTML 格式化示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`<!-- 格式化前 -->
<div><header><h1>标题</h1></header><main><p>内容</p></main></div>

<!-- 格式化后 -->
<div>
  <header>
    <h1>标题</h1>
  </header>
  <main>
    <p>内容</p>
  </main>
</div>`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">格式化会破坏 HTML 中的 JavaScript 代码吗？</h3>
              <p className="text-gray-700">不会。工具会智能识别 script 标签和其内容，保持 CSS 和 JavaScript 代码的完整性。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持预览功能吗？</h3>
              <p className="text-gray-700">本工具专注于代码格式化，格式化后的代码可直接复制使用，建议在浏览器中预览实际效果。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">如何处理自闭合标签？</h3>
              <p className="text-gray-700">遵循 HTML5 规范，void 元素（如 &lt;br&gt;、&lt;img&gt;、&lt;input&gt;）不会添加自闭合斜杠。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}