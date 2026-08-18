"use client";

import { useState, useCallback } from "react";

const TASK_TYPES = [
  { key: "writing", name: "写作创作" },
  { key: "coding", name: "编程开发" },
  { key: "analysis", name: "分析总结" },
  { key: "translation", name: "翻译润色" },
  { key: "marketing", name: "营销文案" },
  { key: "study", name: "学习辅导" },
  { key: "data", name: "数据处理" },
  { key: "other", name: "其他任务" },
];

const OUTPUT_FORMATS = [
  { key: "markdown", name: "Markdown 格式" },
  { key: "list", name: "列表要点" },
  { key: "article", name: "文章段落" },
  { key: "code", name: "代码实现" },
  { key: "table", name: "表格对比" },
];

const ROLE_SUGGESTIONS = [
  "资深技术专家",
  "专业写作编辑",
  "数据分析师",
  "市场营销顾问",
  "外语翻译专家",
  "领域学术教授",
];

const STYLE_OPTIONS = [
  { key: "professional", name: "专业严谨" },
  { key: "simple", name: "简洁易懂" },
  { key: "detailed", name: "详尽全面" },
  { key: "friendly", name: "亲切友好" },
  { key: "creative", name: "创意发散" },
];

function buildPrompt(parts: {
  role: string;
  task: string;
  type: string;
  format: string;
  style: string;
  constraints: string;
  length: string;
}): string {
  const lines: string[] = [];
  if (parts.role) {
    lines.push(`# 角色设定`);
    lines.push(`你是一位${parts.role}。请以这个身份来回答我的问题。`);
    lines.push(``);
  }
  lines.push(`# 任务目标`);
  lines.push(`请${parts.task}。`);
  lines.push(``);
  lines.push(`# 具体要求`);
  const reqs: string[] = [];
  if (parts.type) {
    reqs.push(`任务类型为「${TASK_TYPES.find((t) => t.key === parts.type)?.name ?? parts.type}」`);
  }
  if (parts.format) {
    reqs.push(`输出格式使用「${OUTPUT_FORMATS.find((f) => f.key === parts.format)?.name ?? parts.format}」`);
  }
  if (parts.style) {
    reqs.push(`回答风格要求「${STYLE_OPTIONS.find((s) => s.key === parts.style)?.name ?? parts.style}」`);
  }
  if (parts.length) {
    reqs.push(`内容篇幅控制在「${parts.length}」`);
  }
  lines.push(...reqs.map((r) => `- ${r}`));
  if (parts.constraints) {
    lines.push(`- 额外约束：${parts.constraints}`);
  }
  lines.push(`- 请先理解我的需求，再给出高质量的完整回答`);
  lines.push(``);
  lines.push(`# 我的需求`);
  lines.push(`我需要你完成的具体内容是：`);
  lines.push(``);
  return lines.join("\n");
}

export default function AiPromptGeneratorTool() {
  const [task, setTask] = useState("");
  const [role, setRole] = useState(ROLE_SUGGESTIONS[0]);
  const [type, setType] = useState("writing");
  const [format, setFormat] = useState("markdown");
  const [style, setStyle] = useState("professional");
  const [length, setLength] = useState("适中（300-500字）");
  const [constraints, setConstraints] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = useCallback(() => {
    if (!task.trim()) {
      alert("请先输入你的需求内容");
      return;
    }
    setResult(
      buildPrompt({ role, task, type, format, style, constraints, length })
    );
  }, [role, task, type, format, style, constraints, length]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("提示词已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setResult("");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 提示词生成器</h1>
        <p className="text-gray-600">
          输入你的需求，自动生成结构化、高质量的中文提示词（Prompt），适用于 ChatGPT、Claude、文心一言、通义千问等主流 AI 工具。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              你的需求 *
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="例如：写一篇关于在线工具优点的文章 / 帮我优化这段代码 / 总结这篇文章的重点..."
              className="w-full h-28 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              角色设定
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLE_SUGGESTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                    role === r
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              任务类型
            </label>
            <div className="flex flex-wrap gap-2">
              {TASK_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                    type === t.key
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输出格式
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {OUTPUT_FORMATS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                回答风格
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                篇幅控制
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {[
                  "简短（100字以内）",
                  "适中（300-500字）",
                  "较长（800-1200字）",
                  "详细（1500字以上）",
                ].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              额外约束（可选）
            </label>
            <input
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="例如：不要使用列表、以第一人称写作、面向初学者..."
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              ✨ 生成提示词
            </button>
            <button
              onClick={handleCopy}
              disabled={!result}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              复制
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              清空
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">生成的提示词</h3>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
            >
              一键复制
            </button>
          </div>
          <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">
            {result}
          </pre>
        </div>
      )}

      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>一键生成结构化提示词，包含角色设定、任务目标、具体要求三大部分</li>
            <li>覆盖写作、编程、分析、翻译、营销、学习等常见场景</li>
            <li>支持自定义输出格式、回答风格和篇幅长度</li>
            <li>生成的提示词适用于 ChatGPT、Claude、Gemini 等主流 AI 工具</li>
            <li>完全本地生成，不调用任何网络接口，隐私安全</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">
            首先在输入框中简要描述你的需求（做什么、针对什么内容），然后选择角色设定、任务类型、输出格式和风格偏好，点击「生成提示词」即可得到一段结构完整的中文提示词。将生成的提示词复制到任意 AI 对话工具中即可获得更精准、高质量的回答。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">示例：生成写作提示词</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`需求输入: 写一篇介绍在线工具优点的文章
角色: 专业写作编辑
输出: Markdown 格式

生成结果:
# 角色设定
你是一位专业写作编辑。请以这个身份来回答我的问题。

# 任务目标
请写一篇介绍在线工具优点的文章。

# 具体要求
- 任务类型为「写作创作」
- 输出格式使用「Markdown 格式」
- 回答风格要求「专业严谨」
- 内容篇幅控制在「适中（300-500字）」
- 请先理解我的需求，再给出高质量的完整回答`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">生成提示词后如何使用？</h3>
              <p className="text-gray-700">点击「复制」按钮，然后将提示词粘贴到 ChatGPT、Claude、文心一言、通义千问等任意 AI 对话工具中发送即可。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么我的需求写得越具体，效果越好？</h3>
              <p className="text-gray-700">AI 工具的输出质量与输入指令的清晰度直接相关。具体的背景、目标、格式要求能让 AI 更准确地理解你的意图，生成更贴合需求的内容。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">这个工具本身会调用 AI 吗？</h3>
              <p className="text-gray-700">不会。提示词完全由本地规则生成，不消耗任何 API 额度，也不会把你的需求发送到任何服务器。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}