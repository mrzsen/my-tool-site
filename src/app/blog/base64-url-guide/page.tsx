"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
              实用指南
            </span>
            <span className="text-gray-500 text-sm">2024-01-25</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Base64与URL编码详解：原理、应用与最佳实践
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Base64和URL编码是Web开发中最常用的编码方式。本文深入浅出地讲解它们的原理和使用场景。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: `          <h2>什么是Base64编码</h2>
<p>Base64是一种用64个可打印字符表示二进制数据的编码方式。它将每3个字节的二进制数据分成4组，每组6位，对应一个Base64字符。Base64编码常用于在文本协议中传输二进制数据，例如在HTTP头中传输认证信息、在HTML中嵌入图片、在JSON中传输文件等。标准的Base64字符集包括A-Z、a-z、0-9、+、/共64个字符，以及用作填充的=号。</p>

<h2>Base64编码的应用场景</h2>
<p>Base64编码在实际开发中有广泛的应用场景。最常见的用途是在HTML中嵌入图片，使用data:image格式可以将小图片直接嵌入网页，减少HTTP请求次数。在API开发中，Base64常用于传输二进制数据文件，如PDF、图片、文档等。在JWT（JSON Web Token）中，Base64URL编码用于安全地传输声明信息。电子邮件附件也使用Base64编码来确保二进制数据的正确传输。</p>

<h2>Base64URL编码</h2>
<p>Base64URL是Base64的一个变体，专门用于URL和文件名等场景。它将Base64中的+替换为-，/替换为_，并去除末尾的=填充字符。这种变体避免了URL编码中的特殊字符问题，使编码后的字符串可以直接用于URL参数。JWT令牌就是使用Base64URL编码的典型例子。</p>

<h2>什么是URL编码</h2>
<p>URL编码（也称为百分比编码）是一种在URL中传输特殊字符的编码机制。它将非字母数字字符替换为%加上两位十六进制数。例如，空格编码为%20，中文编码为%E4%BD%A0等形式。URL编码确保了URL在各种系统中的正确解析和传输。在GET请求的参数传递中，URL编码是必不可少的。</p>

<h2>URL编码的常见问题</h2>
<p>使用URL编码时需要注意几个常见问题：首先，不要重复编码，对已编码的URL再次编码会导致解析错误。其次，注意区分URL的不同部分，路径和查询参数的编码规则略有不同。在JavaScript中，使用encodeURIComponent对查询参数进行编码，使用encodeURI对完整URL进行编码。解码时使用对应的decodeURIComponent和decodeURI函数。</p>

<h2>编码工具的使用建议</h2>
<p>使用在线编码工具时，建议选择支持双向转换的工具，方便编码和解码的反复操作。对于敏感的编码数据，确保工具在本地处理，不要将数据传输到服务器。在团队协作中，建议统一编码规范，明确在何种场景下使用Base64、Base64URL或URL编码。对于大量数据的Base64编码，注意编码后的体积会增加约33%。</p>` }} />

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; 返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}
