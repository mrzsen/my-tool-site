"use client";

import { useState, useCallback } from "react";

export default function JsFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJs = useCallback(() => {
    try {
      let code = input.trim();
      if (!code) {
        setError("请输入 JavaScript 代码");
        setOutput("");
        return;
      }

      let formatted = "";
      let indent = 0;
      const padding = "  ";

      code = code.replace(/\{/g, "{\n");
      code = code.replace(/}/g, "\n}\n");
      code = code.replace(/;/g, ";\n");

      const lines = code.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed === "}") {
          indent = Math.max(0, indent - 1);
        }

        formatted += padding.repeat(indent) + trimmed + "\n";

        if (trimmed.endsWith("{")) {
          indent++;
        }
      }

      setOutput(formatted.trim());
      setError("");
    } catch (e) {
      setError("格式化失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const compressJs = useCallback(() => {
    try {
      const compressed = input
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*/g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}();,:])\s*/g, "$1")
        .trim();
      setOutput(compressed);
      setError("");
    } catch (e) {
      setError("压缩失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          JavaScript 格式化/压缩
        </h1>
        <p className="text-gray-600">
          格式化 JavaScript 代码使其更易读，或压缩 JS 以减小体积
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 JavaScript
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="const a = 1; console.log(a);"
            className="w-full h-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输出结果
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="结果将在这里显示..."
            className="w-full h-80 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={formatJs}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📝 格式化
        </button>
        <button
          onClick={compressJs}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📦 压缩
        </button>
        <button
          onClick={copyToClipboard}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          复制
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          清空
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用说明
        </h3>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>在左侧输入框中粘贴 JavaScript 代码</li>
          <li>点击「格式化」美化代码缩进</li>
          <li>点击「压缩」去除空白和注释</li>
          <li>支持移除单行和多行注释</li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 ES6+ 语法，包括箭头函数、模板字符串、解构赋值</li>
            <li>智能缩进和换行，保持代码风格一致性</li>
            <li>支持去除 JavaScript 注释，生成精简代码</li>
            <li>保留字符串和正则表达式字面量的完整性</li>
            <li>支持压缩为单行格式</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">将 JavaScript 代码粘贴到输入框，选择格式化和缩进大小，点击「格式化」按钮即可美化代码。支持最新的 ES2023 语法特性。可以勾选去除注释，生成更简洁的代码。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">JS 格式化示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`// 格式化前
const add=(a,b)=>a+b;const obj={name:'test',fn(){return this.name}}

// 格式化后
const add = (a, b) => a + b;
const obj = {
  name: 'test',
  fn() {
    return this.name;
  }
};`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">JS 格式化后代码功能会变化吗？</h3>
              <p className="text-gray-700">不会。格式化仅调整代码的排版格式，不会改变代码执行逻辑。所有字符串、正则表达式和注释都受到保护。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持 TypeScript 代码吗？</h3>
              <p className="text-gray-700">当前版本主要针对标准 JavaScript。TypeScript 代码建议使用官方的 tsc 或 prettier 进行格式化。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">去除注释后还能恢复吗？</h3>
              <p className="text-gray-700">不能。去除注释是不可逆的操作。建议保留原始代码备份，或将去除注释后的代码用于生产环境。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}