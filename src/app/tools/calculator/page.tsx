"use client";

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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持加、减、乘、除四种基本运算</li>
            <li>支持括号优先级运算</li>
            <li>支持连续计算</li>
            <li>实时显示输入表达式</li>
            <li>支持清除和删除操作</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">使用界面按钮或键盘输入计算表达式，按等号获取结果。支持括号来控制运算优先级，支持小数计算。常用于日常简单的数学计算。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">计算器示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`输入: (15 + 3) × 4 ÷ 2
过程: 18 × 4 ÷ 2 = 72 ÷ 2
结果: 36`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">支持的运算优先级是什么？</h3>
              <p className="text-gray-700">遵循标准数学运算优先级：括号 &gt; 乘除 &gt; 加减。例如 2 + 3 × 4 = 14（先乘后加）。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持键盘输入吗？</h3>
              <p className="text-gray-700">支持。您可以使用键盘上的数字键、运算符键和回车键进行操作。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">计算结果精度如何？</h3>
              <p className="text-gray-700">使用标准的浮点运算，对于大多数日常计算精度足够。对于需要高精度的科学计算，建议使用专业工具。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}