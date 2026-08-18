import type { Metadata } from "next";
import TextPolisherTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "文本润色助手 - 在线工具箱",
  description:
    "在线文本润色工具，自动检查并优化文案，支持去重空格、统一标点、修复常见错误、精简冗余表达，提升文本质量。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "文本润色助手 - 在线工具箱",
    description:
      "在线文本润色工具，自动检查并优化文案，支持去重空格、统一标点、修复常见错误、精简冗余表达，提升文本质量。",
  },
};

export default function Page() {
  return (
    <>
      <TextPolisherTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}