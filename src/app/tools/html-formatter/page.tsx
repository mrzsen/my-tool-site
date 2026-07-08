import type { Metadata } from "next";
import HtmlFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "HTML 格式化 - 在线工具箱",
  description: "在线HTML格式化工具，支持HTML代码美化、压缩，智能识别块级元素和内联元素。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "HTML 格式化 - 在线工具箱",
    description: "在线HTML格式化工具，支持HTML代码美化、压缩，智能识别块级元素和内联元素。",
  },
};

export default function Page() {
  return (
    <>
      <HtmlFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
