"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#2563EB"/>
                <path d="M10 16H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14 12L10 16L14 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 12L22 16L18 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className="text-xl font-bold text-white">在线工具箱</span>
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
