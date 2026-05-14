"use client";

import { useState, useCallback } from "react";

type CaseType = "upper" | "lower" | "title" | "camel" | "kebab" | "snake";

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertCase = useCallback(
    (type: CaseType) => {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      let result = "";
      switch (type) {
        case "upper":
          result = input.toUpperCase();
          break;
        case "lower":
          result = input.toLowerCase();
          break;
        case "title":
          result = input
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          break;
        case "camel":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
          break;
        case "kebab":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          break;
        case "snake":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
          break;
      }
      setOutput(result);
    },
    [input]
  );

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">大小写转换</h1>
        <p className="text-gray-600">文本大小写快速转换，支持多种格式。</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入文本
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入文本..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => convertCase("upper")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          全大写 (UPPER)
        </button>
        <button
          onClick={() => convertCase("lower")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          全小写 (lower)
        </button>
        <button
          onClick={() => convertCase("title")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          首字母大写 (Title)
        </button>
        <button
          onClick={() => convertCase("camel")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          驼峰式 (camelCase)
        </button>
        <button
          onClick={() => convertCase("kebab")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          短横线 (kebab-case)
        </button>
        <button
          onClick={() => convertCase("snake")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          下划线 (snake_case)
        </button>
      </div>

      {output && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">转换结果</h2>
            <button
              onClick={copyOutput}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              复制结果
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
