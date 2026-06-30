"use client";

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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 Unix 秒级（10 位）和毫秒级（13 位）时间戳</li>
            <li>自动识别时间戳精度</li>
            <li>实时显示转换后的日期时间</li>
            <li>支持复制原始时间戳和转换结果</li>
            <li>根据浏览器时区自动转换本地时间</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中输入 Unix 时间戳（10 位秒级或 13 位毫秒级），工具会自动识别并转换为对应的日期时间。同时在下方显示 UTC 时间和本地时间。支持一键复制转换结果。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">时间戳转换示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: 1704067200 (秒级)
结果: 2024-01-01 08:00:00 (UTC+8 北京时间)

输入: 1704067200000 (毫秒级)
结果: 2024-01-01 08:00:00 (UTC+8 北京时间)`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">什么是 Unix 时间戳？</h3>
              <p className="text-gray-700">Unix 时间戳是从 1970 年 1 月 1 日（UTC）开始经过的秒数（10 位）或毫秒数（13 位）。它是计算机系统中常用的时间表示方式。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">时间戳和时间有什么区别？</h3>
              <p className="text-gray-700">时间戳是跨时区的绝对时间，而显示时间则取决于所在时区。同一个时间戳在不同时区下显示的时间不同。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">2038 年问题是什么？</h3>
              <p className="text-gray-700">使用 32 位整数存储的秒级时间戳会在 2038 年溢出。现代系统已改用 64 位整数或毫秒级时间戳解决此问题。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}
