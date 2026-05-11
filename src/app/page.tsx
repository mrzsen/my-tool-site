import Link from "next/link";

const tools = [
  {
    id: "word-counter",
    name: "字数统计工具",
    description: "快速统计文本字数、字符数、段落数，支持中英文混排。",
    icon: "📝",
    href: "/tools/word-counter",
    category: "文本处理",
  },
  {
    id: "password-generator",
    name: "密码生成器",
    description: "生成安全、随机的强密码，支持自定义长度和字符类型。",
    icon: "🔐",
    href: "/tools/password-generator",
    category: "安全工具",
  },
  {
    id: "qr-generator",
    name: "二维码生成器",
    description: "将文本、网址等信息快速转换为二维码图片，支持下载。",
    icon: "📱",
    href: "/tools/qr-generator",
    category: "实用工具",
  },
  {
    id: "timestamp-converter",
    name: "时间戳转换器",
    description: "Unix时间戳与日期时间相互转换，支持毫秒级精度。",
    icon: "⏰",
    href: "/tools/timestamp-converter",
    category: "实用工具",
  },
  {
    id: "json-formatter",
    name: "JSON格式化",
    description: "JSON数据格式化、压缩、校验，让数据一目了然。",
    icon: "📋",
    href: "/tools/json-formatter",
    category: "开发工具",
  },
  {
    id: "case-converter",
    name: "大小写转换",
    description: "文本大小写快速转换，支持大写、小写、首字母大写等。",
    icon: "🔤",
    href: "/tools/case-converter",
    category: "文本处理",
  },
  {
    id: "base64-encode-decode",
    name: "Base64编解码",
    description: "文本Base64编码和解码，支持互转，一键复制结果。",
    icon: "🔢",
    href: "/tools/base64-encode-decode",
    category: "编码转换",
  },
  {
    id: "url-encode-decode",
    name: "URL编解码",
    description: "URL编码和解码，处理特殊字符和中文转码。",
    icon: "🔗",
    href: "/tools/url-encode-decode",
    category: "编码转换",
  },
  {
    id: "encrypt-hash",
    name: "在线加密/哈希",
    description: "支持MD5、SHA-1、SHA-256等多种哈希算法在线计算。",
    icon: "🔒",
    href: "/tools/encrypt-hash",
    category: "安全工具",
  },
  {
    id: "regex-tester",
    name: "正则表达式测试器",
    description: "实时测试正则表达式，支持匹配和替换功能。",
    icon: "🎯",
    href: "/tools/regex-tester",
    category: "开发工具",
  },
  {
    id: "calculator",
    name: "在线计算器",
    description: "简洁实用的计算器，支持加减乘除基本运算。",
    icon: "🧮",
    href: "/tools/calculator",
    category: "计算工具",
  },
  {
    id: "time-difference",
    name: "时间差计算器",
    description: "计算两个日期/时间之间的时间差，支持天、时、分、秒。",
    icon: "⏱️",
    href: "/tools/time-difference",
    category: "实用工具",
  },
  {
    id: "color-converter",
    name: "颜色格式转换器",
    description: "在HEX、RGB、HSL颜色格式之间相互转换。",
    icon: "🎨",
    href: "/tools/color-converter",
    category: "开发工具",
  },
  {
    id: "text-processor",
    name: "文本处理工具箱",
    description: "文本去重、排序、去空格、大小写转换等多种文本处理。",
    icon: "✂️",
    href: "/tools/text-processor",
    category: "文本处理",
  },
  {
    id: "number-converter",
    name: "进制转换器",
    description: "二进制、八进制、十进制、十六进制之间相互转换。",
    icon: "🔄",
    href: "/tools/number-converter",
    category: "开发工具",
  },
];

const categories = [
  { key: "all", name: "全部工具" },
  { key: "文本处理", name: "文本处理" },
  { key: "编码转换", name: "编码转换" },
  { key: "安全工具", name: "安全工具" },
  { key: "开发工具", name: "开发工具" },
  { key: "实用工具", name: "实用工具" },
  { key: "计算工具", name: "计算工具" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🔧 在线工具箱
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            简单、实用、免费 —— 助您提升工作效率
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tools"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              开始使用
            </a>
            <Link
              href="/blog"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              查看博客
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">{tools.length}</div>
              <div className="text-gray-500 text-sm mt-1">在线工具</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">5</div>
              <div className="text-gray-500 text-sm mt-1">技术文章</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-gray-500 text-sm mt-1">工具分类</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              精选工具
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              涵盖文本处理、编码转换、安全计算等多种实用工具，无需注册，打开即用
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <a
                key={cat.key}
                href={cat.key === "all" ? "#tools" : `#${cat.key}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.key === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                id={tool.category}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 group"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <span className="mt-3 inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  {tool.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">极速响应</h3>
              <p className="text-gray-600 text-sm">
                基于最新前端技术构建，页面加载飞快
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">隐私安全</h3>
              <p className="text-gray-600 text-sm">
                所有操作在本地完成，数据不会上传服务器
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-xl font-semibold mb-2">完全免费</h3>
              <p className="text-gray-600 text-sm">
                所有工具永久免费使用，无需注册登录
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">响应式设计</h3>
              <p className="text-gray-600 text-sm">
                完美适配手机、平板、电脑等各种设备
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            开始提升您的工作效率
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            收藏我们的工具网站，随时使用您需要的在线工具
          </p>
          <a
            href="#tools"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            立即体验
          </a>
        </div>
      </section>
    </div>
  );
}