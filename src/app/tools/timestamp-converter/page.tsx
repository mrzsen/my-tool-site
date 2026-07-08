import type { Metadata } from "next";
import TimestampConverterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "时间戳转换 - 在线工具箱",
  description: "在线Unix时间戳转换工具，支持秒级毫秒级时间戳与日期时间互转。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "时间戳转换 - 在线工具箱",
    description: "在线Unix时间戳转换工具，支持秒级毫秒级时间戳与日期时间互转。",
  },
};

export default function Page() {
  return (
    <>
      <TimestampConverterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
