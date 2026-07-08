import type { Metadata } from "next";
import CaseConverterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "大小写转换 - 在线工具箱",
  description: "在线文本大小写转换工具，支持大写、小写、首字母大写、驼峰命名转换。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "大小写转换 - 在线工具箱",
    description: "在线文本大小写转换工具，支持大写、小写、首字母大写、驼峰命名转换。",
  },
};

export default function Page() {
  return (
    <>
      <CaseConverterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
