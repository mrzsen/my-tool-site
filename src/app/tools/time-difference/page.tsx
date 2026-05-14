"use client";

import Head from "next/head";
import { useState, useCallback } from "react";

export default function TimeDifferencePage() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("00:00:00");
  const [result, setResult] = useState<{
    totalDays?: number;
    totalHours?: number;
    totalMinutes?: number;
    totalSeconds?: number;
    weekday1?: string;
    weekday2?: string;
  } | null>(null);
  const [error, setError] = useState("");

  const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  const calculate = useCallback(() => {
    setError("");
    if (!startDate || !endDate) {
      setError("请选择完整的日期");
      setResult(null);
      return;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    const diffMs = end.getTime() - start.getTime();
    const diffSec = diffMs / 1000;
    const diffMin = diffSec / 60;
    const diffHour = diffMin / 60;
    const diffDay = diffHour / 24;

    setResult({
      totalDays: Math.floor(diffDay),
      totalHours: Math.floor(diffHour),
      totalMinutes: Math.floor(diffMin),
      totalSeconds: Math.floor(diffSec),
      weekday1: WEEKDAYS[start.getDay()],
      weekday2: WEEKDAYS[end.getDay()],
    });
  }, [startDate, startTime, endDate, endTime]);

  const setToday = useCallback(() => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const timeStr = today.toTimeString().split(" ")[0].slice(0, 8);
    setEndDate(dateStr);
    setEndTime(timeStr);
  }, []);

  const clearAll = useCallback(() => {
    setStartDate("");
    setStartTime("00:00:00");
    setEndDate("");
    setEndTime("00:00:00");
    setResult(null);
    setError("");
  }, []);

  return (
    <Head>
      <title>时间差计算器</title>
      <meta name="description" content="在线时间差计算工具，计算两个日期时间之间的天数、小时、分钟、秒数。" />
      <link rel="canonical" href="https://tool.wnsj.net/tools/time-difference" />
    </Head>

    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          时间差计算器
        </h1>
        <p className="text-gray-600">
          计算两个日期/时间之间的时间差，支持天、时、分、秒。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              开始日期
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
            {result && result.weekday1 && (
              <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {result.weekday1}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              结束日期
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
            <button
              onClick={setToday}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              使用当前时间
            </button>
            {result && result.weekday2 && (
              <span className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {result.weekday2}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            计算时间差
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            清空
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">计算结果</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.totalDays}</div>
              <div className="text-sm text-gray-600">天</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.totalHours}</div>
              <div className="text-sm text-gray-600">小时</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{result.totalMinutes}</div>
              <div className="text-sm text-gray-600">分钟</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{result.totalSeconds}</div>
              <div className="text-sm text-gray-600">秒</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用场景
        </h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>计算倒计时：距离目标日期还有多少天</li>
          <li>计算间隔：两个日期之间相隔的时间</li>
          <li>项目管理：计算任务耗时</li>
          <li>纪念日：计算相识/结婚/生日等纪念</li>
        </ul>
      </div>
    </div>
  );
}