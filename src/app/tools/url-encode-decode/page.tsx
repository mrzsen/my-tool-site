"use client";

import Head from "next/head";
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
    <Head>
      <title>URL 编解码工具</title>
      <meta name="description" content="在线URL编码解码工具，支持UTF-8中文编码转换。" />
      <link rel="canonical" href="https://tool.wnsj.net/tools/url-encode-decode" />
    </Head>

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
          className="w-full h-40 p-3 border border-gray-300 rounded-lg resize focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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
    </div>
  );
}