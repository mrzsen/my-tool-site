"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">隐私政策</h1>
        <p className="text-sm text-gray-500 mb-8">最后更新日期：2026年6月</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 信息收集</h2>
            <p className="leading-relaxed">
              我们收集您在使用工具时输入的数据。所有工具均在您的浏览器本地处理，
              数据不会上传到我们的服务器。我们使用 Google AdSense 展示广告，
              可能会使用 cookies 来提供个性化广告。当您访问本网站时，Google 可能会
              向您的浏览器发送 cookie，用于广告投放和流量分析。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 信息使用</h2>
            <p className="leading-relaxed">
              我们收集的信息用于改善网站体验、分析流量趋势以及展示相关广告。
              我们不会将您的个人信息出售给第三方。Google AdSense 可能会根据您的
              浏览历史展示个性化广告，您可以在 Google 的广告设置页面管理个性化广告偏好。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookie 使用说明</h2>
            <p className="leading-relaxed">
              我们的网站使用 cookies 来提升用户体验。具体使用的 cookie 类型包括：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>必要 cookie</strong>：确保网站基本功能正常运行</li>
              <li><strong>广告 cookie</strong>：Google AdSense 使用 DoubleClick Cookie 来投放个性化广告</li>
              <li><strong>分析 cookie</strong>：Google Analytics 用于统计网站流量和用户行为</li>
            </ul>
            <p className="leading-relaxed mt-3">
              您可以在浏览器设置中禁用 cookies，但可能会影响某些功能的正常使用。
              您也可以访问 <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 广告设置页面</a> 管理个性化广告偏好。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 第三方服务</h2>
            <p className="leading-relaxed">
              本网站使用以下第三方服务：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                <strong>Google AdSense</strong> - 广告展示。Google 作为第三方供应商，使用 cookie 在网站上投放广告。
                了解更多：<a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 广告技术</a>
              </li>
              <li>
                <strong>Google Analytics</strong> - 流量分析。用于了解用户如何与网站互动。
                了解更多：<a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 隐私政策</a>
              </li>
              <li><strong>Vercel</strong> - 网站托管服务</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 数据安全</h2>
            <p className="leading-relaxed">
              我们采取合理的安全措施保护您的数据。所有数据传输使用 HTTPS 加密协议。
              由于工具在浏览器本地运行，您的输入数据不会经过我们的服务器，从根本上保障了数据安全。
              我们建议您不要在处理敏感信息时使用公共或不安全的网络环境。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 用户权利</h2>
            <p className="leading-relaxed">
              根据适用的数据保护法律，您拥有以下权利：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>了解我们收集了哪些个人信息</li>
              <li>要求删除您的个人信息</li>
              <li>拒绝或限制 cookies 的使用</li>
              <li>选择退出个性化广告</li>
            </ul>
            <p className="leading-relaxed mt-3">
              您可以通过浏览器设置管理 cookie 偏好，或访问 
              <a href="https://optout.aboutads.info" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Digital Advertising Alliance</a> 
              的退出页面选择退出个性化广告。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 政策更新</h2>
            <p className="leading-relaxed">
              我们可能会不时更新本隐私政策。重大变更时，我们会在网站首页发布通知。
              建议您定期查看本页面以了解最新的隐私保护措施。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. 联系我们</h2>
            <p className="leading-relaxed">
              如果您对隐私政策有任何疑问或关切，请通过以下邮箱联系我们：
              <a href="mailto:contact@wnsj.net" className="text-blue-600 hover:underline ml-1">contact@wnsj.net</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
