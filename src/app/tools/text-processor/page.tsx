import type { Metadata } from "next";
import TextProcessorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "文本处理 - 在线工具箱",
  description: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种处理。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "文本处理 - 在线工具箱",
    description: "在线文本处理工具，支持去重、排序、去空格、大小写转换等多种处理。",
  },
};

export default function Page() {
  return (
    <>
      <TextProcessorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
