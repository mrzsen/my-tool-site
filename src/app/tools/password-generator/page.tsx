"use client";

import { useState, useCallback } from "react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("复制失败");
    }
  }, [password]);

  const getStrength = (pwd: string) => {
    if (pwd.length < 8) return { label: "弱", color: "text-red-600" };
    if (pwd.length < 12) return { label: "中", color: "text-yellow-600" };
    return { label: "强", color: "text-green-600" };
  };

  const strength = getStrength(password);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">密码生成器</h1>
        <p className="text-gray-600">生成安全、随机的强密码，保护您的账户安全。</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="font-mono text-lg break-all flex-1 mr-4">
            {password || "点击生成密码"}
          </div>
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-400"
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>

        {password && (
          <div className="mb-4 text-sm">
            密码强度: <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
          </div>
        )}

        <button
          onClick={generatePassword}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          生成密码
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">设置</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            密码长度: {length}
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">包含大写字母 (A-Z)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">包含小写字母 (a-z)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">包含数字 (0-9)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">包含特殊符号 (!@#$...)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
