"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "加密哈希工具(MD5/SHA) | 在线工具箱",
  description: "支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法在线计算。",
  alternates: {
    canonical: "https://tool.wnsj.net/tools/encrypt-hash"
  }
};

import { useState, useCallback } from "react";

const hashAlgorithms = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export default function EncryptHashPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("MD5");
  const [result, setResult] = useState("");

  const hash = useCallback(async () => {
    if (!input) return;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      let hashBuffer: ArrayBuffer;

      switch (algorithm) {
        case "MD5":
          hashBuffer = await crypto.subtle.digest("MD5", data);
          break;
        case "SHA-1":
          hashBuffer = await crypto.subtle.digest("SHA-1", data);
          break;
        case "SHA-256":
          hashBuffer = await crypto.subtle.digest("SHA-256", data);
          break;
        case "SHA-384":
          hashBuffer = await crypto.subtle.digest("SHA-384", data);
          break;
        case "SHA-512":
          hashBuffer = await crypto.subtle.digest("SHA-512", data);
          break;
        default:
          hashBuffer = await crypto.subtle.digest("SHA-256", data);
      }

      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setResult(hashHex);
    } catch (e) {
      setResult("计算失败");
    }
  }, [input, algorithm]);

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          在线加密/哈希工具
        </h1>
        <p className="text-gray-600">
          支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512 等多种哈希算法。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择算法
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {hashAlgorithms.map((algo) => (
            <button
              key={algo}
              onClick={() => {
                setAlgorithm(algo);
                setResult("");
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                algorithm === algo
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {algo}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入内容
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入要加密的内容..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />

        <button
          onClick={hash}
          className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          计算哈希
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">{algorithm} 结果</h2>
            <button
              onClick={copyResult}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              复制
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">
            {result}
          </div>
          <div className="mt-2 text-right">
            <span className="text-gray-500 text-xs">
              {algorithm} 哈希值（{result.length} 字符）
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          MD5 和 SHA 有什么区别？
        </h3>
        <ul className="list-disc list-inside mt-2 text-blue-700 text-sm space-y-1">
          <li><strong>MD5</strong>：128位哈希，速度快但安全性较低</li>
          <li><strong>SHA-1</strong>：160位哈希，MD5的升级版</li>
          <li><strong>SHA-256</strong>：256位哈希，最常用的安全哈希算法</li>
          <li><strong>SHA-384/SHA-512</strong>：更强的安全哈希算法</li>
        </ul>
      </div>
    </div>
  );
}