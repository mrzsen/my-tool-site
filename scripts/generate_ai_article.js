#!/usr/bin/env node

/**
 * Generate AI article from RSS feeds and create a blog post.
 * Runs in GitHub Actions daily to fetch AI news and publish rewritten articles.
 * Uses RSSHub for reliable RSS feeds.
 */

// RSS sources using RSSHub proxy for reliability
const RSS_FEEDS = [
  // OpenAI blog via RSSHub
  "https://rsshub.app/openai/blog",
  // HuggingFace blog via RSSHub
  "https://rsshub.app/huggingface/blog",
  // Google AI blog via RSSHub
  "https://rsshub.app/google/tech-ai",
  // TechCrunch AI
  "https://rsshub.app/techcrunch/ai",
  // The Verge AI
  "https://rsshub.app/theverge/ai-artificial-intelligence",
  // MIT Technology Review AI
  "https://rsshub.app/mitreview/ai",
  // Wired AI
  "https://rsshub.app/wired/tag/artificial-intelligence",
];

const BLOG_DIR = "src/app/blog";
const BLOG_PAGE = "src/app/blog/page.tsx";

const CATEGORIES = ["AI资讯", "技术前沿", "行业动态", "开发技巧"];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sanitizeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 60);
}

function parseRSS(xmlText) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const item = match[1];
    const title = item.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
    const link = item.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ?? "";
    const pubDate =
      item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() ?? "";
    const description =
      item.match(/<description>([\s\S]*?)<\/description>/i)?.[1]?.trim() ?? "";
    const contentSnippet =
      item.match(
        /<content:encoded>([\s\S]*?)<\/content:encoded>/i
      )?.[1]?.trim() ??
      item.match(/<description>([\s\S]*?)<\/description>/i)?.[1]?.trim() ??
      "";

    if (title) {
      items.push({ title, link, pubDate, description, contentSnippet });
    }
  }
  return items;
}

async function fetchRSS(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    const text = await res.text();
    const items = parseRSS(text);
    return items.length > 0 ? items : null;
  } catch {
    return null;
  }
}

async function fetchAndSelectArticle() {
  const allArticles = [];

  for (const feed of RSS_FEEDS) {
    const items = await fetchRSS(feed);
    if (items) {
      allArticles.push(...items);
    }
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 300));
  }

  if (allArticles.length === 0) {
    console.log("No articles found from any RSS feed");
    return null;
  }

  // Filter for AI-related articles
  const aiKeywords = [
    "ai",
    "artificial intelligence",
    "machine learning",
    "llm",
    "gpt",
    "deep learning",
    "neural",
    "transformer",
    "generative",
    "nlp",
    "chatgpt",
    "openai",
    "anthropic",
    "gemini",
    "claude",
  ];

  const aiArticles = allArticles.filter(
    (a) =>
      aiKeywords.some((kw) => a.title.toLowerCase().includes(kw)) ||
      aiKeywords.some((kw) => a.description.toLowerCase().includes(kw))
  );

  // Sort by date descending
  const sorted = aiArticles.length > 0 ? aiArticles : allArticles;
  sorted.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return sorted[0];
}

async function rewriteArticle(article) {
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    console.log("HF_TOKEN not set, using template-based rewrite");
    return generateFromTemplate(article);
  }

  const model = "Qwen/Qwen2-7B-Instruct";
  const prompt = `请将以下英文AI技术文章改写为一篇高质量的中文技术博客文章。要求：
1. 标题需要吸引人且准确反映内容
2. 正文需包含：背景介绍、核心内容详解、实际应用场景、未来展望
3. 语言流畅自然，符合中文技术博客风格
4. 适当加入原创分析和见解
5. 字数要求800-1200字
6. 不要输出任何前缀、说明或额外文字，直接输出正文

原文标题：${article.title}
原文摘要：${article.description}
原文链接：${article.link}

请直接输出完整的中文博客文章内容。`;

  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 1500, temperature: 0.7 },
        }),
        signal: AbortSignal.timeout(120000),
      }
    );

    if (res.status === 503) {
      console.log("Model loading, falling back to template");
      return generateFromTemplate(article);
    }

    if (!res.ok) {
      console.log(`HF API error: ${res.status}`);
      return generateFromTemplate(article);
    }

    const data = await res.json();
    const content =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : data?.generated_text ?? null;

    if (!content || content.length < 100) {
      return generateFromTemplate(article);
    }

    return { title: article.title, content };
  } catch (e) {
    console.log(`HF API failed: ${e.message}`);
    return generateFromTemplate(article);
  }
}

function generateFromTemplate(article) {
  const date = new Date().toISOString().split("T")[0];
  const category = randomFrom(CATEGORIES);
  const slug = sanitizeSlug(article.title);
  return {
    title: article.title,
    content: `
<h2>背景介绍</h2>
<p>${article.description}</p>

<h2>核心内容</h2>
<p>${article.contentSnippet.substring(0, 500)}</p>

<h2>实际应用</h2>
<p>这项技术在实际开发中有广泛的应用场景。开发者可以利用相关技术提升工作效率，优化代码质量，并推动技术创新。随着技术的不断发展，我们期待看到更多创新的应用场景。</p>

<h2>未来展望</h2>
<p>AI技术正在快速发展，未来将有更多令人期待的新突破。我们将持续关注这一领域的最新动态，并为大家带来更多有价值的技术内容。</p>
`,
    date,
    category,
    slug,
  };
}

function createBlogPost(articleData) {
  const slug = articleData.slug || sanitizeSlug(articleData.title);
  const date = articleData.date || new Date().toISOString().split("T")[0];
  const category = articleData.category || randomFrom(CATEGORIES);
  const title = articleData.title.replace(/"/g, "");
  const content = articleData.content;
  const description = (articleData.description || title).replace(/"/g, "");

  const postContent = `import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${title} - 在线工具箱",
  description: "${description} - 技术前沿资讯与深度解析。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "${title} - 在线工具箱",
    description: "${description} - 技术前沿资讯与深度解析。",
  },
};

export default function BlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              ${category}
            </span>
            <span className="text-gray-500 text-sm">${date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ${title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            ${description}
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: \`${content}\` }} />
      </article>

      <div className="mt-8 flex justify-between items-center">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
          ← 返回博客列表
        </Link>
      </div>
    </div>
  );
}
`;

  const postPath = `${BLOG_DIR}/${slug}/page.tsx`;
  return { postPath, postContent, slug, title, date, category, description };
}

function updateBlogPage(newPost) {
  const fs = require("fs");
  const blogPagePath = BLOG_PAGE;

  if (!fs.existsSync(blogPagePath)) return;

  let blogContent = fs.readFileSync(blogPagePath, "utf-8");

  const newPostEntry = `  {
    slug: "${newPost.slug}",
    title: "${newPost.title}",
    excerpt: "${newPost.description}",
    date: "${newPost.date}",
    category: "${newPost.category}",
    readTime: "5分钟",
  },`;

  const postsStart = blogContent.indexOf("const posts: Post[] = [");
  if (postsStart !== -1) {
    const insertPos = blogContent.indexOf("[", postsStart) + 1;
    blogContent =
      blogContent.slice(0, insertPos) +
      "\n" +
      newPostEntry +
      "\n" +
      blogContent.slice(insertPos);

    blogContent = blogContent.replace(
      /分享实用的工具使用技巧、技术教程和行业资讯/,
      "分享前沿AI技术资讯、深度技术解析和实用开发技巧"
    );
  }

  fs.writeFileSync(blogPagePath, blogContent, "utf-8");
  console.log("Updated blog page with new post");
}

async function main() {
  console.log("Starting AI article generation...");

  // Step 1: Fetch and select article
  const article = await fetchAndSelectArticle();
  if (!article) {
    console.log("No articles found from RSS feeds");
    process.exit(1);
  }
  console.log(`Selected article: ${article.title}`);
  console.log(`Source: ${article.link}`);

  // Step 2: Rewrite article
  const rewritten = await rewriteArticle(article);
  console.log(`Rewritten title: ${rewritten.title}`);

  // Step 3: Create blog post
  const post = createBlogPost({
    ...rewritten,
    description: article.description || article.title,
    slug: sanitizeSlug(article.title),
  });

  // Check if post already exists
  const fs = require("fs");
  if (fs.existsSync(post.postPath)) {
    console.log("Article already exists, skipping");
    process.exit(0);
  }

  // Create directory and write file
  const dirPath = require("path").dirname(post.postPath);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(post.postPath, post.postContent, "utf-8");
  console.log(`Created blog post: ${post.postPath}`);

  // Step 4: Update blog page
  updateBlogPage(post);

  console.log("AI article generation complete!");
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
