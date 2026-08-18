import type { Metadata } from "next";
import TextSummarizerTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "文本摘要生成 - 在线工具箱",
  description:
    "在线文本摘要与关键词提取工具，自动分析文章要点，提取核心关键词，支持中英文，纯本地处理。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "文本摘要生成 - 在线工具箱",
    description:
      "在线文本摘要与关键词提取工具，自动分析文章要点，提取核心关键词，支持中英文，纯本地处理。",
  },
};

export default function Page() {
  return (
    <>
      <TextSummarizerTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}