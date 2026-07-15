"use client";

import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              开发技巧
            </span>
            <span className="text-gray-500 text-sm">2024-01-20</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            数据格式化最佳实践：JSON、XML、HTML完全指南
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            掌握JSON、XML、HTML、CSS、JavaScript、SQL等常用数据格式的格式化技巧，让代码更易读。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: `          <h2>为什么代码格式化很重要</h2>
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
<p>SQL语句的格式化对于数据库查询的维护和调试至关重要。良好的SQL格式化应该使用关键字大写（SELECT、FROM、WHERE等），每个子句单独一行，合理缩进，复杂的JOIN操作清晰对齐，子查询明确缩进。格式化良好的SQL不仅能提高可读性，还能帮助发现潜在的查询逻辑问题。</p>` }} />

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; 返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}
