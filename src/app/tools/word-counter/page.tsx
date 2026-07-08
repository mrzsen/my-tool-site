import type { Metadata } from "next";
import WordCounterTool from "./tool";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  title: "字数统计 - 在线工具箱",
  description: "在线字数统计工具，实时统计字符数、单词数、段落数、行数等信息。",
  alternates: { canonical: "./" },
  openGraph: {
    title: "字数统计 - 在线工具箱",
    description: "在线字数统计工具，实时统计字符数、单词数、段落数、行数等信息。",
  },
};

export default function Page() {
  return (
    <>
      <WordCounterTool />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AdSenseSlot slot="7230443707" style={{ minHeight: "90px" }} />
      </div>
    </>
  );
}
