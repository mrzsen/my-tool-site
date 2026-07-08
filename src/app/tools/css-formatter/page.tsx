import type { Metadata } from "next";
import CssFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "CSS 格式化 - 在线工具箱",
  description: "在线CSS格式化工具，支持CSS样式表美化、压缩，属性排序和格式化。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "CSS 格式化 - 在线工具箱",
    description: "在线CSS格式化工具，支持CSS样式表美化、压缩，属性排序和格式化。",
  },
};

export default function Page() {
  return (
    <>
      <CssFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
