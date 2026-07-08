import type { Metadata } from "next";
import EncryptHashTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "加密/哈希 - 在线工具箱",
  description: "在线加密哈希工具合集，支持MD5、SHA系列、AES等多种加密算法。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "加密/哈希 - 在线工具箱",
    description: "在线加密哈希工具合集，支持MD5、SHA系列、AES等多种加密算法。",
  },
};

export default function Page() {
  return (
    <>
      <EncryptHashTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
