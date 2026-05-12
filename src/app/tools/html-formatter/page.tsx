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
    </div>
  );
}