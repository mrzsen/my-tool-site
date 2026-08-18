"use client";

import { useState, useCallback } from "react";

interface TaskOption {
  key: string;
  name: string;
  desc: string;
}

const TASKS: TaskOption[] = [
  { key: "zh2en", name: "中文 → 英文", desc: "将中文文本翻译为英文" },
  { key: "en2zh", name: "英文 → 中文", desc: "将英文文本翻译为中文" },
  { key: "simplify", name: "简化改写", desc: "把复杂句子改写成简单易懂的表达" },
  { key: "formal", name: "正式改写", desc: "把口语化文本改写成正式书面语" },
  { key: "friendly", name: "亲和改写", desc: "把生硬文本改写成亲切友好的语气" },
];

const MODELS: Record<string, { model: string; label: string }[]> = {
  zh2en: [{ model: "Helsinki-NLP/opus-mt-zh-en", label: "OPUS 中译英" }],
  en2zh: [{ model: "Helsinki-NLP/opus-mt-en-zh", label: "OPUS 英译中" }],
};

const REWRITE_MODEL = "Helsinki-NLP/opus-mt-zh-en";

interface HfResponse {
  translation_text?: string;
  error?: string;
}

function buildRewritePrompt(taskKey: string, text: string): string {
  const instructions: Record<string, string> = {
    simplify: "Rewrite the following text to be simpler and easier to understand. Keep the original meaning but use simple words and short sentences:",
    formal: "Rewrite the following text in a formal, professional written style. Keep the original meaning:",
    friendly: "Rewrite the following text in a warm and friendly tone. Keep the original meaning:",
  };
  return `${instructions[taskKey]}\n\n${text}`;
}

export default function AiTranslatorTool() {
  const [text, setText] = useState("");
  const [task, setTask] = useState("zh2en");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelLabel, setModelLabel] = useState(MODELS.zh2en[0].label);

  const handleTranslate = useCallback(async () => {
    if (!text.trim()) {
      alert("请先输入需要翻译或改写的文本");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const isRewrite = ["simplify", "formal", "friendly"].includes(task);
      const payload = isRewrite
        ? buildRewritePrompt(task, text)
        : text;
      const modelList = MODELS[task] ?? MODELS.zh2en;
      const model = modelList[0].model;
      setModelLabel(modelList[0].label);

      let resp: Response | null = null;
      try {
        resp = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: payload }),
          }
        );
      } catch {
        throw new Error("网络请求失败，请检查网络连接");
      }

      if (!resp.ok) {
        const data = (await resp.json().catch(() => null)) as HfResponse | null;
        if (resp.status === 503) {
          throw new Error(
            "模型正在加载中（首次使用可能需要 20-60 秒），请稍后重试。若持续失败，可能已超过 HuggingFace 免费额度。"
          );
        }
        throw new Error(
          data?.error ?? `请求失败（HTTP ${resp.status}），请稍后重试`
        );
      }

      const data = (await resp.json()) as HfResponse | HfResponse[];
      const item = Array.isArray(data) ? data[0] : data;
      if (!item || !item.translation_text) {
        throw new Error("模型未返回有效结果，请重试");
      }
      setResult(item.translation_text.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "发生未知错误");
    } finally {
      setLoading(false);
    }
  }, [text, task]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("结果已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setText("");
    setResult("");
    setError("");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 翻译 / 改写</h1>
        <p className="text-gray-600">
          基于 HuggingFace 开源模型，免费在线翻译与文本改写，支持中英互译和多种改写风格，无需注册和密钥。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {TASKS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTask(t.key)}
              title={t.desc}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                task === t.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入文本
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在此输入需要翻译或改写的文本..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输出结果 {modelLabel && <span className="text-gray-400 font-normal">（{modelLabel}）</span>}
            </label>
            <textarea
              readOnly
              value={result}
              placeholder="AI 处理结果将在这里显示..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? "🤖 处理中..." : "🚀 开始处理"}
          </button>
          <button
            onClick={handleCopy}
            disabled={!result || loading}
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

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持中文与英文之间的双向翻译</li>
            <li>支持简化、正式、亲和三种文本改写风格</li>
            <li>基于 HuggingFace 免费推理 API，无需注册和 API 密钥</li>
            <li>使用开源翻译模型（OPUS-MT 系列），翻译质量稳定</li>
            <li>界面简洁，复制结果一键完成</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">
            首先选择任务类型（中译英、英译中或某种改写风格），然后在输入框中粘贴文本，点击「开始处理」即可调用 HuggingFace 开源模型进行翻译或改写。首次调用时模型可能需要加载 20-60 秒，之后会快很多。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">翻译示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`任务: 中文 → 英文
输入: 在线工具为开发者提供了便利，无需安装即可使用。

输出: Online tools provide convenience for developers and can be used without installation.`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">这个工具需要付费或密钥吗？</h3>
              <p className="text-gray-700">不需要。工具直接调用 HuggingFace 的免费公共推理接口，无需注册、无需 API 密钥。免费接口有一定频率限制，高峰期可能需要稍等重试。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么会提示"模型正在加载"？</h3>
              <p className="text-gray-700">HuggingFace 的免费模型首次被调用时需要从存储加载到 GPU 服务器，一般需要 20-60 秒。加载完成后会缓存一段时间，之后调用会明显加快。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">翻译的文本会被保存吗？</h3>
              <p className="text-gray-700">文本会被发送到 HuggingFace 服务器进行处理，但我们不会保存任何内容。请注意不要输入含敏感信息或隐私数据的文本。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持哪些语言？</h3>
              <p className="text-gray-700">当前主要支持中文和英文。如果其他语言翻译需求较多，我们可以评估接入更多语言对的模型。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}