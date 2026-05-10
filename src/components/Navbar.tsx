"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
              🔧 实用工具箱
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              首页
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
              博客
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
