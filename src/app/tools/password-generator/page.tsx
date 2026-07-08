import type { Metadata } from "next";
import PasswordGeneratorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "密码生成器 - 在线工具箱",
  description: "在线密码生成工具，生成安全随机强密码，支持自定义长度和字符。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "密码生成器 - 在线工具箱",
    description: "在线密码生成工具，生成安全随机强密码，支持自定义长度和字符。",
  },
};

export default function Page() {
  return (
    <>
      <PasswordGeneratorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
