"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AES 加密解密工具 | 在线工具箱",
  description: "在线AES对称加密解密工具，支持ECB和CBC模式，128/192/256位密钥。",
  alternates: {
    canonical: "https://tool.wnsj.net/tools/aes-crypt"
  }
};

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
              className="w-full h-64 p-3 border border-gray-300 rounded-lg resize focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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
              className="w-full h-64 p-3 border border-gray-300 rounded-lg bg-gray-50 resize font-mono text-sm"
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
    </div>
  );
}