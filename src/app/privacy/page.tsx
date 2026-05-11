"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">隐私政策</h1>
        <p className="text-sm text-gray-500 mb-8">最后更新日期：2024年1月</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 信息收集</h2>
            <p className="leading-relaxed">
              我们收集您在使用工具时输入的数据。所有工具均在您的浏览器本地处理，
              数据不会上传到我们的服务器。我们使用 Google AdSense 展示广告，
              可能会使用 cookies 来提供个性化广告。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 信息使用</h2>
            <p className="leading-relaxed">
              我们收集的信息用于改善网站体验、分析流量趋势以及展示相关广告。
              我们不会将您的个人信息出售给第三方。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookie</h2>
            <p className="leading-relaxed">
              我们的网站使用 cookies 来提升用户体验。Google AdSense 使用
              DoubleClick Cookie 来投放广告。您可以在浏览器设置中禁用 cookies。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 第三方服务</h2>
            <p className="leading-relaxed">
              本网站使用以下第三方服务：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Google AdSense - 广告展示</li>
              <li>Google Analytics - 流量分析</li>
              <li>Vercel - 网站托管</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 数据安全</h2>
            <p className="leading-relaxed">
              我们采取合理的安全措施保护您的数据。但由于工具在本地运行，
              您的输入数据不会经过我们的服务器。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 联系方式</h2>
            <p className="leading-relaxed">
              如果您对隐私政策有任何疑问，请通过邮件联系我们。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}