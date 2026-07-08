import type { Metadata } from "next";
import JsFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "JS 格式化 - 在线工具箱",
  description: "在线JavaScript格式化工具，支持JS代码美化、压缩、注释移除，智能缩进。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "JS 格式化 - 在线工具箱",
    description: "在线JavaScript格式化工具，支持JS代码美化、压缩、注释移除，智能缩进。",
  },
};

export default function Page() {
  return (
    <>
      <JsFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
