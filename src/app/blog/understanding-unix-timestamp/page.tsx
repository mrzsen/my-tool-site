"use client";

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
            <span className="text-gray-500 text-sm">2024-01-05</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            深入理解Unix时间戳
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Unix时间戳是计算机系统中常用的时间表示方式。本文将深入讲解时间戳的原理、应用场景以及常见转换方法。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Unix时间戳（Unix Timestamp）是计算机科学中最基础的时间表示方式之一。从1970年1月1日00:00:00 UTC开始计算的秒数，这个看似简单的数字，背后却蕴含着丰富的时间处理知识。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            什么是Unix时间戳
          </h2>
          <p>
            Unix时间戳表示从1970年1月1日00:00:00 UTC到当前时刻经过的秒数（或毫秒数）。这个时间点被称为"Unix纪元"（Unix Epoch）。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
            <p className="text-blue-800 font-medium">关键特性：</p>
            <ul className="list-disc list-inside mt-2 text-blue-700">
              <li>不受时区影响，全球统一</li>
              <li>便于计算时间差</li>
              <li>存储空间小（整数类型）</li>
              <li>大多数编程语言原生支持</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            时间戳的单位
          </h2>
          <p>
            时间戳有两种常见单位：
          </p>

          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">单位</th>
                <th className="border border-gray-300 px-4 py-2 text-left">描述</th>
                <th className="border border-gray-300 px-4 py-2 text-left">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">秒</td>
                <td className="border border-gray-300 px-4 py-2">最常用的单位</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">1700000000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">毫秒</td>
                <td className="border border-gray-300 px-4 py-2">JavaScript等语言使用</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">1700000000000</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            时间戳的应用场景
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. 数据库存储</h3>
          <p>
            在数据库中，使用整数类型存储时间戳比存储字符串格式的日期更高效，占用空间更小，索引性能更好。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. API接口通信</h3>
          <p>
            前后端交互时，时间戳避免了日期格式解析的问题。接收方可以根据需要转换为本地格式。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. 缓存控制</h3>
          <p>
            通过比较时间戳判断缓存是否过期，比字符串比较更高效可靠。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. 日志记录</h3>
          <p>
            系统日志中统一使用UTC时间戳，避免时区混乱问题。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            时间戳转换方法
          </h2>
          <p>
            不同编程语言中时间戳的处理方式：
          </p>

          <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono">
{`// JavaScript
const timestamp = Date.now(); // 毫秒
const seconds = Math.floor(Date.now() / 1000);

// Python
import time
timestamp = int(time.time())

// Java
long timestamp = System.currentTimeMillis() / 1000;

// PHP
$timestamp = time();`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            注意事项
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>2038年问题</strong>：32位系统将在2038年面临时间戳溢出问题</li>
            <li><strong>闰秒处理</strong>：Unix时间戳不计算闰秒</li>
            <li><strong>时区转换</strong>：时间戳是UTC时间，显示时需要转换为本地时区</li>
            <li><strong>精度选择</strong>：根据需求选择秒或毫秒精度</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            使用在线工具
          </h2>
          <p>
            手动计算时间戳容易出错，建议使用我们的<Link href="/tools/timestamp-converter" className="text-blue-600 hover:underline">时间戳转换器</Link>。
            支持时间戳与日期时间相互转换，自动识别秒和毫秒。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            结语
          </h2>
          <p>
            Unix时间戳虽然简单，但正确理解和使用它对于开发工作至关重要。希望本文能帮助您更好地掌握时间戳的使用方法。
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
