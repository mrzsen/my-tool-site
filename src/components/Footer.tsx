export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">🔧 实用工具箱</h3>
            <p className="text-gray-300 text-sm">
              免费、简单、实用的在线工具集合，帮助您提升工作效率。
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">热门工具</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/tools/word-counter" className="hover:text-white">字数统计工具</a></li>
              <li><a href="/tools/password-generator" className="hover:text-white">密码生成器</a></li>
              <li><a href="/tools/qr-generator" className="hover:text-white">二维码生成器</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">联系我们</h4>
            <p className="text-gray-300 text-sm">
              如有任何问题或建议，欢迎通过邮件联系我们。
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 实用工具箱. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
