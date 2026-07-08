import type { Metadata } from "next";
import RegexTesterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "正则表达式测试 - 在线工具箱",
  description: "在线正则表达式测试工具，支持实时匹配替换，显示匹配详情和分组。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "正则表达式测试 - 在线工具箱",
    description: "在线正则表达式测试工具，支持实时匹配替换，显示匹配详情和分组。",
  },
};

export default function Page() {
  return (
    <>
      <RegexTesterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
