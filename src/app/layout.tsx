import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "在线工具箱 - 免费在线工具集合",
    template: "%s | 在线工具箱",
  },
  description:
    "提供免费的在线工具集合，包括JSON格式化、加密解密、编码转换、文本处理等23款实用工具。",
  keywords:
    "在线工具, JSON格式化, Base64, URL编解码, 加密解密, MD5, SHA, AES, 颜色转换, 计算器, 二维码, 正则表达式, 文本处理, 工具箱",
  authors: [{ name: "在线工具箱" }],
  openGraph: {
    title: "在线工具箱 - 免费在线工具集合",
    description:
      "提供免费的在线工具集合，包括JSON格式化、加密解密、编码转换、文本处理等23款实用工具。",
    url: "https://tool.wnsj.net",
    siteName: "在线工具箱",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9418499386631481"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-full flex flex-col bg-gray-50`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}