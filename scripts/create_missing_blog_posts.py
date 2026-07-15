import os

POSTS = {
    "encryption-guide": {
        "title": "加密解密工具完全使用指南",
        "desc": "详细介绍MD5、SHA、AES等加密解密工具的使用方法和应用场景，帮助您保护数据安全。",
        "category": "工具教程",
        "category_color": "blue",
        "date": "2024-01-18",
        "body": """
<h2>加密解密的重要性</h2>
<p>在数字化时代，数据安全已成为每个人都需要关注的问题。无论是个人隐私保护还是企业数据安全，加密技术都扮演着至关重要的角色。MD5、SHA、AES等加密算法各有特点和适用场景，了解它们的区别和正确使用方法对于保护数据安全至关重要。</p>

<h2>MD5 哈希算法</h2>
<p>MD5是一种广泛使用的哈希算法，它将任意长度的数据映射为128位的哈希值。MD5以其计算速度快、输出长度固定等优点，在文件完整性校验、密码存储等领域有广泛应用。然而，MD5已被证明存在碰撞漏洞，不同的输入可能产生相同的哈希值。因此，在安全性要求较高的场景中，建议使用更安全的SHA-2系列算法。MD5目前仍适用于非安全敏感的场景，如文件下载完整性校验、数据去重等。</p>

<h2>SHA 系列哈希算法</h2>
<p>SHA系列是美国国家标准技术研究所发布的安全哈希算法标准。SHA-1输出160位哈希值，由于存在安全性漏洞，目前已被大多数安全标准废弃。SHA-256和SHA-512属于SHA-2系列，分别输出256位和512位的哈希值，是目前最广泛使用的安全哈希算法。SHA-3是最新的SHA标准，采用了与SHA-2完全不同的内部结构，提供了更高的安全性。在实际应用中，SHA-256是安全性和性能的最佳平衡点，被广泛应用于SSL/TLS证书、数字签名、区块链等领域。</p>

<h2>AES 对称加密</h2>
<p>AES是目前最主流的对称加密算法，被全球政府和金融机构广泛采用。AES支持128位、192位和256位三种密钥长度，密钥越长安全性越高。AES有ECB和CBC等多种工作模式。ECB模式简单快速，但相同明文块会产生相同密文块，安全性较低。CBC模式引入了初始化向量，每个明文块会与前一个密文块进行异或运算，安全性更高。在使用AES加密时，PKCS5和PKCS7是最常用的填充方案。</p>

<h2>如何选择合适的加密算法</h2>
<p>选择合适的加密算法需要考虑多个因素：安全性要求、性能需求、兼容性等。对于数据完整性校验，MD5足够快速但在安全场景中推荐SHA-256。对于密码存储，绝对不能使用MD5或SHA-1直接哈希，应使用bcrypt、scrypt或Argon2等专用密码哈希函数。对于数据传输加密，AES-256-GCM是目前推荐的黄金标准，它同时提供了加密和认证功能。</p>

<h2>在线加密工具的使用技巧</h2>
<p>使用在线加密工具时，安全性是首要考虑因素。建议选择在浏览器本地执行加密计算的工具，确保数据不会上传到服务器。在加密敏感信息时，注意不要在公共网络环境下操作。加密后的结果应妥善保存，丢失密钥或密码将导致数据永久无法恢复。定期更新加密算法选择，随着计算能力的提升，曾经安全的算法可能会变得不再安全。</p>
""",
    },
    "formatting-best-practices": {
        "title": "数据格式化最佳实践：JSON、XML、HTML完全指南",
        "desc": "掌握JSON、XML、HTML、CSS、JavaScript、SQL等常用数据格式的格式化技巧，让代码更易读。",
        "category": "开发技巧",
        "category_color": "green",
        "date": "2024-01-20",
        "body": """
<h2>为什么代码格式化很重要</h2>
<p>良好的代码格式化不仅能提高代码的可读性，还能帮助开发者更快地发现潜在的错误。一致的代码风格在团队协作中尤为重要，它能减少代码审查时的认知负担，让团队成员专注于代码逻辑而非格式问题。现代开发工具链中，代码格式化已经成为标准实践，Prettier、ESLint等工具可以帮助团队自动维持一致的代码风格。</p>

<h2>JSON 格式化最佳实践</h2>
<p>JSON是Web开发中最常用的数据交换格式。良好的JSON格式化应该使用一致的缩进（推荐2个空格），确保所有键名使用双引号，去除尾随逗号，并合理使用空行分隔逻辑组。在团队协作中，建议使用JSON Schema来验证数据结构，确保前后端数据交互的准确性。对于大型JSON文件，可以使用压缩格式减少传输体积，但在开发和调试阶段应使用格式化版本。</p>

<h2>XML 格式化技巧</h2>
<p>XML虽然在Web API中逐渐被JSON取代，但在配置文件、文档存储和企业级应用中仍然广泛使用。XML格式化的关键是保持标签层级的清晰可读。合理使用缩进来表示嵌套关系，同时注意保持自闭合标签的格式一致性。对于包含命名空间的XML文档，保持xmlns声明的整洁性很重要。</p>

<h2>HTML 格式化规范</h2>
<p>HTML是Web的基石，良好的HTML格式化直接影响开发效率和页面可维护性。格式化HTML时，应该注意块级元素和内联元素的区别。块级元素（如div、p、section）应该独占一行，而内联元素（如span、a、strong）可以保持在同一行。HTML5引入了许多语义化标签（如header、nav、main、article），使用这些标签不仅能改善SEO，还能提高代码的可读性。</p>

<h2>CSS 格式化最佳实践</h2>
<p>CSS格式化应该关注选择器的组织和属性的排序。推荐的CSS格式化实践包括：按功能模块组织CSS规则，使用一致的属性顺序（先定位属性，再盒模型属性，最后视觉属性），使用简写属性减少代码量，以及合理使用注释分隔不同模块。现代CSS开发中，推荐使用CSS Modules或CSS-in-JS方案来避免全局样式冲突。</p>

<h2>JavaScript 格式化指南</h2>
<p>JavaScript格式化直接影响代码的执行逻辑和可维护性。重要的JS格式化原则包括：一致的引号风格（推荐单引号）、适当的行长度限制（80-120字符）、清晰的变量命名、合理的空行分隔逻辑块、以及一致的函数声明风格。对于异步代码，使用async/await替代回调函数和Promise链，可以显著提高代码可读性。</p>

<h2>SQL 格式化要点</h2>
<p>SQL语句的格式化对于数据库查询的维护和调试至关重要。良好的SQL格式化应该使用关键字大写（SELECT、FROM、WHERE等），每个子句单独一行，合理缩进，复杂的JOIN操作清晰对齐，子查询明确缩进。格式化良好的SQL不仅能提高可读性，还能帮助发现潜在的查询逻辑问题。</p>
""",
    },
    "regex-guide": {
        "title": "正则表达式入门完全指南：从零开始掌握模式匹配",
        "desc": "正则表达式是每个开发者都应该掌握的强大工具。本文从基础语法讲起，带你全面了解正则表达式的使用方法。",
        "category": "开发技巧",
        "category_color": "purple",
        "date": "2024-01-22",
        "body": """
<h2>什么是正则表达式</h2>
<p>正则表达式是一种用于描述字符串模式的强大工具。它通过一系列的字符组合，定义了一个搜索模式，可以用来匹配、查找和替换文本中的特定内容。几乎所有主流编程语言都支持正则表达式，包括JavaScript、Python、Java、PHP等。掌握正则表达式可以极大地提高文本处理的效率，是每个开发者都应该掌握的核心技能。</p>

<h2>基础语法入门</h2>
<p>正则表达式由普通字符和元字符组成。普通字符就是字面意义上的字符，而元字符具有特殊含义。最常用的元字符包括：.（匹配任意单个字符）、*（匹配前一个元素0次或多次）、+（匹配1次或多次）、?（匹配0次或1次）、^（匹配字符串开头）、$（匹配字符串结尾）。例如，正则表达式a.b可以匹配acb、aab、a3b等任意中间有一个字符的字符串。</p>

<h2>字符类和量词</h2>
<p>字符类用方括号[]表示，匹配括号内的任意一个字符。例如，[aeiou]匹配任意一个元音字母。字符类支持范围表示，如[a-z]匹配所有小写字母，[0-9]匹配所有数字。量词用于指定前一个元素出现的次数：{n}表示恰好n次，{n,}表示至少n次，{n,m}表示n到m次。预定义字符类包括：\\d（数字）、\\w（单词字符）、\\s（空白字符），对应的大写表示否定。</p>

<h2>分组和捕获</h2>
<p>分组使用圆括号将多个表达式组合在一起，并捕获匹配的内容供后续使用。分组在文本替换和提取中非常有用。例如，email正则可以使用分组来分别匹配用户名、域名和顶级域。使用(?:...)可以创建非捕获分组，在需要分组但不需要捕获内容时使用，可以提高性能。</p>

<h2>常见正则表达式实例</h2>
<p>以下是一些常用的正则表达式模式：邮箱验证、手机号验证（中国大陆）、IP地址匹配、URL验证、中文字符匹配等。使用这些模式时，注意考虑边界情况和性能优化。建议在使用前充分测试，确保模式能正确处理各种输入情况。</p>

<h2>正则表达式调试技巧</h2>
<p>编写正则表达式时，建议使用在线测试工具进行调试。本网站的正则表达式测试工具提供了实时匹配和高亮功能。调试时应从简单模式开始，逐步增加复杂度。注意考虑边界情况，如空字符串、特殊字符等。性能优化方面，避免使用嵌套量词，合理使用非贪婪匹配，防止不必要的回溯。</p>
""",
    },
    "base64-url-guide": {
        "title": "Base64与URL编码详解：原理、应用与最佳实践",
        "desc": "Base64和URL编码是Web开发中最常用的编码方式。本文深入浅出地讲解它们的原理和使用场景。",
        "category": "实用指南",
        "category_color": "yellow",
        "date": "2024-01-25",
        "body": """
<h2>什么是Base64编码</h2>
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
<p>使用在线编码工具时，建议选择支持双向转换的工具，方便编码和解码的反复操作。对于敏感的编码数据，确保工具在本地处理，不要将数据传输到服务器。在团队协作中，建议统一编码规范，明确在何种场景下使用Base64、Base64URL或URL编码。对于大量数据的Base64编码，注意编码后的体积会增加约33%。</p>
""",
    },
}


def main():
    print("=== Creating missing blog posts ===")
    for slug in sorted(POSTS.keys()):
        data = POSTS[slug]
        dir_path = os.path.join("src/app/blog", slug)
        os.makedirs(dir_path, exist_ok=True)

        body = data["body"].strip()
        # Replace { and } with HTML entities for JSX
        body = body.replace("{", "&lbrace;").replace("}", "&rbrace;")

        content = '''"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-COLOR-100 text-COLOR-800 text-xs font-semibold rounded-full">
              CATEGORY
            </span>
            <span className="text-gray-500 text-sm">DATE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TITLE
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            DESC
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          BODY
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; 返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}
'''
        content = content.replace("TITLE", data["title"])
        content = content.replace("DESC", data["desc"])
        content = content.replace("DATE", data["date"])
        content = content.replace("CATEGORY", data["category"])
        content = content.replace("COLOR", data["category_color"])
        content = content.replace("BODY", body)

        filepath = os.path.join(dir_path, "page.tsx")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Created: {filepath}")

    print("\nDone!")


if __name__ == "__main__":
    main()
