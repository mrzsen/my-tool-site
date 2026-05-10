"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
              网络安全
            </span>
            <span className="text-gray-500 text-sm">2024-01-12</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            2024年密码安全完全指南
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            在数字化时代，密码安全至关重要。本文将分享如何创建强密码、管理密码以及保护您的在线账户安全的最佳实践。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            据统计，超过80%的数据泄露事件与弱密码或密码重复使用有关。在这个信息爆炸的时代，保护好自己的密码就是保护好自己的数字资产。本文将为您提供一套完整的密码安全解决方案。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            为什么密码安全如此重要
          </h2>
          <p>
            密码是您在线身份的第一道防线。一旦密码泄露，攻击者可能：
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>访问您的银行账户和资金</li>
            <li>窃取您的个人身份信息</li>
            <li>冒充您在社交媒体发布内容</li>
            <li>访问您的工作邮件和敏感文档</li>
            <li>使用您的账户进行非法活动</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            强密码的要素
          </h2>
          <p>
            一个强密码应该具备以下特征：
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. 足够的长度</h3>
          <p>
            密码长度至少应该达到12位，理想情况下是16位或更长。每增加一位，破解难度呈指数级增长。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. 字符多样性</h3>
          <p>
            强密码应包含大写字母、小写字母、数字和特殊符号的混合。不要使用纯数字或纯字母密码。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. 避免常见模式</h3>
          <p>
            不要使用生日、电话号码、连续字符（如123456、qwerty）等容易被猜到的模式。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            密码管理最佳实践
          </h2>
          <ol className="list-decimal list-inside space-y-3 mt-4">
            <li><strong>每个账户使用不同密码</strong>：这是最基本的安全原则。如果一个网站泄露，不会影响其他账户。</li>
            <li><strong>使用密码管理器</strong>：如1Password、Bitwarden等，安全地存储和管理所有密码。</li>
            <li><strong>启用双重验证</strong>：即使密码泄露，没有第二重验证也无法登录。</li>
            <li><strong>定期更换密码</strong>：建议每3-6个月更换一次重要账户的密码。</li>
            <li><strong>不在公共WiFi上登录敏感账户</strong>：公共网络可能存在中间人攻击风险。</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            如何生成强密码
          </h2>
          <p>
            手动创建强密码既困难又容易出错。我们推荐使用在线密码生成工具，如我们的
            <Link href="/tools/password-generator" className="text-blue-600 hover:underline">密码生成器</Link>。
            只需设置好长度和字符类型，即可一键生成安全的随机密码。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            结语
          </h2>
          <p>
            密码安全不是一次性的事情，而是需要持续关注的日常习惯。通过使用强密码、密码管理器和双重验证，您可以大大降低账户被盗的风险。从今天开始，审视您的密码习惯，做出改变吧！
          </p>
        </div>
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← 返回博客列表
        </Link>
      </div>
    </div>
  );
}
