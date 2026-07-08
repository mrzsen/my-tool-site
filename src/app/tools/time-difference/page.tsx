import type { Metadata } from "next";
import TimeDifferenceTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "时间差计算 - 在线工具箱",
  description: "在线时间差计算工具，计算两个日期时间之间的精确时间差。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "时间差计算 - 在线工具箱",
    description: "在线时间差计算工具，计算两个日期时间之间的精确时间差。",
  },
};

export default function Page() {
  return (
    <>
      <TimeDifferenceTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
