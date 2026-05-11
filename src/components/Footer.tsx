import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">🔧 实用工具箱</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              免费、简单、实用的在线工具集合，帮助您提升工作效率。
              所有工具均在浏览器本地运行，保护您的隐私安全。
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">热门工具</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/tools/json-formatter" className="hover:text-white">JSON格式化</a></li>
              <li><a href="/tools/password-generator" className="hover:text-white">密码生成器</a></li>
              <li><a href="/tools/qr-generator" className="hover:text-white">二维码生成器</a></li>
              <li><a href="/tools/base64-encode-decode" className="hover:text-white">Base64编解码</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">更多信息</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">关于我们</Link></li>
              <li><Link href="/privacy" className="hover:text-white">隐私政策</Link></li>
              <li><Link href="/blog" className="hover:text-white">博客文章</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} tool.wnsj.net - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}