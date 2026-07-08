import type { Metadata } from "next";
import Base64Tool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "Base64 编解码 - 在线工具箱",
  description: "在线Base64编解码工具，支持文本和文件的Base64编码解码，一键复制。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "Base64 编解码 - 在线工具箱",
    description: "在线Base64编解码工具，支持文本和文件的Base64编码解码，一键复制。",
  },
};

export default function Page() {
  return (
    <>
      <Base64Tool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
