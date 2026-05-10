"use client";

import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const posts: Post[] = [
  {
    slug: "how-to-use-word-counter",
    title: "如何使用字数统计工具提升写作效率",
    excerpt: "字数统计工具不仅可以帮助您统计字数，还能分析段落结构、字符分布等。本文将详细介绍如何充分利用字数统计工具提升写作效率。",
    date: "2024-01-15",
    category: "工具教程",
    readTime: "5分钟",
  },
  {
    slug: "password-security-tips",
    title: "2024年密码安全完全指南",
    excerpt: "在数字化时代，密码安全至关重要。本文将分享如何创建强密码、管理密码以及保护您的在线账户安全的最佳实践。",
    date: "2024-01-12",
    category: "网络安全",
    readTime: "8分钟",
  },
  {
    slug: "qr-code-applications",
    title: "二维码的10种创意应用场景",
    excerpt: "二维码不仅仅是链接的载体，它在营销、教育、物流等领域有广泛应用。了解二维码的创意用法，为您的工作增添便利。",
    date: "2024-01-10",
    category: "技术应用",
    readTime: "6分钟",
  },
  {
    slug: "json-formatting-best-practices",
    title: "JSON格式化最佳实践",
    excerpt: "JSON是数据交换的标准格式。本文介绍JSON格式化的最佳实践，包括缩进、校验和常见错误处理。",
    date: "2024-01-08",
    category: "开发技巧",
    readTime: "7分钟",
  },
  {
    slug: "understanding-unix-timestamp",
    title: "深入理解Unix时间戳",
    excerpt: "Unix时间戳是计算机系统中常用的时间表示方式。本文将深入讲解时间戳的原理、应用场景以及常见转换方法。",
    date: "2024-01-05",
    category: "开发技巧",
    readTime: "6分钟",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">博客文章</h1>
        <p className="text-lg text-gray-600">
          分享实用的工具使用技巧、技术教程和行业资讯
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-gray-500 text-sm">{post.readTime}阅读</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              阅读更多 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
