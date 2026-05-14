"use client";

import Head from "next/head";
import { useState, useCallback } from "react";

export default function SqlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatSql = useCallback(() => {
    try {
      let sql = input.trim();
      if (!sql) {
        setError("请输入 SQL 语句");
        setOutput("");
        return;
      }

      const keywords = [
        "SELECT",
        "FROM",
        "WHERE",
        "AND",
        "OR",
        "ORDER BY",
        "GROUP BY",
        "HAVING",
        "JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "INNER JOIN",
        "ON",
        "INSERT INTO",
        "VALUES",
        "UPDATE",
        "SET",
        "DELETE FROM",
        "CREATE TABLE",
        "ALTER TABLE",
        "DROP TABLE",
        "UNION",
        "LIMIT",
        "OFFSET",
        "AS",
        "IN",
        "NOT IN",
        "BETWEEN",
        "LIKE",
        "IS NULL",
        "IS NOT NULL",
      ];

      for (const keyword of keywords) {
        const regex = new RegExp("\\b" + keyword + "\\b", "gi");
        sql = sql.replace(regex, "\n" + keyword);
      }

      let formatted = "";
      let indent = 0;
      const padding = "  ";

      const lines = sql.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        formatted += padding.repeat(indent) + trimmed + "\n";

        if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(trimmed)) {
          indent++;
        } else if (/^(FROM|WHERE|LIMIT|OFFSET|UNION)/i.test(trimmed)) {
          indent = Math.max(0, indent - 1);
        }
      }

      setOutput(formatted.trim());
      setError("");
    } catch (e) {
      setError("格式化失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const compressSql = useCallback(() => {
    try {
      const compressed = input
        .replace(/\s+/g, " ")
        .replace(/\s*([,;()])\s*/g, "$1")
        .trim();
      setOutput(compressed);
      setError("");
    } catch (e) {
      setError("压缩失败: " + (e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <Head>
      <title>SQL 格式化工具</title>
      <meta name="description" content="在线SQL语句格式化工具，支持SQL美化和压缩。" />
      <link rel="canonical" href="https://tool.wnsj.net/tools/sql-formatter" />
    </Head>

    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          SQL 格式化/压缩
        </h1>
        <p className="text-gray-600">
          格式化 SQL 语句使其更易读，或压缩 SQL 以减小体积
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 SQL
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE id = 1"
            className="w-full h-80 p-3 border border-gray-300 rounded-lg resize focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输出结果
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="结果将在这里显示..."
            className="w-full h-80 p-3 border border-gray-300 rounded-lg bg-gray-50 resize font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={formatSql}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📝 格式化
        </button>
        <button
          onClick={compressSql}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📦 压缩
        </button>
        <button
          onClick={copyToClipboard}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          复制
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          清空
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          使用说明
        </h3>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>在左侧输入框中输入 SQL 语句</li>
          <li>点击「格式化」美化关键字缩进</li>
          <li>点击「压缩」去除空白</li>
          <li>支持常见 SQL 关键字自动换行</li>
        </ul>
      </div>
    </div>
  );
}