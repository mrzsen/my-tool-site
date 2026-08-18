import type { Metadata } from "next";
import AiTranslatorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "AI 翻译/改写 - 在线工具箱",
  description:
    "在线 AI 翻译与文本改写工具，基于 HuggingFace 开源大模型，支持中英互译、风格改写、简化润色，免费无需密钥。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "AI 翻译/改写 - 在线工具箱",
    description:
      "在线 AI 翻译与文本改写工具，基于 HuggingFace 开源大模型，支持中英互译、风格改写、简化润色，免费无需密钥。",
  },
};

export default function Page() {
  return (
    <>
      <AiTranslatorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}