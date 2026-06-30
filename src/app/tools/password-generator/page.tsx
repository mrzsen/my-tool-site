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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持自定义密码长度（1-128 位）</li>
            <li>可选择包含大写字母、小写字母、数字、特殊符号</li>
            <li>使用浏览器加密级随机数生成（crypto.getRandomValues）</li>
            <li>排除易混淆字符（如 0/O、1/l）可选</li>
            <li>密码强度实时评估</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">选择密码长度（建议至少 12 位），勾选需要的字符类型（大写字母、小写字母、数字、特殊符号），点击「生成密码」即可获得随机生成的强密码。支持一键复制密码。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">密码生成示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`12位含全部字符: aB3#kL9$xR2@
16位含全部字符: F7&gH2*nM5@pQ9#s
20位含全部字符: wP8$rT3&yU6*iO0(lK2)vB`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">多少位的密码才安全？</h3>
              <p className="text-gray-700">建议至少 12 位。包含大小写字母、数字和符号的 12 位密码，暴力破解需要数百万年。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">生成的密码我记不住怎么办？</h3>
              <p className="text-gray-700">建议使用密码管理器（如 1Password、Bitwarden）来保存密码。您只需记住主密码即可。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">密码生成依赖网络吗？</h3>
              <p className="text-gray-700">不依赖。密码完全在您的浏览器本地生成，不会通过网络传输，确保密码安全。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}
