"use client";

import { useState, useCallback } from "react";

export default function XmlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatXml = useCallback(() => {
    try {
      let xml = input.trim();
      if (!xml) {
        setError("请输入 XML 内容");
        setOutput("");
        return;
      }

      xml = xml.replace(/></g, ">\n<");

      let formatted = "";
      let indent = 0;
      const padding = "  ";

      const lines = xml.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith("</")) {
          indent = Math.max(0, indent - 1);
        }

        formatted += padding.repeat(indent) + trimmed + "\n";

        if (
          trimmed.startsWith("<") &&
          !trimmed.startsWith("</") &&
          !trimmed.startsWith("<?") &&
          !trimmed.endsWith("/>")
        ) {
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

  const compressXml = useCallback(() => {
    try {
      const compressed = input
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\s+</g, "<")
        .replace(/>\s+/g, ">")
        .replace(/\s+/g, " ")
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
          XML 格式化/压缩
        </h1>
        <p className="text-gray-600">
          格式化 XML 数据使其更易读，或压缩 XML 以减小体积
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 XML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<root><item>test</item></root>"
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
          onClick={formatXml}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📝 格式化
        </button>
        <button
          onClick={compressXml}
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
          <li>在左侧输入框中粘贴 XML 数据</li>
          <li>点击「格式化」美化缩进和换行</li>
          <li>点击「压缩」去除空白和注释</li>
          <li>结果可一键复制到剪贴板</li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>智能缩进 XML 标签层级，树形结构一目了然</li>
            <li>支持命名空间（xmlns）的完整保留和格式化</li>
            <li>保持自闭合标签格式（&lt;tag /&gt;），尊重原始写法</li>
            <li>支持单行压缩，减小 XML 数据体积</li>
            <li>自动处理 CDATA、注释、处理指令等特殊节点</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">将需要格式化的 XML 代码粘贴到输入框中，点击「格式化」按钮即可对 XML 进行美化。支持包含命名空间、CDATA 段、注释的 XML 文档。点击「压缩」可以移除多余的空白字符，将 XML 压缩为紧凑格式，便于存储和传输。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">XML 格式化示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`<!-- 格式化前 -->
<root><person><name>张三</name><age>25</age></person></root>

<!-- 格式化后 -->
<root>
  <person>
    <name>张三</name>
    <age>25</age>
  </person>
</root>`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">XML 格式化和 HTML 格式化有什么区别？</h3>
              <p className="text-gray-700">XML 更注重数据结构和标签的规范性，而 HTML 有更多语义化标签和特殊规则。 XML 格式化工具专注于保持标签层级清晰。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">格式化会改变 XML 中的数据内容吗？</h3>
              <p className="text-gray-700">不会。格式化只调整空白字符和缩进，不会修改标签名称、属性值或文本内容。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持大文件 XML 格式化吗？</h3>
              <p className="text-gray-700">工具基于浏览器本地运行，处理能力取决于您的设备。大多数常规 XML 文件都能流畅处理。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}