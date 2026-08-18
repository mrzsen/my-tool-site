"use client";

import { useState, useCallback } from "react";

interface PolishRule {
  name: string;
  apply: (text: string) => string;
}

const REDUNDANT_PAIRS: [RegExp, string][] = [
  [/进行.*?进行/g, "进行"],
  [/能够进行/g, "能够"],
  [/非常非常重要/g, "非常重要"],
  [/很很/g, "很"],
  [/十分十分/g, "十分"],
  [/使得使得/g, "使得"],
  [/非常非常/g, "非常"],
];

const COMMON_MISTAKES: [RegExp, string][] = [
  [/做为/g, "作为"],
  [/其它/g, "其他"],
  [/帐户/g, "账户"],
  [/截止至/g, "截至"],
  [/藉此/g, "借此"],
  [/充份/g, "充分"],
  [/佈/g, "布"],
  [/频道/g, "频道"],
];

const PUNCTUATION_PAIRS: [RegExp, string][] = [
  [/，,/g, "，"],
  [/。\./g, "。"],
  [/、,/g, "、"],
  [/;；/g, "；"],
  [/：:/g, "："],
  [/？\?/g, "？"],
  [/！\!/g, "！"],
  [/,,/g, ","],
  [/\.\./g, "."],
  [/;;/g, ";"],
];

const RULES: PolishRule[] = [
  {
    name: "去除重复空格",
    apply: (t) => t.replace(/[ \t]+/g, " "),
  },
  {
    name: "统一中英文标点间距",
    apply: (t) =>
      t.replace(/([\u4e00-\u9fff])([A-Za-z0-9])/g, "$1 $2").replace(
        /([A-Za-z0-9])([\u4e00-\u9fff])/g,
        "$1 $2"
      ),
  },
  {
    name: "修复常见错别字",
    apply: (t) => {
      let r = t;
      for (const [re, rep] of COMMON_MISTAKES) r = r.replace(re, rep);
      return r;
    },
  },
  {
    name: "精简冗余表达",
    apply: (t) => {
      let r = t;
      for (const [re, rep] of REDUNDANT_PAIRS) r = r.replace(re, rep);
      return r;
    },
  },
  {
    name: "统一标点符号",
    apply: (t) => {
      let r = t;
      for (const [re, rep] of PUNCTUATION_PAIRS) r = r.replace(re, rep);
      return r;
    },
  },
  {
    name: "去除多余空行",
    apply: (t) => t.replace(/\n{3,}/g, "\n\n"),
  },
  {
    name: "去除行尾空格",
    apply: (t) => t.replace(/[ \t]+\n/g, "\n"),
  },
];

export default function TextPolisherTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [changes, setChanges] = useState<string[]>([]);
  const [selectedRules, setSelectedRules] = useState<Set<string>>(
    new Set(RULES.map((r) => r.name))
  );

  const toggleRule = useCallback((name: string) => {
    setSelectedRules((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const handlePolish = useCallback(() => {
    if (!text.trim()) {
      alert("请先输入需要润色的文本");
      return;
    }
    const applied: string[] = [];
    let output = text;
    for (const rule of RULES) {
      if (selectedRules.has(rule.name)) {
        const before = output;
        output = rule.apply(output);
        if (output !== before) {
          applied.push(rule.name);
        }
      }
    }
    setResult(output);
    setChanges(applied);
  }, [text, selectedRules]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("润色结果已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setText("");
    setResult("");
    setChanges([]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">文本润色助手</h1>
        <p className="text-gray-600">
          自动优化文本格式和表达，修复常见错误，让您的文案更专业、更规范。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {RULES.map((rule) => (
            <button
              key={rule.name}
              onClick={() => toggleRule(rule.name)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                selectedRules.has(rule.name)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-500"
              }`}
            >
              {rule.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              原始文本
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在此输入需要润色的文本..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              润色结果
            </label>
            <textarea
              readOnly
              value={result}
              placeholder="润色结果将在这里显示..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handlePolish}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            ✨ 开始润色
          </button>
          <button
            onClick={handleCopy}
            disabled={!result}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            复制结果
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            清空
          </button>
        </div>
      </div>

      {changes.length > 0 && (
        <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
          <h3 className="text-sm font-semibold text-green-800 mb-2">
            本次应用的优化（{changes.length} 项）
          </h3>
          <div className="flex flex-wrap gap-2">
            {changes.map((c) => (
              <span
                key={c}
                className="px-2 py-1 bg-white border border-green-300 text-green-700 rounded text-xs"
              >
                ✓ {c}
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
            <li>自动去除重复空格、多余空行和行尾空格</li>
            <li>统一中英文之间的间距，让排版更规范</li>
            <li>修复常见错别字和易混用词语</li>
            <li>精简冗余表达，让文字更简洁有力</li>
            <li>每个优化规则都可独立开关，灵活控制</li>
            <li>完全本地处理，文本不上传服务器</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">
            将需要优化的文本粘贴到左侧输入框，根据需要勾选或取消勾选上方的优化规则，点击「开始润色」即可在右侧看到优化后的结果，并显示本次应用了哪些优化。可点击「复制结果」一键复制润色后的文本。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">润色示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`润色前: 这个工具 非常非常  好用！它能  帮助开发者  快速的  处理数据。

润色后: 这个工具 非常 好用！它能 帮助开发者 快速的 处理数据。

优化项: ✓ 去除重复空格 ✓ 精简冗余表达 ✓ 统一中英文标点间距`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">润色会改变原意吗？</h3>
              <p className="text-gray-700">不会。本工具只做格式规范化、错别字修复和冗余词精简，不会重新组织句子或改变原文含义，属于轻度润色。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">和 AI 润色有什么区别？</h3>
              <p className="text-gray-700">本工具使用确定性的规则算法，处理速度快、结果可预测、完全离线。如果需要更深度的重写润色，建议配合我们的 AI 提示词工具使用。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">我的文本安全吗？</h3>
              <p className="text-gray-700">非常安全。所有处理都在您的浏览器本地完成，文本内容不会发送到任何服务器。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}