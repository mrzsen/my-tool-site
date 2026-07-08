import type { Metadata } from "next";
import CalculatorTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "在线计算器 - 在线工具箱",
  description: "在线计算器工具，支持加减乘除、括号运算和连续计算。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "在线计算器 - 在线工具箱",
    description: "在线计算器工具，支持加减乘除、括号运算和连续计算。",
  },
};

export default function Page() {
  return (
    <>
      <CalculatorTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
