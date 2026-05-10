"use client";

import { useState, useCallback } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpace: text.replace(/\s/g, "").length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    lines: text === "" ? 0 : text.split("\n").length,
    paragraphs: text === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length,
  };

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      alert("无法访问剪贴板，请手动粘贴");
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">字数统计工具</h1>
        <p className="text-gray-600">
          快速统计文本的字数、字符数、段落数等数据，支持中英文混排。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePaste}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            粘贴文本
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            复制文本
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            清空
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入或粘贴文本..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">{stats.characters}</div>
          <div className="text-sm text-gray-600 mt-1">总字符数</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
          <div className="text-2xl font-bold text-green-600">{stats.charactersNoSpace}</div>
          <div className="text-sm text-gray-600 mt-1">不含空格</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
          <div className="text-2xl font-bold text-purple-600">{stats.words}</div>
          <div className="text-sm text-gray-600 mt-1">词数</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">{stats.lines}</div>
          <div className="text-sm text-gray-600 mt-1">行数</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-100">
          <div className="text-2xl font-bold text-pink-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600 mt-1">段落数</div>
        </div>
      </div>
    </div>
  );
}
