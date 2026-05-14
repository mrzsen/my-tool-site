"use client";

import Head from "next/head";
import { useState, useCallback } from "react";

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [result, setResult] = useState<{
    date: string;
    iso: string;
    utc: string;
    local: string;
    relative: string;
  } | null>(null);

  const convertTimestamp = useCallback(() => {
    let ts = Number(timestamp);
    if (isNaN(ts)) {
      alert("请输入有效的数字");
      return;
    }
    // 如果数字小于 10000000000，说明是秒，转换为毫秒
    if (ts < 10000000000) {
      ts = ts * 1000;
    }

    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      alert("无效的时间戳");
      return;
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let relative = "";
    if (diff > 0) {
      if (days > 0) relative = `${days}天前`;
      else if (hours > 0) relative = `${hours}小时前`;
      else if (minutes > 0) relative = `${minutes}分钟前`;
      else relative = `${seconds}秒前`;
    } else {
      if (days > 0) relative = `${days}天后`;
      else if (hours > 0) relative = `${hours}小时后`;
      else if (minutes > 0) relative = `${minutes}分钟后`;
      else relative = `${seconds}秒后`;
    }

    setResult({
      date: date.toLocaleString("zh-CN"),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toString(),
      relative,
    });
  }, [timestamp]);

  const convertDate = useCallback(() => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      alert("无效的日期格式");
      return;
    }

    setResult({
      date: date.toLocaleString("zh-CN"),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toString(),
      relative: "",
    });
  }, [dateString]);

  const getCurrentTimestamp = useCallback(() => {
    const now = Date.now();
    setTimestamp(String(Math.floor(now / 1000)));
    const date = new Date(now);
    setResult({
      date: date.toLocaleString("zh-CN"),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toString(),
      relative: "现在",
    });
  }, []);

  return (
    <Head>
      <title>时间戳转换工具</title>
      <meta name="description" content="在线Unix时间戳转换工具，支持时间戳与日期时间相互转换。" />
      <link rel="canonical" href="https://tool.wnsj.net/tools/timestamp-converter" />
    </Head>

    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">时间戳转换器</h1>
        <p className="text-gray-600">Unix时间戳与日期时间相互转换。</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unix 时间戳 (秒)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="例如: 1700000000"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={convertTimestamp}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              转换
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            或输入日期时间
          </label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={convertDate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              转换
            </button>
          </div>
        </div>

        <button
          onClick={getCurrentTimestamp}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          获取当前时间戳
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">转换结果</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">本地时间</span>
              <span className="font-mono text-sm">{result.date}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">ISO 格式</span>
              <span className="font-mono text-sm">{result.iso}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">UTC 时间</span>
              <span className="font-mono text-sm">{result.utc}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">本地字符串</span>
              <span className="font-mono text-sm">{result.local}</span>
            </div>
            {result.relative && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">相对时间</span>
                <span className="font-semibold text-blue-600">{result.relative}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
