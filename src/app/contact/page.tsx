import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我们 - 在线工具箱",
  description: "如有任何问题、建议或合作意向，请通过邮箱联系我们，我们会在24小时内回复。",
  alternates: { canonical: "./" },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h1>
      <p className="text-gray-600 mb-8">
        如果您有任何问题、建议或合作意向，请通过以下方式联系我们。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">邮箱</h2>
          <p className="text-gray-700">
            <a href="mailto:contact@wnsj.net" className="text-blue-600 hover:underline">
              contact@wnsj.net
            </a>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">响应时间</h2>
          <p className="text-gray-700">我们会在 24 小时内回复您的邮件。</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">常见联系原因</h2>
        <ul className="space-y-3 text-gray-700">
          <li><strong>广告合作：</strong>如果您希望在网站上投放广告，请通过邮件联系。</li>
          <li><strong>功能建议：</strong>如果您有新的工具建议或改进想法，欢迎提出。</li>
          <li><strong>问题反馈：</strong>如果您在使用工具时遇到问题，请详细描述以便我们排查。</li>
          <li><strong>隐私问题：</strong>关于隐私政策的任何疑问，请参考<a href="/privacy" className="text-blue-600 hover:underline">隐私政策</a>。</li>
        </ul>
      </div>
    </div>
  );
}
