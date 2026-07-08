import type { Metadata } from "next";
import QRGeneratorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "二维码生成器 - 在线工具箱",
  description: "在线二维码生成工具，支持将文本、网址等信息生成二维码图片下载。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "二维码生成器 - 在线工具箱",
    description: "在线二维码生成工具，支持将文本、网址等信息生成二维码图片下载。",
  },
};

export default function Page() {
  return (
    <>
      <QRGeneratorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
