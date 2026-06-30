"use client";

import { useState, useCallback } from "react";

export default function UrlEncodeDecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");

  const convert = useCallback(() => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
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
          URL 编解码工具
        </h1>
        <p className="text-gray-600">
          对URL进行编码和解码，支持将特殊字符转换为可安全传输的格式。
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
          {mode === "encode" ? "输入原文" : "输入URL编码字符串"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "在此输入要编码的URL..." : "在此输入要解码的URL编码字符串..."}
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
            <h2 className="font-semibold text-gray-900">{mode === "encode" ? "URL编码结果" : "解码结果"}</h2>
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
          <div className="mt-2 text-right">
            <span className="text-gray-500 text-xs">长度: {output.length} 字符</span>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">什么是URL编码？</h3>
        <p className="text-blue-700 text-sm leading-relaxed">
          URL编码（百分号编码）是一种编码机制，它将URL中的非ASCII字符、空格和特殊字符
          转换为"%"后跟两位十六进制数的格式，以确保URL的安全传输。
          例如：空格会被编码为 %20，中文字符会被编码为 %XX%XX 格式。
        </p>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 URL 编码和解码双向转换</li>
            <li>正确处理非 ASCII 字符（中文、日文等）</li>
            <li>遵循 RFC 3986 标准编码规则</li>
            <li>编码结果可直接用于 URL 参数传递</li>
            <li>支持一键切换编码/解码模式</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中输入需要编码或解码的 URL 字符串。选择「编码」模式将文本转换为 URL 安全格式，选择「解码」模式将编码后的 URL 还原为原始文本。常用于处理包含特殊字符的 URL 参数。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">URL 编解码示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`# 编码
输入: name=张三&city=北京
编码后: name%3D%E5%BC%A0%E4%B8%89%26city%3D%E5%8C%97%E4%BA%AC

# 解码
输入: hello%20world%21
解码后: hello world!`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">URL 编码和 Base64 编码有什么区别？</h3>
              <p className="text-gray-700">URL 编码用于将 URL 中的特殊字符转为百分号格式，而 Base64 用于将二进制数据转为文本。两者的编码规则和应用场景完全不同。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">空格在 URL 编码中如何表示？</h3>
              <p className="text-gray-700">按照 RFC 3986 标准，空格编码为 %20。在某些场景下也可以使用 + 号表示空格，但推荐使用 %20。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么有些字符不需要编码？</h3>
              <p className="text-gray-700">字母（a-z、A-Z）、数字（0-9）和部分特殊字符（- _ . ~）在 URL 中是安全的，无需编码。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}