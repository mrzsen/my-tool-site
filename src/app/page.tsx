import Link from "next/link";

const tools = [
  {
    id: "word-counter",
    name: "字数统计工具",
    description: "快速统计文本字数、字符数、段落数，支持中英文混排。",
    icon: "📝",
    href: "/tools/word-counter",
  },
  {
    id: "password-generator",
    name: "密码生成器",
    description: "生成安全、随机的强密码，支持自定义长度和字符类型。",
    icon: "🔐",
    href: "/tools/password-generator",
  },
  {
    id: "qr-generator",
    name: "二维码生成器",
    description: "将文本、网址等信息快速转换为二维码图片，支持下载。",
    icon: "📱",
    href: "/tools/qr-generator",
  },
  {
    id: "timestamp-converter",
    name: "时间戳转换器",
    description: "Unix时间戳与日期时间相互转换，支持毫秒级精度。",
    icon: "⏰",
    href: "/tools/timestamp-converter",
  },
  {
    id: "json-formatter",
    name: "JSON格式化",
    description: "JSON数据格式化、压缩、校验，让数据一目了然。",
    icon: "📋",
    href: "/tools/json-formatter",
  },
  {
    id: "case-converter",
    name: "大小写转换",
    description: "文本大小写快速转换，支持大写、小写、首字母大写等。",
    icon: "🔤",
    href: "/tools/case-converter",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            免费在线工具集合
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            简单易用，提升效率，完全免费
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tools"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              开始使用工具
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

      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              热门工具
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              精心开发的实用工具，无需注册，打开即用
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 group"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-xl font-semibold mb-2">完全免费</h3>
              <p className="text-gray-600">所有工具永久免费使用，无需注册登录</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">隐私安全</h3>
              <p className="text-gray-600">所有操作在本地完成，数据不会上传到服务器</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">极速响应</h3>
              <p className="text-gray-600">基于最新技术构建，页面加载速度快</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">开始提升您的工作效率</h2>
          <p className="text-gray-300 mb-8 text-lg">
            收藏我们的网站，随时使用您需要的工具
          </p>
        </div>
      </section>
    </div>
  );
}
