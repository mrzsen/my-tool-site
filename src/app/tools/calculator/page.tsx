"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "在线计算器 | 在线工具箱",
  description: "简洁实用的在线计算器，支持加减乘除基本数学运算。",
  alternates: {
    canonical: "https://tool.wnsj.net/tools/calculator"
  }
};

import { useState, useCallback } from "react";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleNumber = useCallback((num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  }, []);

  const handleOperator = useCallback((op: string) => {
    setExpression((prev) => prev + display + " " + op + " ");
    setLastResult(parseFloat(display));
    setDisplay("0");
  }, [display]);

  const calculate = useCallback(() => {
    try {
      const fullExpression = expression + display;
      // 安全计算：只允许数字和基本运算符
      const sanitized = fullExpression.replace(/[^0-9+\-*/().\s]/g, "");
      const result = Function('"use strict"; return (' + sanitized + ")")();
      setDisplay(String(result));
      setExpression("");
      setLastResult(result);
    } catch {
      setDisplay("错误");
      setExpression("");
    }
  }, [display, expression]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setLastResult(null);
  }, []);

  const backspace = useCallback(() => {
    setDisplay((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setDisplay((prev) => {
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  }, []);

  const handlePercent = useCallback(() => {
    setDisplay((prev) => String(parseFloat(prev) / 100));
  }, []);

  const handleNegate = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "0") return prev;
      if (prev.startsWith("-")) return prev.slice(1);
      return "-" + prev;
    });
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          在线计算器
        </h1>
        <p className="text-gray-600">
          基础计算器，支持加、减、乘、除运算。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* 显示屏 */}
        <div className="p-6">
          {expression && (
            <div className="text-sm text-gray-400 text-right mb-2 font-mono break-all min-h-[20px]">
              {expression}
            </div>
          )}
          <div className="text-right text-4xl font-bold text-gray-900 font-mono break-all min-h-[60px]">
            {display}
          </div>
        </div>

        {/* 按钮 */}
        <div className="grid grid-cols-4 gap-2 p-4">
          {/* 第一行 */}
          <button
            onClick={clearAll}
            className="p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            AC
          </button>
          <button
            onClick={() => setDisplay("0")}
            className="p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            C
          </button>
          <button
            onClick={backspace}
            className="p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="p-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            ÷
          </button>

          {/* 第二行 */}
          {[7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(String(n))}
              className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOperator("*")}
            className="p-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            ×
          </button>

          {/* 第三行 */}
          {[4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(String(n))}
              className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOperator("-")}
            className="p-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            −
          </button>

          {/* 第四行 */}
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(String(n))}
              className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOperator("+")}
            className="p-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            +
          </button>

          {/* 第五行 */}
          <button
            onClick={handleNegate}
            className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            ±
          </button>
          <button
            onClick={() => handleNumber("0")}
            className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors col-span-1"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="p-4 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            =
          </button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">使用说明</h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>点击数字按钮输入数字</li>
          <li>点击运算符选择运算类型</li>
          <li>点击 "=" 计算结果</li>
          <li>AC 清除所有输入，C 清除当前输入</li>
          <li>← 退格删除最后一位</li>
          <li>± 切换正负号</li>
        </ul>
      </div>
    </div>
  );
}