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
              提供免费、简单、实用的在线工具，帮助用户提升工作效率。
              所有工具均永久免费使用，无需注册登录。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">我们的工具</h2>
            <p className="leading-relaxed">
              涵盖文本处理、编码转换、开发工具、安全工具等多个类别，
              每个工具都精心设计，注重用户体验和使用效率。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">隐私安全</h2>
            <p className="leading-relaxed">
              所有工具均使用浏览器本地处理，您的数据不会上传到服务器。
              我们始终将用户隐私放在首位。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">联系我们</h2>
            <p className="leading-relaxed mb-2">
              如有任何问题、建议或合作意向，请通过以下方式联系我们：
            </p>
            <ul className="space-y-2">
              <li>
                <strong>邮箱：</strong>
                <a href="mailto:contact@wnsj.net" className="text-blue-600 hover:underline">contact@wnsj.net</a>
              </li>
              <li>
                <strong>网站：</strong>
                <Link href="/" className="text-blue-600 hover:underline">tool.wnsj.net</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}