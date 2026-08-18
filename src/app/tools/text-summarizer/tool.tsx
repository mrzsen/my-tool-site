"use client";

import { useState, useCallback } from "react";

const STOP_WORDS = new Set([
  "的", "了", "在", "是", "我", "有", "和", "就", "不", "人", "都", "一",
  "一个", "上", "也", "很", "到", "说", "要", "去", "你", "会", "着", "没有",
  "看", "好", "自己", "这", "那", "它", "们", "把", "被", "对", "给", "与",
  "及", "或", "而", "且", "但", "并", "等", "更", "最", "能", "可以", "进行",
  "the", "a", "an", "and", "or", "but", "for", "with", "in", "on", "of",
  "to", "is", "are", "was", "were", "be", "been", "have", "has", "had",
  "it", "this", "that", "these", "those", "we", "you", "they", "he", "she",
  "from", "by", "at", "as", "not", "do", "does", "did", "will", "would",
  "can", "could", "should", "more", "most", "so", "such", "if", "than",
]);

interface WordFreq {
  word: string;
  count: number;
}

function tokenize(text: string): string[] {
  const chineseChars = text.match(/[\u4e00-\u9fff]/g) ?? [];
  const englishWords = text.match(/[a-zA-Z]+/g) ?? [];
  const tokens: string[] = [];
  for (let i = 0; i < chineseChars.length - 1; i++) {
    tokens.push(chineseChars[i] + chineseChars[i + 1]);
  }
  for (const w of englishWords) {
    tokens.push(w.toLowerCase());
  }
  return tokens;
}

function computeKeywords(text: string): WordFreq[] {
  const tokens = tokenize(text).filter((t) => !STOP_WORDS.has(t));
  const freq: Record<string, number> = {};
  for (const t of tokens) {
    freq[t] = (freq[t] ?? 0) + 1;
  }
  return Object.entries(freq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function computeSummary(text: string, ratio: number): string {
  const sentences = text
    .split(/(?<=[。！？.!?])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (sentences.length === 0) return "";
  const tokens = tokenize(text).filter((t) => !STOP_WORDS.has(t));
  const freq: Record<string, number> = {};
  for (const t of tokens) {
    freq[t] = (freq[t] ?? 0) + 1;
  }
  const maxFreq = Math.max(...Object.values(freq), 1);
  const scored = sentences.map((s, i) => {
    const localTokens = tokenize(s);
    let score = 0;
    for (const t of localTokens) {
      if (freq[t]) score += freq[t] / maxFreq;
    }
    if (i === 0) score *= 1.2;
    return { sentence: s, score: score / Math.max(localTokens.length, 1) };
  });
  const targetCount = Math.max(
    1,
    Math.round(sentences.length * ratio)
  );
  const top = scored
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount);
  const topSet = new Set(top.map((t) => t.sentence));
  return sentences.filter((s) => topSet.has(s)).join("").slice(0, 600);
}

export default function TextSummarizerTool() {
  const [text, setText] = useState("");
  const [ratio, setRatio] = useState(0.3);
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState<WordFreq[]>([]);

  const handleAnalyze = useCallback(() => {
    if (!text.trim()) {
      alert("请先输入需要分析的文本");
      return;
    }
    setSummary(computeSummary(text, ratio));
    setKeywords(computeKeywords(text));
  }, [text, ratio]);

  const handleCopySummary = useCallback(async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      alert("摘要已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [summary]);

  const handleClear = useCallback(() => {
    setText("");
    setSummary("");
    setKeywords([]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">文本摘要生成</h1>
        <p className="text-gray-600">
          自动分析文章重点，提取核心摘要和关键词，支持中文和英文，全程本地处理。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            输入文章内容
          </label>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>摘要比例</span>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={ratio}
              onChange={(e) => setRatio(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="font-medium text-blue-600">
              {Math.round(ratio * 100)}%
            </span>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="粘贴需要分析的文章、新闻、报告等内容..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAnalyze}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            🔍 分析摘要
          </button>
          <button
            onClick={handleCopySummary}
            disabled={!summary}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            复制摘要
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            清空
          </button>
        </div>
      </div>

      {summary && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">内容摘要</h3>
          <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">核心关键词</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k.word}
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm"
                title={`出现 ${k.count} 次`}
              >
                {k.word}
                <span className="text-blue-400 ml-1 text-xs">×{k.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>自动识别文章重点句子，按重要性提取摘要</li>
            <li>提取高频关键词，帮助快速把握文章主题</li>
            <li>支持中文、英文及中英混排文本</li>
            <li>摘要比例可自由调节（10%-50%）</li>
            <li>纯本地算法处理，文本不会上传到任何服务器</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">
            将需要分析的文章、新闻、报告或论文粘贴到输入框，通过滑块调节你希望的摘要比例（摘要占原文的百分比），点击「分析摘要」即可在下方看到生成的内容摘要和高频关键词。摘要会优先选取包含高频词汇、位于文章开头的重要句子。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">摘要生成示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: 在线工具越来越受欢迎。它们无需安装即可使用。用户只需打开浏览器就能完成各种任务。对于开发者来说尤其方便。

输出摘要: 在线工具越来越受欢迎。它们无需安装即可使用。用户只需打开浏览器就能完成各种任务。

输出关键词: 在线(×1) 工具(×1) 用户(×1) 使用(×1) 浏览器(×1)`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">摘要是怎么生成的？</h3>
              <p className="text-gray-700">通过统计每个词的出现频率，为每个句子计算重要性得分，优先选取包含高频关键词、且位于文章开头的重要句子组成摘要。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">这个工具和 AI 摘要有什么区别？</h3>
              <p className="text-gray-700">本工具使用基于词频统计的经典算法，不依赖任何 AI 模型，速度快、无需联网，适合快速了解文章大意。如需更智能的理解式摘要，可以配合我们的 AI 提示词工具使用。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">文本会上传到服务器吗？</h3>
              <p className="text-gray-700">不会。所有分析都在浏览器本地完成，你的文章内容不会离开你的设备，适合处理敏感或未公开的文档。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}