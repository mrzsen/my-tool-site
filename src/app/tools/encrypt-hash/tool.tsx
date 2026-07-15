"use client";

import { useState, useCallback } from "react";

const hashAlgorithms = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export default function EncryptHashTool() {
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
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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

      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512 五种主流哈希算法</li>
            <li>浏览器本地计算，输入数据不会上传到服务器</li>
            <li>实时计算结果，支持一键复制哈希值</li>
            <li>结果显示哈希值长度信息，方便验证</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中输入需要计算哈希的文本内容，选择所需的哈希算法（MD5、SHA-1、SHA-256、SHA-384 或 SHA-512），点击「计算哈希」按钮即可获得对应的哈希值。结果支持一键复制，方便在开发、文件校验等场景中使用。所有计算均在浏览器本地完成，您的数据不会上传至任何服务器。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">常用哈希算法对比</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`// 输入：Hello World
// 
// MD5:    b10a8db164e0754105b7a99be72e3fe5
// SHA-1:  0a4d55a8d778e5022fab701977c5d840bbc486d0
// SHA-256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
// SHA-512: 2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">MD5 现在还安全吗？</h3>
              <p className="text-gray-700">MD5 已被证明存在碰撞漏洞，不推荐用于安全敏感场景（如密码存储、数字签名）。建议使用 SHA-256 或更强的算法。MD5 仍适用于文件完整性校验等非安全场景。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">SHA-1 和 SHA-256 有什么区别？</h3>
              <p className="text-gray-700">SHA-1 生成 160 位（40 个十六进制字符）的哈希值，SHA-256 生成 256 位（64 个十六进制字符）的哈希值。SHA-256 安全性更高，是目前最广泛使用的哈希算法。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">可以加密文件吗？</h3>
              <p className="text-gray-700">本工具目前支持文本内容的哈希计算。如需计算文件哈希值，建议使用操作系统的命令行工具或专业文件校验工具。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}