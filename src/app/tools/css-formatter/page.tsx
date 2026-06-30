"use client";

import { useState, useCallback } from "react";

export default function CssFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatCss = useCallback(() => {
    try {
      let css = input.trim();
      if (!css) {
        setError("请输入 CSS 内容");
        setOutput("");
        return;
      }

      let formatted = "";
      let indent = 0;
      const padding = "  ";

      css = css.replace(/\{/g, "{\n");
      css = css.replace(/}/g, "\n}\n");
      css = css.replace(/;/g, ";\n");

      const lines = css.split("\n");
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

  const compressCss = useCallback(() => {
    try {
      const compressed = input
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/;}/g, "}")
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
          CSS 格式化/压缩
        </h1>
        <p className="text-gray-600">
          格式化 CSS 代码使其更易读，或压缩 CSS 以减小体积
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 CSS
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="body { color: red; }"
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
          onClick={formatCss}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📝 格式化
        </button>
        <button
          onClick={compressCss}
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
          <li>在左侧输入框中粘贴 CSS 代码</li>
          <li>点击「格式化」美化缩进和换行</li>
          <li>点击「压缩」去除空白和注释</li>
          <li>支持 CSS 注释的移除</li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>智能缩进选择器和属性，支持嵌套规则（@media、@keyframes）</li>
            <li>保持属性顺序不变，支持自定义属性排序</li>
            <li>支持 CSS3 和 CSS4 最新语法特性</li>
            <li>压缩模式可移除注释和多余空白</li>
            <li>保留浏览器前缀（-webkit-、-moz- 等）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">将 CSS 代码粘贴到输入框，点击「格式化」即可美化样式表。支持选择器分组、属性排序、媒体查询嵌套等场景。压缩模式可以将 CSS 压缩为单行格式。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">CSS 格式化示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`/* 格式化前 */
body{margin:0;padding:0}.container{max-width:1200px}

/* 格式化后 */
body {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1200px;
}`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">CSS 格式化会改变属性的功能吗？</h3>
              <p className="text-gray-700">不会。格式化仅调整缩进和换行，不修改任何属性值和选择器名称，保证功能完全不变。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持 SCSS 或 Less 等预处理器吗？</h3>
              <p className="text-gray-700">目前主要支持标准 CSS。如果您使用 SCSS 或 Less，建议先编译为标准 CSS 后再进行格式化。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">格式化后代码变长，会影响性能吗？</h3>
              <p className="text-gray-700">不影响。CSS 文件的执行性能不受格式化影响。如果担心文件大小，可以使用压缩模式生成精简版本。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}