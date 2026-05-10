"use client";

import { useState, useCallback } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = useCallback(() => {
    try {
      if (!input.trim()) {
        setError("请输入JSON内容");
        setOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError("无效的JSON格式: " + (e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minifyJson = useCallback(() => {
    try {
      if (!input.trim()) {
        setError("请输入JSON内容");
        setOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError("无效的JSON格式: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON格式化</h1>
        <p className="text-gray-600">JSON数据格式化、压缩、校验，让数据一目了然。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">输入</h2>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                清空
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-96 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">输出</h2>
            <button
              onClick={copyOutput}
              disabled={!output}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              复制
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="格式化后的JSON..."
            className="w-full h-96 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50 font-mono text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={formatJson}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          格式化
        </button>
        <button
          onClick={minifyJson}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          压缩
        </button>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">缩进:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value={2}>2空格</option>
            <option value={4}>4空格</option>
            <option value={8}>8空格</option>
          </select>
        </div>
      </div>
    </div>
  );
}
