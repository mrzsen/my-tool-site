import type { Metadata } from "next";
import JsonFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "JSON 格式化 - 在线工具箱",
  description: "在线JSON格式化工具，支持带注释的JSON格式化、压缩、校验，自动去除尾随逗号，多种缩进选择。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "JSON 格式化 - 在线工具箱",
    description: "在线JSON格式化工具，支持带注释的JSON格式化、压缩、校验，自动去除尾随逗号，多种缩进选择。",
  },
};

export default function Page() {
  return (
    <>
      <JsonFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
