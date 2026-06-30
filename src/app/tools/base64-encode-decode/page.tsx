"use client";

import { useState, useCallback } from "react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");

  const convert = useCallback(() => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setError("转换失败，请检查输入内容是否合法");
      setOutput("");
    }
  }, [input, mode]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  const swapMode = useCallback(() => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
  }, [output]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Base64 编解码工具
        </h1>
        <p className="text-gray-600">
          Base64 编码/解码，支持文本和文件内容。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setMode("encode");
              setInput("");
              setOutput("");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            编码
          </button>
          <button
            onClick={() => {
              setMode("decode");
              setInput("");
              setOutput("");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            解码
          </button>
          <button
            onClick={swapMode}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            ↔ 互换
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === "encode" ? "输入原文" : "输入Base64字符串"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "在此输入要编码的文本..." : "在此输入Base64字符串..."}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={convert}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {mode === "encode" ? "编码" : "解码"}
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError("");
            }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
            <h2 className="font-semibold text-gray-900">{mode === "encode" ? "Base64结果" : "解码结果"}</h2>
            <button
              onClick={copyOutput}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              复制
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all whitespace-pre-wrap">
            {output}
          </div>
          <div className="mt-4 text-right">
            <span className="text-gray-500 text-xs">
              长度: {output.length} 字符
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">什么是 Base64 编码？</h3>
        <p className="text-blue-700 text-sm leading-relaxed">
          Base64 是一种基于64个可打印字符来表示二进制数据的编码方式。
          常用于在HTTP环境下传递较长的标识信息，例如在电子邮件中嵌入图片、在URL中传递参数等。
          它不是一种加密方式，而是编码方式，可以轻松被解码。
        </p>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 Base64 编码和解码双向转换</li>
            <li>正确处理中文字符和 Unicode 字符</li>
            <li>编码结果使用标准 Base64 字母表（A-Z, a-z, 0-9, +, /）</li>
            <li>自动处理 = 填充字符</li>
            <li>支持复制结果，快捷键切换</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中输入要编码的文本或要解码的 Base64 字符串。选择「编码」模式将普通文本转为 Base64，选择「解码」模式将 Base64 字符串还原为原始文本。支持中文、英文、符号等任意字符。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Base64 编解码示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`# 编码
输入: Hello World
编码后: SGVsbG8gV29ybGQ=

# 解码
输入: SGVsbG8gV29ybGQ=
解码后: Hello World`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">Base64 是加密吗？</h3>
              <p className="text-gray-700">不是。Base64 只是一种编码方式，不是加密，它编码后的数据可以轻松解码回原文。请不要用 Base64 保护敏感数据。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么编码结果末尾有等号？</h3>
              <p className="text-gray-700">等号是 Base64 的填充字符。当原始数据长度不是 3 字节的整数倍时，会在输出末尾添加一个或两个等号。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Base64 编码会让数据变大吗？</h3>
              <p className="text-gray-700">会的。Base64 编码会使数据体积增加约 33%，每 3 个字节编码为 4 个字符。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}