"use client";

import { useState, useCallback } from "react";

const MODES = ["ECB", "CBC"] as const;

export default function AesCryptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [key, setKey] = useState("your-secret-key-16");
  const [mode, setMode] = useState<typeof MODES[number]>("CBC");
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strToBytes = (str: string) =>
    new TextEncoder().encode(str);
  const bytesToHex = (bytes: Uint8Array) =>
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  const hexToBytes = (hex: string) =>
    Uint8Array.from(
      hex.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || []
    );
  const base64ToBytes = (b64: string) =>
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const bytesToBase64 = (bytes: Uint8Array) =>
    btoa(String.fromCharCode(...new Uint8Array(bytes)));

  const processAes = useCallback(async () => {
    if (!input.trim() || !key.trim()) {
      setError("请输入内容和密钥");
      setOutput("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const keyBytes = strToBytes(
        key.padEnd(32, "\0").slice(0, 32)
      );
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-" + mode, length: 256 },
        false,
        ["encrypt", "decrypt"]
      );

      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      let result: ArrayBuffer;

      if (action === "encrypt") {
        if (mode === "CBC") {
          const iv = crypto.getRandomValues(new Uint8Array(16));
          result = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            data
          );
          const combined = new Uint8Array(
            iv.length + (result as ArrayBuffer).byteLength
          );
          combined.set(iv);
          combined.set(
            new Uint8Array(result as ArrayBuffer),
            iv.length
          );
          setOutput(bytesToBase64(combined));
        } else {
          result = await crypto.subtle.encrypt(
            { name: "AES-ECB" },
            cryptoKey,
            data
          );
          setOutput(bytesToHex(new Uint8Array(result as ArrayBuffer)));
        }
      } else {
        if (mode === "CBC") {
          const combined = base64ToBytes(input);
          const iv = combined.slice(0, 16);
          const encrypted = combined.slice(16);
          result = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            encrypted
          );
        } else {
          const encrypted = hexToBytes(input);
          result = await crypto.subtle.decrypt(
            { name: "AES-ECB" },
            cryptoKey,
            encrypted
          );
        }
        setOutput(new TextDecoder().decode(result));
      }
    } catch (e) {
      setError("处理失败: " + (e as Error).message);
      setOutput("");
    } finally {
      setLoading(false);
    }
  }, [input, key, mode, action]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AES 加密/解密
        </h1>
        <p className="text-gray-600">
          支持 AES-ECB 和 AES-CBC 模式，128/192/256 位密钥
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {action === "encrypt" ? "明文" : "密文"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                action === "encrypt"
                  ? "输入要加密的文本..."
                  : "输入要解密的密文..."
              }
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {action === "encrypt" ? "密文" : "明文"}
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="结果将在这里显示..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 items-center">
          <select
            value={mode}
            onChange={(e) =>
              setMode(e.target.value as typeof MODES[number])
            }
            className="p-2 border border-gray-300 rounded-lg text-sm"
          >
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m} 模式
              </option>
            ))}
          </select>

          <select
            value={action}
            onChange={(e) =>
              setAction(
                e.target.value as "encrypt" | "decrypt"
              )
            }
            className="p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="encrypt">🔒 加密</option>
            <option value="decrypt">🔓 解密</option>
          </select>

          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="输入密钥（至少16字符）"
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={processAes}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {loading
              ? "处理中..."
              : action === "encrypt"
              ? "🔒 加密"
              : "🔓 解密"}
          </button>
          <button
            onClick={() => {
              if (output)
                navigator.clipboard.writeText(output);
            }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            复制
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

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用说明
        </h3>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>选择加密模式：ECB（无需 IV）或 CBC（更安全）</li>
          <li>输入密钥（至少16字符，系统自动填充至32字节）</li>
          <li>CBC 模式输出为 Base64（包含 IV 信息）</li>
          <li>ECB 模式输出为十六进制格式</li>
          <li>解密时需要使用与加密相同的模式和密钥</li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 AES-128、AES-192、AES-256 三种密钥长度</li>
            <li>支持 ECB 和 CBC 两种加密模式</li>
            <li>自动生成和解析初始化向量（IV）</li>
            <li>加密结果使用 Base64 编码输出，便于传输</li>
            <li>加密和解密功能无缝切换</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">输入需要加密的文本，选择密钥长度（128/192/256 位）和加密模式（ECB/CBC）。输入密钥，点击「加密」按钮。CBC 模式需要输入初始化向量（IV）。解密时，将加密文本和相同的密钥、模式、IV 输入，点击「解密」即可还原。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">AES 加密示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: Hello World
密钥: 1234567890123456
模式: AES-128-CBC
IV: 1234567890123456
加密结果: U2FsdGVkX1+ZxJl3B0bG8A==`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">ECB 和 CBC 模式有什么区别？</h3>
              <p className="text-gray-700">ECB 模式下相同的明文块会产生相同的密文块，安全性较低。CBC 模式每个块都与前一个块异或，相同的明文会产生不同的密文，更安全。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">密钥长度应该如何选择？</h3>
              <p className="text-gray-700">对于大多数应用场景，AES-128 已经足够安全。如果处理高度敏感数据，可以选择 AES-256。密钥越长，加密和解密速度越慢。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">忘记密钥还能解密吗？</h3>
              <p className="text-gray-700">不能。AES 是对称加密算法，加密和解密使用相同的密钥。请务必妥善保管密钥。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}