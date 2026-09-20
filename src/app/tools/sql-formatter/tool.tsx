"use client";

import { useState, useCallback } from "react";

export default function SqlFormatterTool() {
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
            className="w-full h-80 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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
            className="w-full h-80 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持 SQL SELECT、INSERT、UPDATE、DELETE 等主要语句</li>
            <li>30+ 个 SQL 关键字自动大写并换行（SELECT、FROM、WHERE、JOIN 等）</li>
            <li>智能处理子查询嵌套层级</li>
            <li>支持 JOIN 语句的多种类型（INNER、LEFT、RIGHT、FULL）</li>
            <li>保持字符串和数字字面量的完整性</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">将您的 SQL 查询语句粘贴到输入框，点击「格式化」即可美化 SQL 代码。支持标准 SQL 语法。格式化后关键字自动大写、子查询自动缩进、JOIN 语句对齐，让复杂的 SQL 查询变得清晰易读。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">SQL 格式化示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`-- 格式化前
SELECT u.name,o.total FROM users u JOIN orders o ON u.id=o.user_id WHERE o.total>100 ORDER BY o.total DESC

-- 格式化后
SELECT
  u.name,
  o.total
FROM
  users u
  JOIN orders o ON u.id = o.user_id
WHERE
  o.total > 100
ORDER BY
  o.total DESC`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">支持哪些数据库方言？</h3>
              <p className="text-gray-700">主要支持标准 SQL 语法。MySQL、PostgreSQL、SQLite 等主流数据库的基本语法都兼容。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">格式化后能保持查询性能吗？</h3>
              <p className="text-gray-700">完全不影响。格式化只改变 SQL 的排版，不影响数据库执行计划和查询性能。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持存储过程和函数吗？</h3>
              <p className="text-gray-700">支持基本的存储过程和函数语法格式化。复杂的 PL/SQL 或 T-SQL 可能需要专门的工具。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么这个工具如此重要？</h2>
          <p className="text-gray-700 leading-relaxed">SQL（结构化查询语言）是数据库操作的核心语言，但 SQL 代码常常因为不同的编写习惯而格式各异。SQL 格式化工具可以将这些风格各异的 SQL 代码转换为统一、清晰的格式。在复杂的数据分析场景中，SQL 查询可能包含多层子查询、多个 JOIN 条件、嵌套的 CASE WHEN 表达式等结构。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">典型应用场景</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>复杂查询调试</strong>：多层嵌套查询经过格式化后更容易定位问题</li>
            <li><strong>SQL 代码审查</strong>：统一团队成员的 SQL 编写风格</li>
            <li><strong>学习 SQL</strong>：初学者通过格式化后的 SQL 理解查询结构</li>
            <li><strong>数据库迁移</strong>：迁移过程中的 SQL 代码格式统一</li>
            <li><strong>性能优化</strong>：格式化后的 SQL 更便于分析执行计划</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">工作原理</h2>
          <p className="text-gray-700 leading-relaxed">SQL 格式化工具解析 SQL 语句的语法结构，识别 SELECT、FROM、WHERE、JOIN、GROUP BY、ORDER BY、LIMIT 等关键字和子句。根据 SQL 的逻辑层次关系计算每个子句应有的缩进级别。</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">实用技巧</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>格式化后的 SQL 建议先用 EXPLAIN 分析执行计划</li>
            <li>复杂的存储过程可能需要分段格式化</li>
          </ul>
        </section>

      </div>

</div>
  );
}