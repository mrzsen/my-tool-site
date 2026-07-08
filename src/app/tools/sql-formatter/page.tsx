import type { Metadata } from "next";
import SqlFormatterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "SQL 格式化 - 在线工具箱",
  description: "在线SQL格式化工具，支持SQL语句美化、压缩，关键字自动大写和换行。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "SQL 格式化 - 在线工具箱",
    description: "在线SQL格式化工具，支持SQL语句美化、压缩，关键字自动大写和换行。",
  },
};

export default function Page() {
  return (
    <>
      <SqlFormatterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
