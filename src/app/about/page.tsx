"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我们</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              我们的使命
            </h2>
            <p className="leading-relaxed">
              欢迎来到 wnsj.net 在线工具箱！我们致力于为开发者和普通用户提供免费、简单、实用的在线工具集合。目前网站已收录25款精品工具，涵盖数据格式化、加密解密、编码转换、文本处理、开发辅助等多个领域。我们相信，技术不应该成为普通人生活的门槛，优秀的工具应该让每个人都能轻松上手。
            </p>
            <p className="leading-relaxed mt-3">
              在数字化时代，数据处理和信息转换已成为日常生活中不可或缺的一部分。无论是开发者需要调试代码接口，还是普通用户需要转换文件格式或生成密码，wnsj.net 都希望能为您提供最便捷、最可靠的解决方案。我们的目标是通过技术的力量，让复杂的事情变简单，让简单的事情变高效。
            </p>
            <p className="leading-relaxed mt-3">
              我们的团队持续关注开发者和用户的需求变化，定期添加新工具并优化现有功能。我们深知，一个好的工具不仅仅是功能的堆砌，更需要简洁的界面、流畅的体验和可靠的安全保障。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              我们的工具
            </h2>
            <p className="leading-relaxed">
              目前网站提供以下类别的在线工具，每一类工具都经过精心设计，满足不同场景下的需求：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>压缩/格式化</strong>：JSON、XML、HTML、CSS、JavaScript、
                SQL 格式化工具，支持代码美化和压缩，让代码结构清晰一目了然
              </li>
              <li>
                <strong>加密/哈希</strong>：MD5、SHA 系列、AES 加密解密工具，
                支持多种加密模式和输出格式，满足数据安全需求
              </li>
              <li>
                <strong>编解码转换</strong>：Base64、URL 编解码、时间戳转换、
                进制转换、大小写转换，轻松解决各种编码难题
              </li>
              <li>
                <strong>文本处理</strong>：正则表达式测试、文本去重排序、字数统计、
                文本摘要、文本润色，全方位满足文本处理需求
              </li>
              <li>
                <strong>AI 工具</strong>：AI 提示词生成、文本摘要、文本润色、
                AI 翻译改写，让人工智能成为您的高效助手
              </li>
              <li>
                <strong>实用工具</strong>：颜色转换、在线计算、二维码生成、
                密码生成、时间差计算，覆盖日常使用的各种场景
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              每个工具都经过精心设计和优化，注重用户体验、响应速度和数据安全。我们会持续更新和新增工具，满足用户多样化的需求。我们承诺，所有工具永久免费，无任何隐藏收费。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              隐私与安全
            </h2>
            <p className="leading-relaxed">
              我们非常重视用户的隐私和数据安全。所有工具均使用浏览器本地处理技术，
              您的输入数据：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>不会上传到任何服务器</li>
              <li>不会存储在云端</li>
              <li>不会与第三方分享</li>
              <li>处理完成后立即从内存中清除</li>
            </ul>
            <p className="leading-relaxed mt-3">
              这意味着即使是我们自己也无法查看您处理的数据。在数据传输方面，我们使用 HTTPS 加密协议确保传输安全。您可以放心使用所有工具处理敏感信息，
              我们承诺绝不会收集、存储或滥用任何用户数据。如果您对隐私保护有任何疑问，欢迎随时联系我们。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              为什么选择我们
            </h2>
            <p className="leading-relaxed">
              在众多在线工具网站中，wnsj.net 坚持以下核心原则：
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>永久免费</strong>：所有功能完全免费，无隐藏收费，无使用限制。
                我们不会通过限制功能来诱导您付费
              </li>
              <li>
                <strong>无需注册</strong>：打开即用，不要求注册账户或登录。您可以
                匿名使用所有工具，不留下任何个人信息
              </li>
              <li>
                <strong>隐私保护</strong>：数据完全在本地处理，不上传服务器。即使
                网站服务器遭受攻击，您的数据也是安全的
              </li>
              <li>
                <strong>多平台支持</strong>：电脑、平板、手机均可使用，界面自适应。
                无论您使用什么设备，都能获得一致的使用体验
              </li>
              <li>
                <strong>持续更新</strong>：定期添加新工具和功能，不断优化用户体验。
                我们倾听用户反馈，持续改进产品
              </li>
              <li>
                <strong>响应迅速</strong>：基于现代前端技术构建，操作流畅无卡顿。
                所有计算在本地完成，响应速度取决于您的设备性能
              </li>
              <li>
                <strong>专业内容</strong>：每个工具都配备详细的使用说明、示例和常见
                问题解答，帮助您快速上手并充分发挥工具的价值
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              联系我们
            </h2>
            <p className="leading-relaxed mb-2">
              如果您有任何问题、建议、合作意向，或者发现工具存在 bug，欢迎通过以下方式与我们沟通。我们会认真对待每一条反馈，持续改进网站质量。
            </p>
            <p className="leading-relaxed">
              我们的目标是建立一个开放、友好的工具社区。如果您愿意分享您的使用经验、提出功能建议或参与工具测试，我们非常欢迎。
            </p>
            <ul className="space-y-2 mt-3">
              <li>
                <strong>邮箱：</strong>
                <a
                  href="mailto:contact@wnsj.net"
                  className="text-blue-600 hover:underline"
                >
                  contact@wnsj.net
                </a>
                <span className="text-gray-500 text-sm ml-2">
                  （我们会在 24 小时内回复）
                </span>
              </li>
              <li>
                <strong>反馈渠道：</strong>欢迎在联系我们页面提交详细的反馈信息，
                帮助我们更好地改进产品
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}