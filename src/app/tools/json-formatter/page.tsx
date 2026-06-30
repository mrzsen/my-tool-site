"use client";

import { useState, useCallback } from "react";

function stripJsonComments(json: string): string {
  return json
    .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
      g ? "" : m
    )
    .replace(/,(?=\s*[}\]])/g, "");
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [stripComments, setStripComments] = useState(true);
  const [autoTrimComma, setAutoTrimComma] = useState(true);

  const parseAndFormat = useCallback(
    (inputText: string, minify: boolean) => {
      try {
        if (!inputText.trim()) {
          setError("请输入JSON内容");
          setOutput("");
          return;
        }

        let cleaned = inputText;

        if (stripComments) {
          cleaned = stripJsonComments(cleaned);
        }

        if (autoTrimComma) {
          cleaned = cleaned.replace(/,(?=\s*[}\]])/g, "");
        }

        const parsed = JSON.parse(cleaned);
        setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent));
        setError("");
      } catch (e) {
        setError("无效的JSON格式: " + (e as Error).message);
        setOutput("");
      }
    },
    [indent, stripComments, autoTrimComma]
  );

  const formatJson = useCallback(() => {
    parseAndFormat(input, false);
  }, [input, parseAndFormat]);

  const minifyJson = useCallback(() => {
    parseAndFormat(input, true);
  }, [input, parseAndFormat]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON 格式化</h1>
        <p className="text-gray-600">
          支持带注释的 JSON 格式化、压缩、校验，自动去除尾随逗号。
        </p>
      </div>

      {/* Options Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={stripComments}
            onChange={(e) => setStripComments(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">支持注释 (// /* */)</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={autoTrimComma}
            onChange={(e) => setAutoTrimComma(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">去除尾随逗号</span>
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">缩进:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded text-sm"
          >
            <option value={2}>2空格</option>
            <option value={4}>4空格</option>
            <option value={8}>8空格</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Input */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">输入</h2>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              清空
            </button>
          </div>
<textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder='{"key": "value"}'
             className="w-full min-h-48 max-h-[60vh] p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm overflow-auto"
           />
        </div>

        {/* Output */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">输出</h2>
            <button
              onClick={copyOutput}
              disabled={!output}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              复制
            </button>
          </div>
<textarea
             value={output}
             readOnly
             placeholder="格式化后的JSON..."
             className="w-full min-h-48 max-h-[60vh] p-3 border border-gray-300 rounded-lg resize-y bg-gray-50 font-mono text-sm overflow-auto"
           />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={formatJson}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          格式化
        </button>
        <button
          onClick={minifyJson}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          压缩
        </button>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持带注释的 JSON（// 和 /* */），无需手动删除注释即可直接格式化</li>
            <li>自动去除尾随逗号，兼容宽松的 JSON 解析规则</li>
            <li>支持 2/4/8 空格缩进选择，满足不同编码规范</li>
            <li>一键压缩 JSON 为单行，节省存储空间和传输带宽</li>
            <li>实时语法校验，错误位置精确定位</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在左侧输入框中粘贴需要格式化的 JSON 字符串，支持带注释和尾随逗号的格式。选择缩进大小（2/4/8 空格），点击「格式化」按钮即可得到美化后的 JSON。点击「压缩」按钮可将 JSON 压缩为单行。格式化后可通过「复制」按钮一键复制结果。如果输入不是合法 JSON，页面会立即显示错误信息，帮助您快速定位问题。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">带注释的 JSON 格式化</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`// 输入：
{
  "name": "张三", // 姓名
  "age": 25 /* 年龄 */
}

// 格式化后：
{
  "name": "张三",
  "age": 25
}`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">JSON 格式化支持哪些注释格式？</h3>
              <p className="text-gray-700">支持两种注释格式：单行注释 // 和多行注释 /* */。开启「支持注释」选项后，格式化时会自动去除这些注释。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">尾随逗号是什么意思？</h3>
              <p className="text-gray-700">尾随逗号指 JSON 对象或数组中最后一个元素后面的逗号，如 &lbrace;"a":1,"b":2,&rbrace;。标准 JSON 不允许尾随逗号，但本工具可以自动去除。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">格式化和压缩有什么区别？</h3>
              <p className="text-gray-700">格式化会将 JSON 展开为带缩进的多行格式，便于阅读；压缩会将 JSON 压缩为单行字符串，节省存储空间。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}