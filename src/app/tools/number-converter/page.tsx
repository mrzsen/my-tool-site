import type { Metadata } from "next";
import NumberConverterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "进制转换 - 在线工具箱",
  description: "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "进制转换 - 在线工具箱",
    description: "在线进制转换工具，支持二进制、八进制、十进制、十六进制互转。",
  },
};

export default function Page() {
  return (
    <>
      <NumberConverterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
