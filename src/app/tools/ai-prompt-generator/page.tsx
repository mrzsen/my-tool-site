import type { Metadata } from "next";
import AiPromptGeneratorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "AI 提示词生成器 - 在线工具箱",
  description:
    "在线 AI 提示词（Prompt）生成工具，输入需求即可自动生成高质量的中文提示词模板，支持角色设定、指令优化、场景适配。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "AI 提示词生成器 - 在线工具箱",
    description:
      "在线 AI 提示词（Prompt）生成工具，输入需求即可自动生成高质量的中文提示词模板，支持角色设定、指令优化、场景适配。",
  },
};

export default function Page() {
  return (
    <>
      <AiPromptGeneratorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}