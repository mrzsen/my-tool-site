"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  {
    id: "json-formatter",
    name: "JSON 格式化",
    description: "JSON数据格式化、压缩、校验，让数据一目了然。",
    icon: "📋",
    href: "/tools/json-formatter",
    category: "压缩/格式化",
  },
  {
    id: "xml-formatter",
    name: "XML 格式化",
    description: "XML数据格式化与压缩，支持代码美化。",
    icon: "📄",
    href: "/tools/xml-formatter",
    category: "压缩/格式化",
  },
  {
    id: "html-formatter",
    name: "HTML 格式化",
    description: "HTML代码格式化与压缩，支持HTML5标签。",
    icon: "🌐",
    href: "/tools/html-formatter",
    category: "压缩/格式化",
  },
  {
    id: "css-formatter",
    name: "CSS 格式化",
    description: "CSS代码格式化与压缩，支持样式表美化。",
    icon: "🎨",
    href: "/tools/css-formatter",
    category: "压缩/格式化",
  },
  {
    id: "js-formatter",
    name: "JS 格式化",
    description: "JavaScript代码格式化与压缩，支持注释移除。",
    icon: "⚙️",
    href: "/tools/js-formatter",
    category: "压缩/格式化",
  },
  {
    id: "sql-formatter",
    name: "SQL 格式化",
    description: "SQL语句格式化与压缩，关键字自动换行。",
    icon: "🗄️",
    href: "/tools/sql-formatter",
    category: "压缩/格式化",
  },
  {
    id: "md5-hash",
    name: "MD5 哈希",
    description: "计算字符串的MD5哈希值，常用于文件校验。",
    icon: "🔑",
    href: "/tools/md5-hash",
    category: "加密/哈希",
  },
  {
    id: "sha-hash",
    name: "SHA 哈希",
    description: "支持SHA-1/256/384/512等多种安全哈希算法。",
    icon: "🔏",
    href: "/tools/sha-hash",
    category: "加密/哈希",
  },
  {
    id: "aes-crypt",
    name: "AES 加密",
    description: "AES对称加密解密，支持ECB/CBC模式。",
    icon: "🔐",
    href: "/tools/aes-crypt",
    category: "加密/哈希",
  },
  {
    id: "base64-encode-decode",
    name: "Base64 编解码",
    description: "文本Base64编码和解码，支持互转一键复制。",
    icon: "📡",
    href: "/tools/base64-encode-decode",
    category: "编解码转换",
  },
  {
    id: "url-encode-decode",
    name: "URL 编解码",
    description: "URL编码和解码，处理特殊字符和中文转码。",
    icon: "🔗",
    href: "/tools/url-encode-decode",
    category: "编解码转换",
  },
  {
    id: "timestamp-converter",
    name: "时间戳转换",
    description: "Unix时间戳与日期时间相互转换，支持毫秒级。",
    icon: "⏰",
    href: "/tools/timestamp-converter",
    category: "编解码转换",
  },
  {
    id: "number-converter",
    name: "进制转换",
    description: "二进制、八进制、十进制、十六进制之间相互转换。",
    icon: "🔢",
    href: "/tools/number-converter",
    category: "编解码转换",
  },
  {
    id: "case-converter",
    name: "大小写转换",
    description: "文本大小写快速转换，支持多种转换模式。",
    icon: "🔤",
    href: "/tools/case-converter",
    category: "编解码转换",
  },
  {
    id: "regex-tester",
    name: "正则表达式",
    description: "实时测试正则表达式，支持匹配和替换功能。",
    icon: "🔍",
    href: "/tools/regex-tester",
    category: "文本处理",
  },
  {
    id: "text-processor",
    name: "文本处理工具箱",
    description: "文本去重、排序、去空格、大小写转换等多种处理。",
    icon: "✂️",
    href: "/tools/text-processor",
    category: "文本处理",
  },
  {
    id: "word-counter",
    name: "字数统计",
    description: "实时统计字符数、单词数、段落数等信息。",
    icon: "📝",
    href: "/tools/word-counter",
    category: "文本处理",
  },
  {
    id: "color-converter",
    name: "颜色转换器",
    description: "RGB、HEX、HSL颜色格式之间相互转换。",
    icon: "🎨",
    href: "/tools/color-converter",
    category: "实用工具",
  },
  {
    id: "calculator",
    name: "在线计算器",
    description: "简洁实用的计算器，支持加减乘除基本运算。",
    icon: "🧮",
    href: "/tools/calculator",
    category: "实用工具",
  },
  {
    id: "qr-generator",
    name: "二维码生成",
    description: "将文本、网址等信息快速转换为二维码图片。",
    icon: "📱",
    href: "/tools/qr-generator",
    category: "实用工具",
  },
  {
    id: "password-generator",
    name: "密码生成器",
    description: "生成安全、随机的强密码，支持自定义长度。",
    icon: "🔒",
    href: "/tools/password-generator",
    category: "实用工具",
  },
  {
    id: "time-difference",
    name: "时间差计算",
    description: "计算两个日期/时间之间的时间差，支持天/时/分/秒。",
    icon: "⏱️",
    href: "/tools/time-difference",
    category: "实用工具",
  },
];

const categories = [
  { key: "all", name: "全部工具" },
  { key: "压缩/格式化", name: "📦 压缩/格式化" },
  { key: "加密/哈希", name: "🔐 加密/哈希" },
  { key: "编解码转换", name: "🔄 编解码转换" },
  { key: "文本处理", name: "🔍 文本处理" },
  { key: "实用工具", name: "🧰 实用工具" },
];

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <Link
      key={tool.id}
      href={tool.href}
      className="block p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 hover:bg-gray-900 transition-all hover:shadow-lg hover:shadow-gray-900/50 group"
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
        {tool.icon}
      </div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-400 transition">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500">{tool.description}</p>
    </Link>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = tools.filter(
    (tool) =>
      (activeCategory === "all" || tool.category === activeCategory) &&
      (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categoryTools: Record<string, typeof tools> = {};
  categories.forEach((cat) => {
    if (cat.key !== "all") {
      categoryTools[cat.key] = tools.filter((t) => t.category === cat.key);
    }
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero 区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0iZmxvYXQiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">
            在线工具箱
            <span className="block text-lg font-normal text-gray-400 mt-2">
              免费 · 高效 · 即刻使用
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            提供 {tools.length} 款实用在线工具，覆盖编码转换、数据格式化、加密解密、文本处理等场景，无需安装，打开即用
          </p>

          {/* 搜索框 */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="搜索工具，如「JSON」「加密」..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
          </div>

          {/* 统计数字 */}
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {tools.length}
              </div>
              <div className="text-sm text-gray-500">在线工具</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-500">分类数量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">5</div>
              <div className="text-sm text-gray-500">博客文章</div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具分类列表 */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {searchQuery && (
          <p className="text-gray-400 mb-6">
            搜索「<span className="text-blue-400">{searchQuery}</span>」找到{" "}
            <span className="text-green-400 font-bold">
              {filteredTools.length}
            </span>{" "}
            个工具
          </p>
        )}

        {/* 分类标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 按分类显示工具 */}
        {activeCategory === "all" ? (
          <div className="space-y-16">
            {[
              {
                cat: "压缩/格式化",
                color: "from-purple-500 to-pink-500",
                tools: tools.filter((t) => t.category === "压缩/格式化"),
              },
              {
                cat: "加密/哈希",
                color: "from-red-500 to-orange-500",
                tools: tools.filter((t) => t.category === "加密/哈希"),
              },
              {
                cat: "编解码转换",
                color: "from-blue-500 to-cyan-500",
                tools: tools.filter((t) => t.category === "编解码转换"),
              },
              {
                cat: "文本处理",
                color: "from-green-500 to-emerald-500",
                tools: tools.filter((t) => t.category === "文本处理"),
              },
              {
                cat: "实用工具",
                color: "from-yellow-500 to-orange-500",
                tools: tools.filter((t) => t.category === "实用工具"),
              },
            ].map(
              ({ cat, color, tools: catTools }) =>
                catTools.length > 0 && (
                  <section key={cat}>
                    <h2
                      className={`text-2xl font-bold mb-6 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                    >
                      {cat}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {catTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </section>
                )
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
            ) : (
              <p className="text-gray-500 text-center col-span-full py-10">
                没有找到匹配的工具
              </p>
            )}
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🛠️</span> 在线工具箱
              </h4>
              <p className="text-gray-500 text-sm">
                提供免费的在线工具集合，覆盖日常开发、数据处理、文本编辑等多种场景。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">快速链接</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="/tools/json-formatter"
                    className="hover:text-blue-400 transition"
                  >
                    → 所有工具
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-blue-400 transition"
                  >
                    → 隐私政策
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-blue-400 transition"
                  >
                    → 关于我们
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">工具分类</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories
                  .filter((c) => c.key !== "all")
                  .map((cat) => (
                    <li key={cat.key}>
                      <a href={`#${cat.key}`} className="hover:text-blue-400 transition">
                        {cat.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-600">
            <p>© 2025 在线工具箱 · 免费使用 · 支持开发者通过广告获得收入</p>
          </div>
        </div>
      </footer>
    </div>
  );
}