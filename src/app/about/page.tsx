"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我们</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">我们的使命</h2>
            <p className="leading-relaxed">
              欢迎来到 wnsj.net 在线工具箱！我们致力于为开发者和普通用户提供免费、简单、实用的在线工具集合。目前网站已收录22款精品工具，涵盖数据格式化、加密解密、编码转换、文本处理、开发辅助等多个领域。
            </p>
            <p className="leading-relaxed mt-3">
              我们的目标是让每个人都能轻松完成日常工作和学习中的数据处理任务，无需安装任何软件，打开浏览器即可使用。所有工具永久免费，无需注册登录，真正做到即刻使用。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">我们的工具</h2>
            <p className="leading-relaxed">
              目前网站提供以下类别的在线工具：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>压缩/格式化</strong>：JSON、XML、HTML、CSS、JS、SQL格式化工具，支持代码美化和压缩</li>
              <li><strong>加密/哈希</strong>：MD5、SHA系列、AES加密解密，支持多种加密模式和输出格式</li>
              <li><strong>编解码转换</strong>：Base64、URL编解码、时间戳转换、进制转换、大小写转换</li>
              <li><strong>文本处理</strong>：正则表达式测试、文本去重排序、字数统计等实用功能</li>
              <li><strong>实用工具</strong>：颜色转换、在线计算、二维码生成、密码生成、时间差计算</li>
            </ul>
            <p className="leading-relaxed mt-3">
              每个工具都经过精心设计和优化，注重用户体验、响应速度和数据安全。我们会持续更新和新增工具，满足用户多样化的需求。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">隐私与安全</h2>
            <p className="leading-relaxed">
              我们非常重视用户的隐私和数据安全。所有工具均使用浏览器本地处理技术，您的输入数据：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>不会上传到任何服务器</li>
              <li>不会存储在云端</li>
              <li>不会与第三方分享</li>
              <li>处理完成后立即从内存中清除</li>
            </ul>
            <p className="leading-relaxed mt-3">
              这意味着即使是我们自己也无法查看您处理的数据。在数据传输方面，我们使用HTTPS加密协议确保传输安全。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">为什么选择我们</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>永久免费</strong>：所有功能完全免费，无隐藏收费，无使用限制</li>
              <li><strong>无需注册</strong>：打开即用，不要求注册账户或登录</li>
              <li><strong>隐私保护</strong>：数据完全在本地处理，不上传服务器</li>
              <li><strong>多平台支持</strong>：电脑、平板、手机均可使用，界面自适应</li>
              <li><strong>持续更新</strong>：定期添加新工具和功能，不断优化用户体验</li>
              <li><strong>响应迅速</strong>：基于现代前端技术构建，操作流畅无卡顿</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">联系我们</h2>
            <p className="leading-relaxed mb-2">
              如果您有任何问题、建议、合作意向，或者发现工具存在bug，欢迎通过以下方式与我们联系。我们会认真对待每一条反馈，持续改进网站质量。
            </p>
            <ul className="space-y-2 mt-3">
              <li>
                <strong>邮箱：</strong>
                <a href="mailto:contact@wnsj.net" className="text-blue-600 hover:underline">contact@wnsj.net</a>
                <span className="text-gray-500 text-sm ml-2">（我们会在24小时内回复）</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
