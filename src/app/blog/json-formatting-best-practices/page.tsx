"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON 格式化最佳实践 | 博客 - 在线工具箱",
  description: "介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。",
  alternates: {
    canonical: "https://tool.wnsj.net/blog/json-formatting-best-practices"
  }
};

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
              开发技巧
            </span>
            <span className="text-gray-500 text-sm">2024-01-08</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            JSON格式化最佳实践
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            JSON是数据交换的标准格式。本文介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            JSON（JavaScript Object Notation）是当今最流行的数据交换格式之一。无论是前端开发还是后端API设计，JSON都扮演着重要角色。然而，未格式化的JSON字符串往往难以阅读和调试。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            什么是JSON格式化
          </h2>
          <p>
            JSON格式化是指将紧凑的JSON字符串转换为带有适当缩进和换行的可读格式。例如：
          </p>

          <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono">
{`// 格式化前
{"name":"张三","age":25,"city":"北京"}

// 格式化后
{
  "name": "张三",
  "age": 25,
  "city": "北京"
}`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            为什么需要JSON格式化
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>提高可读性</strong>：结构清晰的JSON更容易理解</li>
            <li><strong>便于调试</strong>：快速定位数据层级和字段</li>
            <li><strong>发现错误</strong>：格式化过程可以暴露语法错误</li>
            <li><strong>代码审查</strong>：团队共享时更易审查</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            JSON格式化最佳实践
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. 使用标准缩进</h3>
          <p>
            建议使用2个或4个空格进行缩进。保持团队内统一的缩进标准非常重要。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. 键名使用双引号</h3>
          <p>
            JSON标准要求键名必须使用双引号。这是最常见的JSON错误之一。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. 避免尾随逗号</h3>
          <p>
            虽然某些解析器支持尾随逗号，但标准JSON不允许。在最后一个元素后不要添加逗号。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. 嵌套层级控制</h3>
          <p>
            避免过深的嵌套，建议不超过5层。过深的嵌套不仅影响可读性，还可能导致性能问题。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            常见JSON错误
          </h2>
          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">错误类型</th>
                <th className="border border-gray-300 px-4 py-2 text-left">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">缺少引号</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{name: "张三"}`}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">尾随逗号</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{"a": 1, "b": 2,}`}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">单引号</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{'name': '张三'}`}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">注释</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{"a": 1 // 注释}`}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            使用在线工具
          </h2>
          <p>
            手动格式化JSON容易出错，建议使用我们的<Link href="/tools/json-formatter" className="text-blue-600 hover:underline">JSON格式化工具</Link>。
            支持格式化、压缩、校验，一键完成。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            结语
          </h2>
          <p>
            掌握JSON格式化的最佳实践，能让您的开发工作更加高效。无论是调试API还是处理配置文件，格式良好的JSON都能节省大量时间。
          </p>
        </div>
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← 返回博客列表
        </Link>
      </div>
    </div>
  );
}
