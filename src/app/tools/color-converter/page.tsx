import type { Metadata } from "next";
import ColorConverterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "颜色转换 - 在线工具箱",
  description: "在线颜色转换工具，支持RGB、HEX、HSL颜色格式之间相互转换。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "颜色转换 - 在线工具箱",
    description: "在线颜色转换工具，支持RGB、HEX、HSL颜色格式之间相互转换。",
  },
};

export default function Page() {
  return (
    <>
      <ColorConverterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
