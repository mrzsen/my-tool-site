import type { Metadata } from "next";
import AesCryptTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "AES 加密 - 在线工具箱",
  description: "在线AES加密解密工具，支持ECB/CBC模式，PKCS5/PKCS7填充，多种密钥长度。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "AES 加密 - 在线工具箱",
    description: "在线AES加密解密工具，支持ECB/CBC模式，PKCS5/PKCS7填充，多种密钥长度。",
  },
};

export default function Page() {
  return (
    <>
      <AesCryptTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
