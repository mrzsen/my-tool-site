"use client";

import Link from "next/link";

export default function ColorConverterGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
              技术教程
            </span>
            <span className="text-gray-500 text-sm">2026-06-30</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            颜色转换完全指南：RGB、HEX和HSL详解
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            颜色是Web设计中不可或缺的元素。本文将深入讲解RGB、HEX和HSL三种常见颜色格式的原理和转换方法，帮助您轻松应对颜色编码问题。
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">什么是颜色编码</h2>
          <p>
            在数字世界中，颜色通过数字编码来表示。不同的颜色编码方式适用于不同的场景。Web开发中最常用的三种颜色格式是RGB、HEX和HSL。理解它们的原理和转换关系，能够帮助前端开发者、设计师和数字内容创作者更高效地工作。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">RGB颜色格式</h2>
          <p>
            RGB（Red, Green, Blue）是最基础的色彩表示方式，通过红、绿、蓝三原色的混合来呈现颜色。每种原色的取值范围是0-255，通过不同比例的混合可以呈现超过1600万种颜色。
          </p>
          <p>
            例如，纯红色的RGB表示为 rgb(255, 0, 0)，纯绿色为 rgb(0, 255, 0)，纯蓝色为 rgb(0, 0, 255)。当三个值相等时，呈现为灰色：rgb(128, 128, 128) 就是中灰色。
          </p>
          <p>
            RGB格式直观地反映了显示器的发光原理，每个像素由红、绿、蓝三个子像素组成。但是在实际使用中，RGB对人类来说不够直观，很难通过数值直接推断出颜色的大致样子。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">HEX颜色格式</h2>
          <p>
            HEX格式使用十六进制数来表示颜色，格式为 #RRGGBB。其中 RR、GG、BB 分别对应RGB中的红、绿、蓝分量，取值范围是 00-FF（十六进制，对应十进制的0-255）。
          </p>
          <p>
            例如，纯红色的HEX表示为 #FF0000，纯绿色为 #00FF00，纯蓝色为 #0000FF。当每个分量的两位数字相同时，可以缩写为3位：如 #FF00AA 可以缩写为 #F0A。
          </p>
          <p>
            HEX格式是Web开发中使用最广泛的颜色表示方式。它比RGB更紧凑，在CSS中书写更简洁。HEX颜色还可以扩展为8位格式 #RRGGBBAA，其中AA表示透明度（Alpha通道）。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">HSL颜色格式</h2>
          <p>
            HSL（Hue, Saturation, Lightness）是一种更符合人类直觉的颜色模型。它将颜色分解为色相（Hue）、饱和度（Saturation）和明度（Lightness）三个维度，让颜色的调整变得更加直观。
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>色相（Hue）</strong>：取值0-360度，表示色环上的位置。0度为红色，120度为绿色，240度为蓝色</li>
            <li><strong>饱和度（Saturation）</strong>：取值0%-100%，表示颜色的纯度。0%为灰色，100%为最鲜艳</li>
            <li><strong>明度（Lightness）</strong>：取值0%-100%，表示颜色的亮度。0%为黑色，100%为白色</li>
          </ul>
          <p className="mt-4">
            HSL的主要优势是它可以直观地调整颜色的深浅和鲜艳程度。例如，如果想要一个更暗的蓝色，只需降低明度值即可，而不需要像RGB那样同时调整三个数值。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">颜色格式之间的转换</h2>
          <p>
            在实际工作中，我们经常需要在不同颜色格式之间进行转换。例如，设计师可能在设计稿中使用HEX颜色，但在代码中需要使用RGBA来实现透明度。这时就需要一个可靠的颜色转换工具。
          </p>
          <p>
            使用我们的<a href="/tools/color-converter" className="text-blue-600 hover:underline">在线颜色转换器</a>，您可以轻松在RGB、HEX和HSL三种格式之间自由转换。支持输入预览、一键复制，让颜色编码不再困扰您。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">进阶技巧</h2>
          <p>
            掌握颜色理论对于Web开发至关重要。以下是一些实用的进阶技巧：
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>色彩搭配</strong>：使用HSL的色相环可以轻松找到互补色（相差180度）和近似色（相差30度以内）</li>
            <li><strong>无障碍设计</strong>：确保文本颜色与背景颜色的对比度符合WCAG标准（至少4.5:1）</li>
            <li><strong>主题颜色</strong>：利用CSS变量和HSL可以轻松实现深色/浅色主题切换</li>
            <li><strong>透明度叠加</strong>：使用RGBA或HSLA可以实现半透明效果，让色彩叠加更丰富</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">常见问题解答</h2>
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="font-semibold text-gray-900">HEX颜色可以表示透明度吗？</h3>
              <p>可以。CSS Color Level 4 引入了8位HEX颜色格式 #RRGGBBAA，其中AA表示Alpha通道。例如 #FF000080 表示50%透明度的红色。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">RGB和HEX哪个性能更好？</h3>
              <p>在性能上没有明显差异。浏览器处理两种格式的效率几乎相同。选择哪种格式主要取决于团队规范和个人偏好。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么我的颜色在不同显示器上看起来不一样？</h3>
              <p>这是因为不同显示器的色域、亮度和校准设置不同。建议在设计时使用sRGB色域，这是Web标准色彩空间。</p>
            </div>
          </div>
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
