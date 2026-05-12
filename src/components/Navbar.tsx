"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              <div>
                <span className="text-lg font-bold text-white">在线工具箱</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition text-sm">
              首页
            </Link>
            <Link href="/tools/json-formatter" className="text-gray-300 hover:text-white transition text-sm">
              工具
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition text-sm">
              博客
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition text-sm">
              隐私政策
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition text-sm">
              关于
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
