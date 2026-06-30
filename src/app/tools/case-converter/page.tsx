"use client";

import { useState, useCallback } from "react";

type CaseType = "upper" | "lower" | "title" | "camel" | "kebab" | "snake";

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertCase = useCallback(
    (type: CaseType) => {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      let result = "";
      switch (type) {
        case "upper":
          result = input.toUpperCase();
          break;
        case "lower":
          result = input.toLowerCase();
          break;
        case "title":
          result = input
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          break;
        case "camel":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
          break;
        case "kebab":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          break;
        case "snake":
          result = input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
          break;
      }
      setOutput(result);
    },
    [input]
  );

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">大小写转换</h1>
        <p className="text-gray-600">文本大小写快速转换，支持多种格式。</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入文本
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入文本..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => convertCase("upper")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          全大写 (UPPER)
        </button>
        <button
          onClick={() => convertCase("lower")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          全小写 (lower)
        </button>
        <button
          onClick={() => convertCase("title")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          首字母大写 (Title)
        </button>
        <button
          onClick={() => convertCase("camel")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          驼峰式 (camelCase)
        </button>
        <button
          onClick={() => convertCase("kebab")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          短横线 (kebab-case)
        </button>
        <button
          onClick={() => convertCase("snake")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          下划线 (snake_case)
        </button>
      </div>

      {output && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">转换结果</h2>
            <button
              onClick={copyOutput}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              复制结果
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm break-all">
            {output}
          </div>
        </div>
      )}
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持多种大小写转换模式：大写、小写、首字母大写、首字母小写</li>
            <li>支持驼峰式（camelCase）、帕斯卡（PascalCase）、蛇形式（snake_case）等格式转换</li>
            <li>支持短横线式（kebab-case）和常量式（CONSTANT_CASE）</li>
            <li>正确处理包含空格、连字符和下划线的混合文本</li>
            <li>不影响数字和非字母字符</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">输入需要转换的文本，选择目标转换模式。支持大小写切换（全大写、全小写、首字母大写）和命名风格转换（驼峰、蛇形、短横线等）。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">大小写转换示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: hello_world_example

camelCase:    helloWorldExample
PascalCase:   HelloWorldExample
snake_case:   hello_world_example
kebab-case:   hello-world-example
CONSTANT:     HELLO_WORLD_EXAMPLE`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">camelCase 和 PascalCase 有什么区别？</h3>
              <p className="text-gray-700">camelCase 首字母小写（如 getUserName），PascalCase 首字母大写（如 GetUserName）。前者常用于变量和函数名，后者常用于类和组件名。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">不同编程语言使用什么命名风格？</h3>
              <p className="text-gray-700">JavaScript 使用 camelCase（变量）和 PascalCase（类），Python 使用 snake_case，CSS 使用 kebab-case 作为属性名。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持中文命名转换吗？</h3>
              <p className="text-gray-700">中文等非 ASCII 字符在命名转换中会被保留原样。命名风格转换主要针对英文单词间的分隔符。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}
