import type { Metadata } from "next";
import UrlEncodeDecodeTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "URL 编解码 - 在线工具箱",
  description: "在线URL编解码工具，支持URL特殊字符和中文的编码解码，双向互转。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "URL 编解码 - 在线工具箱",
    description: "在线URL编解码工具，支持URL特殊字符和中文的编码解码，双向互转。",
  },
};

export default function Page() {
  return (
    <>
      <UrlEncodeDecodeTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
