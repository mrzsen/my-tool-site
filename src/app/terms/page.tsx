import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款 - 在线工具箱",
  description: "使用 wnsj.net 在线工具箱即表示您同意以下服务条款，包括服务说明、使用限制、免责声明等。",
  alternates: { canonical: "./" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">服务条款</h1>
      <p className="text-gray-500 text-sm mb-8">最后更新日期：2026年7月8日</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 条款接受</h2>
          <p>欢迎使用 wnsj.net（以下简称"本网站"）。使用本网站即表示您同意以下条款。如果您不同意，请勿使用本网站。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 服务说明</h2>
          <p>本网站提供免费的在线工具服务，包括数据格式化、编码转换、加密解密、文本处理等功能。所有工具均在浏览器本地运行，不会将用户数据上传至服务器。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 使用限制</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>您同意不将本网站用于任何非法目的</li>
            <li>您同意不试图破坏或干扰本网站的正常运行</li>
            <li>您同意不以任何方式滥用本网站提供的服务</li>
            <li>本网站保留随时修改或终止服务的权利</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 知识产权</h2>
          <p>本网站的所有内容，包括文字、图形、标识、代码、界面设计等，均受版权法和相关知识产权法律的保护。未经授权，不得复制、修改、分发或用于商业用途。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 免责声明</h2>
          <p>本网站提供的工具和服务按"现状"提供，不提供任何明示或暗示的保证。我们尽力确保工具的准确性和可靠性，但不对因使用工具而产生的任何直接或间接损失承担责任。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 第三方链接</h2>
          <p>本网站可能包含指向第三方网站的链接。这些链接仅为方便用户提供，我们不对第三方网站的内容、隐私政策或实践负责。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 条款变更</h2>
          <p>我们可能会不时更新这些服务条款。重大变更时，我们会在网站首页发布通知。继续使用本网站即表示您同意更新后的条款。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. 联系方式</h2>
          <p>如有疑问，请联系：<a href="mailto:contact@wnsj.net" className="text-blue-600 hover:underline">contact@wnsj.net</a></p>
        </section>
      </div>
    </div>
  );
}
