"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文本处理工具箱 | 在线工具箱",
  description: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种功能。",
  alternates: {
    canonical: "https://tool.wnsj.net/tools/text-processor"
  }
};

import { useState, useCallback } from "react";

export default function TextProcessorPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("removeSpaces");
  const [error, setError] = useState("");

  const process = useCallback(() => {
    setError("");
    if (!input) {
      setError("请输入要处理的文本");
      setOutput("");
      return;
    }

    let result = "";
    switch (mode) {
      case "removeSpaces":
        // 去除所有空白字符
        result = input.replace(/\s+/g, "");
        break;
      case "removeDuplicateLines":
        // 去除重复行，保留顺序
        result = [...new Set(input.split("\n"))].join("\n");
        break;
      case "sortLines":
        // 按行排序
        result = input
          .split("\n")
          .sort((a, b) => a.localeCompare(b, "zh-CN"))
          .join("\n");
        break;
      case "removeEmptyLines":
        // 去除空行
        result = input
          .split("\n")
          .filter((line) => line.trim() !== "")
          .join("\n");
        break;
      case "trimLines":
        // 去除每行首尾空格
        result = input
          .split("\n")
          .map((line) => line.trim())
          .join("\n");
        break;
      case "upperCase":
        result = input.toUpperCase();
        break;
      case "lowerCase":
        result = input.toLowerCase();
        break;
      case "reverseLines":
        result = input.split("\n").reverse().join("\n");
        break;
      case "uniqueChars":
        // 提取所有不重复的字符
        const chars = new Set(input);
        result = [...chars].join("");
        break;
      case "wordCount":
        // 统计词频（英文单词）
        const words = input.toLowerCase().match(/\b[a-z]+\b/g) || [];
        const freq: Record<string, number> = {};
        words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        result = sorted.map(([word, count]) => `${word}: ${count}`).join("\n");
        break;
      default:
        result = input;
    }

    setOutput(result);
  }, [input, mode]);

  const copyResult = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput("");
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const modes = [
    { key: "removeSpaces", label: "去空格", desc: "去除所有空白字符和换行" },
    { key: "removeEmptyLines", label: "去空行", desc: "删除所有空行" },
    {
      key: "removeDuplicateLines",
      label: "去重行",
      desc: "删除重复的行",
    },
    { key: "sortLines", label: "行排序", desc: "按字母顺序排序行" },
    { key: "reverseLines", label: "反转行", desc: "反转所有行的顺序" },
    { key: "trimLines", label: "修剪行", desc: "去除每行首尾空白" },
    { key: "upperCase", label: "转大写", desc: "将所有字母转为大写" },
    { key: "lowerCase", label: "转小写", desc: "将所有字母转为小写" },
    { key: "uniqueChars", label: "唯一字符", desc: "提取所有不重复字符" },
    { key: "wordCount", label: "词频统计", desc: "统计英文单词出现频率" },
  ];

  const currentMode = modes.find((m) => m.key === mode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          文本处理工具箱
        </h1>
        <p className="text-gray-600">
          文本去重、排序、去空格、大小写转换等多种文本处理功能。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        {/* 模式选择 */}
        <label className="block text-sm font-medium text-gray-700 mb-3">
          选择处理模式
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMode(m.key);
                setOutput("");
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                mode === m.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {currentMode && (
          <p className="text-xs text-gray-400 mb-4">
            当前模式：<strong>{currentMode.desc}</strong>
          </p>
        )}

        {/* 输入区 */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入文本
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入要处理的文本..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg resize focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm mb-4"
        />

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={process}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            处理文本
          </button>
          <button
            onClick={swapInputOutput}
            disabled={!output}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
          >
            ↔ 结果→输入
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            清空
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {output && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">处理结果</h2>
            <div className="flex gap-2">
              <button
                onClick={copyResult}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                复制结果
              </button>
              <button
                onClick={swapInputOutput}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                用结果继续处理
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all whitespace-pre-wrap max-h-96 overflow-y-auto">
            {output}
          </div>
          <div className="mt-4 flex justify-between text-gray-500 text-xs">
            <span>
              字符数: {output.length} | 行数: {output.split("\n").length}
            </span>
            <span>
              输入: {input.length} 字符 → 输出: {output.length} 字符
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用场景
        </h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>
            <strong>去空格</strong>：清理从PDF或网页复制的多余空格
          </li>
          <li>
            <strong>去重行</strong>：清理重复的URL列表、邮箱地址等
          </li>
          <li>
            <strong>排序</strong>：对名单、关键词等进行排序
          </li>
          <li>
            <strong>大小写转换</strong>：快速转换文本的大小写格式
          </li>
          <li>
            <strong>词频统计</strong>：分析文本中出现频率最高的单词
          </li>
        </ul>
      </div>
    </div>
  );
}