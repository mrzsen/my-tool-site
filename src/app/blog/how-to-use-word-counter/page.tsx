"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              工具教程
            </span>
            <span className="text-gray-500 text-sm">2024-01-15</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            如何使用字数统计工具提升写作效率
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            字数统计工具不仅可以帮助您统计字数，还能分析段落结构、字符分布等。本文将详细介绍如何充分利用字数统计工具提升写作效率。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            在数字化写作时代，字数统计已经成为每个写作者必备的工具。无论是学生写作文、职场人士撰写报告，还是自媒体创作者发布文章，精确的字数统计都是必不可少的。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            为什么需要字数统计工具
          </h2>
          <p>
            很多人可能会问，Word文档不是自带字数统计功能吗？确实如此，但专业的在线字数统计工具具有以下优势：
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>即时响应</strong>：无需打开 heavy 的文档软件，浏览器中即可使用</li>
            <li><strong>多维度分析</strong>：不仅统计字数，还能分析字符数、段落数、行数等</li>
            <li><strong>跨平台</strong>：在任何设备上都能使用，支持手机、平板、电脑</li>
            <li><strong>隐私安全</strong>：数据在本地处理，不会上传到服务器</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            字数统计的核心功能
          </h2>
          <p>
            一个优秀的字数统计工具通常包含以下核心功能：
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. 总字符数统计</h3>
          <p>
            这是最基础的统计功能，计算文本中所有字符的数量，包括汉字、英文字母、数字、标点符号和空格。在撰写需要严格控制篇幅的文章时，这个功能尤为重要。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. 不含空格字符数</h3>
          <p>
            有些场景下，我们需要知道不含空格的纯文本字符数。比如某些平台的简介有字符限制，但通常不计入空格。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. 词数统计</h3>
          <p>
            对于英文内容，词数（Word Count）是衡量文章长度的重要指标。一个英文单词通常由空格分隔，因此词数统计对于英文写作非常有帮助。
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. 段落数统计</h3>
          <p>
            段落数是衡量文章结构的重要指标。合理的段落划分能让文章更易读，一般来说，一个段落应该控制在3-5句话。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            实用技巧
          </h2>
          <p>
            以下是一些使用字数统计工具的实用技巧：
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-4">
            <li><strong>设定目标字数</strong>：在写作前设定目标字数，边写边看进度</li>
            <li><strong>分段统计</strong>：将长文分段粘贴，分析每段字数分布</li>
            <li><strong>对比修改</strong>：修改前后分别统计，对比字数变化</li>
            <li><strong>配合大纲使用</strong>：先写大纲，再按段落填充内容</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            结语
          </h2>
          <p>
            字数统计工具虽然看似简单，但正确使用能显著提升写作效率。无论您是专业写手还是偶尔写作，掌握字数统计技巧都是非常有价值的。现在就去试试我们的
            <Link href="/tools/word-counter" className="text-blue-600 hover:underline">字数统计工具</Link>
            吧！
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
