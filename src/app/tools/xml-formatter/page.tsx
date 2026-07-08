import type { Metadata } from "next";
import XmlFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "XML 格式化 - 在线工具箱",
  description: "在线XML格式化工具，支持XML数据美化、压缩、命名空间保留，智能缩进XML标签层级。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "XML 格式化 - 在线工具箱",
    description: "在线XML格式化工具，支持XML数据美化、压缩、命名空间保留，智能缩进XML标签层级。",
  },
};

export default function Page() {
  return (
    <>
      <XmlFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
