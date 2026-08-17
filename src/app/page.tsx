"use client";

import Link from "next/link";
import { useState } from "react";
import AdSenseSlot from "@/components/AdSenseSlot";

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
    id: "encrypt-hash",
    name: "MD5/SHA 哈希",
    description: "计算MD5、SHA系列哈希值，常用于文件校验。",
    icon: "🔑",
    href: "/tools/encrypt-hash",
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
              <div className="text-3xl font-bold text-purple-400">11</div>
              <div className="text-sm text-gray-500">博客文章</div>
            </div>
          </div>

          {/* 广告位 */}
          <div className="mt-10 max-w-4xl mx-auto">
            <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
          </div>
        </div>
      </section>

      {/* 工具分类列表 */}
      <main className="max-w-7xl mx-auto px-4 py-16">

        {/* 关于本站 */}
        <section className="mb-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">为什么选择我们的在线工具箱？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">本地处理，保护隐私</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                所有工具均在您的浏览器本地运行，输入数据不会上传到任何服务器。无论是加密解密、编码转换还是数据处理，您的信息始终存储在您的设备上，处理完成后立即从内存中清除。
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">永久免费，无需注册</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                所有功能完全免费，无隐藏收费，无使用限制。无需注册账户或登录，打开浏览器即可使用。我们致力于为开发者和普通用户提供真正免费、实用的在线工具。
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">持续更新，多平台支持</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                我们定期添加新工具和功能，不断优化用户体验。电脑、平板、手机均可使用，界面自适应。基于现代前端技术构建，操作流畅无卡顿。
              </p>
            </div>
          </div>
        </section>

        {/* 网站介绍文章 */}
        <article className="mb-16 max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">免费在线工具箱，高效解决日常开发难题</h2>
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
            <p>
              wnsj.net 是一个免费的在线工具集合网站，收录了 JSON 格式化、XML 格式化、HTML 格式化、CSS 格式化、JavaScript 代码美化、SQL 语句格式化、Base64 编解码、URL 编解码、MD5/SHA 哈希计算、AES 加密解密、正则表达式测试、文本处理、进制转换、时间戳转换、颜色转换、二维码生成、密码生成、字数统计、在线计算器等 21 款常用工具，覆盖了开发人员和普通用户日常工作中最常遇到的场景。
            </p>
            <p>
              与传统的桌面软件不同，我们的在线工具无需下载安装，打开浏览器即可直接使用，并支持 Windows、macOS、Linux、Android、iOS 等几乎所有主流平台。所有工具都采用浏览器本地计算的方式，您输入的数据不会离开您的设备，从根本上保障了信息隐私安全。
            </p>
            <p>
              例如，当您需要调试接口时，可以使用 JSON 格式化工具快速整理返回的数据，让嵌套结构一目了然；当您需要处理用户密码时，可以使用 MD5 或 SHA 哈希工具快速生成不可逆的摘要值；当您在前后端联调遇到中文乱码时，URL 编解码工具和 Base64 工具可以帮您快速定位并解决编码问题。这些看似简单的操作，如果使用命令行或编写脚本，往往需要耗费大量时间，而使用我们的在线工具只需粘贴、点击两步即可完成。
            </p>
            <p>
              对于开发者而言，在线工具箱还能作为日常开发的重要辅助。正则表达式测试工具支持实时匹配预览，帮助您快速验证正则规则是否正确；时间戳转换工具支持秒级和毫秒级时间戳，方便您在开发中调试日期逻辑；进制转换工具支持二进制、八进制、十进制、十六进制之间的任意转换，是底层开发和学习的好帮手。
            </p>
            <p>
              我们始终坚持免费、简洁、实用的理念，拒绝广告泛滥和弹窗骚扰，力求为每一位用户提供干净、高效的工具使用体验。如果您有任何建议或发现工具存在问题，欢迎通过联系我们页面与我们沟通，我们会持续改进和迭代，让在线工具箱真正成为您工作与学习中的得力助手。
            </p>
          </div>
        </article>

        {/* 常见问题 */}
        <section className="mb-16 max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">常见问题解答</h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">这些在线工具是免费的吗？</h3>
              <p className="text-gray-400 leading-relaxed">
                是的，网站上的所有工具都完全免费，没有任何隐藏收费，也没有次数限制。您可以无限制地使用全部功能。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">我的数据会上传到服务器吗？</h3>
              <p className="text-gray-400 leading-relaxed">
                不会。所有工具的运算都在您的浏览器本地完成，输入内容不会上传到任何服务器，处理完成后也不会被保存，请放心使用。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">工具需要安装或注册吗？</h3>
              <p className="text-gray-400 leading-relaxed">
                都不需要。所有工具打开即用，无需注册、无需登录、无需下载安装任何软件，在任何带浏览器的设备上都可以使用。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">手机端可以使用这些工具吗？</h3>
              <p className="text-gray-400 leading-relaxed">
                可以。网站界面完全自适应，在手机、平板等移动设备上同样可以流畅使用所有工具，并针对触屏操作做了优化。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">我想要的工具这里没有，怎么办？</h3>
              <p className="text-gray-400 leading-relaxed">
                我们一直在持续添加新工具。如果找不到您需要的功能，欢迎通过联系我们页面告诉我们，我们会评估并尽快上线。
              </p>
            </div>
          </div>
        </section>
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

        {/* 底部广告位 */}
        <div className="mt-12 max-w-4xl mx-auto">
          <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
        </div>
      </main>
    </div>
  );
}