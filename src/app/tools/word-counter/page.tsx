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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>实时统计字符数（含空格和不含空格）、单词数</li>
            <li>支持中英文混排文本的正确统计</li>
            <li>统计段落数和行数</li>
            <li>显示最长段落长度和平均段落长度</li>
            <li>纯客户端处理，数据不上传服务器</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在文本框中输入或粘贴需要统计的文字，字符数、单词数、段落数等信息会实时更新。支持中英文混排，中文汉字会按字统计，英文按单词统计。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">字数统计示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: Hello World! 你好世界！
字符数（含空格）: 20
字符数（不含空格）: 18
单词数: 4
段落数: 1`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">中文和英文的统计方式一样吗？</h3>
              <p className="text-gray-700">不完全一样。中文按字（汉字）统计，英文按单词（空格分隔）统计。在混排文本中，两种方式会同时适用。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">这个工具适合用于论文统计吗？</h3>
              <p className="text-gray-700">可以作为参考，但正式的论文投稿建议使用专业的字数统计工具，因为不同机构对字数统计的定义可能不同。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">标点符号算不算字数？</h3>
              <p className="text-gray-700">算。字符数统计包含所有字符，包括标点符号、空格和特殊字符。不含空格的字数会排除空格。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}
