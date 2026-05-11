"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#2563EB"/>
                <path d="M10 16H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14 12L10 16L14 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 12L22 16L18 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className="text-xl font-bold text-blue-600">tool</span>
                <span className="text-xl font-medium text-gray-400">.wnsj.net</span>
              </div>
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
