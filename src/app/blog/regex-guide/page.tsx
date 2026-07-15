"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
              开发技巧
            </span>
            <span className="text-gray-500 text-sm">2024-01-22</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            正则表达式入门完全指南：从零开始掌握模式匹配
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            正则表达式是每个开发者都应该掌握的强大工具。本文从基础语法讲起，带你全面了解正则表达式的使用方法。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: `          <h2>什么是正则表达式</h2>
<p>正则表达式是一种用于描述字符串模式的强大工具。它通过一系列的字符组合，定义了一个搜索模式，可以用来匹配、查找和替换文本中的特定内容。几乎所有主流编程语言都支持正则表达式，包括JavaScript、Python、Java、PHP等。掌握正则表达式可以极大地提高文本处理的效率，是每个开发者都应该掌握的核心技能。</p>

<h2>基础语法入门</h2>
<p>正则表达式由普通字符和元字符组成。普通字符就是字面意义上的字符，而元字符具有特殊含义。最常用的元字符包括：.（匹配任意单个字符）、*（匹配前一个元素0次或多次）、+（匹配1次或多次）、?（匹配0次或1次）、^（匹配字符串开头）、$（匹配字符串结尾）。例如，正则表达式a.b可以匹配acb、aab、a3b等任意中间有一个字符的字符串。</p>

<h2>字符类和量词</h2>
<p>字符类用方括号[]表示，匹配括号内的任意一个字符。例如，[aeiou]匹配任意一个元音字母。字符类支持范围表示，如[a-z]匹配所有小写字母，[0-9]匹配所有数字。量词用于指定前一个元素出现的次数：&lbrace;n&rbrace;表示恰好n次，&lbrace;n,&rbrace;表示至少n次，&lbrace;n,m&rbrace;表示n到m次。预定义字符类包括：\d（数字）、\w（单词字符）、\s（空白字符），对应的大写表示否定。</p>

<h2>分组和捕获</h2>
<p>分组使用圆括号将多个表达式组合在一起，并捕获匹配的内容供后续使用。分组在文本替换和提取中非常有用。例如，email正则可以使用分组来分别匹配用户名、域名和顶级域。使用(?:...)可以创建非捕获分组，在需要分组但不需要捕获内容时使用，可以提高性能。</p>

<h2>常见正则表达式实例</h2>
<p>以下是一些常用的正则表达式模式：邮箱验证、手机号验证（中国大陆）、IP地址匹配、URL验证、中文字符匹配等。使用这些模式时，注意考虑边界情况和性能优化。建议在使用前充分测试，确保模式能正确处理各种输入情况。</p>

<h2>正则表达式调试技巧</h2>
<p>编写正则表达式时，建议使用在线测试工具进行调试。本网站的正则表达式测试工具提供了实时匹配和高亮功能。调试时应从简单模式开始，逐步增加复杂度。注意考虑边界情况，如空字符串、特殊字符等。性能优化方面，避免使用嵌套量词，合理使用非贪婪匹配，防止不必要的回溯。</p>` }} />

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; 返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}
