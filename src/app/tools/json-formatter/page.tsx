"use client";

import Head from "next/head";
import { useState, useCallback, useRef, useEffect } from "react";

function stripJsonComments(json: string): string {
  return json
    .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
      g ? "" : m
    )
    .replace(/,(?=\s*[}\]])/g, "");
}

function sortObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObject(obj[key]);
        return result;
      }, {} as any);
  }
  return obj;
}

function escapeJson(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function unescapeJson(str: string): string {
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

interface TreeNodeProps {
  data: any;
  level?: number;
}

function TreeNode({ data, level = 0 }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const isObj = data !== null && typeof data === "object";
  const keys = isObj ? Object.keys(data) : [];
  const isArray = Array.isArray(data);

  if (!isObj) {
    const color =
      typeof data === "string"
        ? "text-green-600"
        : typeof data === "number"
        ? "text-blue-600"
        : typeof data === "boolean"
        ? "text-purple-600"
        : "text-gray-400";
    return (
      <Head>
        <title>JSON 格式化工具</title>
        <meta name="description" content="在线JSON格式化、压缩、校验工具，支持带注释JSON、键排序、树形视图、路径查询、转义等。" />
        <link rel="canonical" href="https://tool.wnsj.net/tools/json-formatter" />
      </Head>

      <span className={color}>
        {typeof data === "string" ? `"${data}"` : String(data)}
      </span>
    );
  }

  if (keys.length === 0) {
    return <span className="text-gray-400">{isArray ? "[]" : "{}"}</span>;
  }

  return (
    <div>
      <span
        className="cursor-pointer select-none text-gray-500 hover:text-gray-700"
        onClick={() => setExpanded(!expanded)}
      >
        {isArray ? (
          expanded ? "▼ [" : "▶ ["
        ) : expanded ? (
          "▼ {" : "▶ {"
        )}{" "}
        <span className="text-xs text-gray-400">{keys.length} items</span>
      </span>
      {expanded && (
        <div className="ml-6 border-l border-gray-200 pl-2">
          {keys.map((key) => (
            <div key={key} className="my-0.5">
              <span className="text-indigo-600 font-medium">
                {isArray ? `${Number(key)}` : `"${key}"`}
              </span>
              <span className="text-gray-400 mx-1">: </span>
              <TreeNode data={data[key]} level={level + 1} />
            </div>
          ))}
        </div>
      )}
      <span className="text-gray-400">{isArray ? "]" : "}"}</span>
    </div>
  );
}

function ResizablePanel({
  leftContent,
  rightContent,
  className,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}) {
  const [leftWidth, setLeftWidth] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const x = e.clientX - container.left;
      const percent = Math.max(10, Math.min(90, (x / container.width) * 100));
      setLeftWidth(percent);
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`flex h-full ${className || ""}`}
      style={{ height: "calc(100vh - 320px)" }}
    >
      <div
        className="overflow-hidden"
        style={{ width: `${leftWidth}%`, minWidth: "100px" }}
      >
        {leftContent}
      </div>
      <div
        className="w-1 flex-shrink-0 cursor-col-resize relative group select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-8 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors" />
      </div>
      <div
        className="overflow-hidden"
        style={{ width: `${100 - leftWidth}%`, minWidth: "100px" }}
      >
        {rightContent}
      </div>
    </div>
  );
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [stripComments, setStripComments] = useState(true);
  const [autoTrimComma, setAutoTrimComma] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "format" | "minify" | "tree" | "escape" | "sort" | "validate"
  >("format");
  const [pathQuery, setPathQuery] = useState("");
  const [pathResult, setPathResult] = useState("");
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrapText, setWrapText] = useState(false);

  const getLineCount = (text: string) => text.split("\n").length;

  const parseAndFormat = useCallback(
    (inputText: string, action: string) => {
      if (!inputText.trim()) {
        setError("请输入JSON内容");
        setOutput("");
        return;
      }

      let cleaned = inputText;

      if (stripComments) {
        cleaned = stripJsonComments(cleaned);
      }

      if (autoTrimComma) {
        cleaned = cleaned.replace(/,(?=\s*[}\]])/g, "");
      }

      try {
        const parsed = JSON.parse(cleaned);

        switch (action) {
          case "format":
            setOutput(JSON.stringify(parsed, null, indent));
            break;
          case "minify":
            setOutput(JSON.stringify(parsed));
            break;
          case "sort":
            setOutput(JSON.stringify(sortObject(parsed), null, indent));
            break;
          case "escape":
            setOutput(escapeJson(JSON.stringify(parsed, null, indent)));
            break;
          case "tree":
            setOutput("");
            break;
          default:
            setOutput(JSON.stringify(parsed, null, indent));
        }

        setError("");

        // 路径查询
        if (pathQuery && action !== "tree") {
          const paths = pathQuery
            .split(".")
            .filter(Boolean)
            .map((p) => p.replace(/\[(\d+)\]/g, ".$1").split("."))
            .flat();
          let result: any = parsed;
          for (const key of paths) {
            const match = key.match(/^\[(\d+)\]$/);
            if (match) {
              result = result?.[Number(match[1])];
            } else if (result && typeof result === "object") {
              result = result[key];
            } else {
              result = undefined;
              break;
            }
          }
          if (result !== undefined) {
            setPathResult(
              typeof result === "object"
                ? JSON.stringify(result, null, 2)
                : String(result)
            );
          } else {
            setPathResult("未找到路径: " + pathQuery);
          }
        }
      } catch (e) {
        setError("无效的JSON格式: " + (e as Error).message);
        setOutput("");
      }
    },
    [indent, stripComments, autoTrimComma, pathQuery]
  );

  const handleFormat = useCallback(() => parseAndFormat(input, "format"), [
    input,
    parseAndFormat,
  ]);
  const handleMinify = useCallback(() => parseAndFormat(input, "minify"), [
    input,
    parseAndFormat,
  ]);
  const handleSort = useCallback(() => parseAndFormat(input, "sort"), [
    input,
    parseAndFormat,
  ]);
  const handleEscape = useCallback(() => parseAndFormat(input, "escape"), [
    input,
    parseAndFormat,
  ]);
  const handleTree = useCallback(() => parseAndFormat(input, "tree"), [
    input,
    parseAndFormat,
  ]);
  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setError("请输入JSON内容");
      return;
    }
    let cleaned = input;
    if (stripComments) cleaned = stripJsonComments(cleaned);
    if (autoTrimComma)
      cleaned = cleaned.replace(/,(?=\s*[}\]])/g, "");
    try {
      JSON.parse(cleaned);
      setError("✅ JSON格式正确！");
      setOutput(input);
    } catch (e) {
      setError("❌ 无效的JSON: " + (e as Error).message);
      setOutput("");
    }
  }, [input, stripComments, autoTrimComma]);

  const copyOutput = useCallback(async () => {
    const text = activeTab === "tree" ? input : output;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [output, activeTab, input]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    setPathResult("");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim()) {
      parseAndFormat(val, activeTab === "tree" ? "format" : activeTab);
    } else {
      setOutput("");
      setError("");
      setPathResult("");
    }
  };

  const lineNumbersStr =
    lineNumbers && input
      ? input.split("\n").map((_, i) => i + 1).join("\n")
      : "";
  const outputLineNumbers =
    lineNumbers && output
      ? output.split("\n").map((_, i) => i + 1).join("\n")
      : "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON 格式化</h1>
        <p className="text-gray-600">
          支持JSON格式化、压缩、排序、校验、树形视图、路径查询、转义等实用功能
        </p>
      </div>

      {/* 选项栏 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={stripComments}
            onChange={(e) => setStripComments(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">去除注释 (// /* */)</span>
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={autoTrimComma}
            onChange={(e) => setAutoTrimComma(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">去除尾随逗号</span>
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">缩进:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded text-sm"
          >
            <option value={2}>2空格</option>
            <option value={4}>4空格</option>
            <option value={8}>8空格</option>
            <option value={0}>Tab</option>
          </select>
        </div>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={lineNumbers}
            onChange={(e) => setLineNumbers(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">行号</span>
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={wrapText}
            onChange={(e) => setWrapText(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-gray-700">自动换行</span>
        </label>
      </div>

      {/* 功能标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "format", label: "📝 格式化", color: "blue" },
          { key: "minify", label: "📦 压缩", color: "gray" },
          { key: "sort", label: "🔤 排序", color: "green" },
          { key: "tree", label: "🌳 树形视图", color: "orange" },
          { key: "escape", label: "🔒 转义", color: "purple" },
          { key: "validate", label: "✅ 校验", color: "red" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? `bg-${tab.color}-600 text-white`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 路径查询栏 */}
      {activeTab !== "tree" && activeTab !== "escape" && (
        <div className="mb-4">
          <input
            type="text"
            value={pathQuery}
            onChange={(e) => {
              setPathQuery(e.target.value);
              if (output) {
                try {
                  const parsed = JSON.parse(e.target.value ? output : "");
                  const paths = e.target.value
                    .split(".")
                    .filter(Boolean)
                    .flatMap((p) => {
                      const match = p.match(/^(\w+)\[(\d+)\]$/);
                      return match ? [match[1], Number(match[2])] : [p];
                    });
                  let result: any = parsed;
                  for (const key of paths) {
                    if (result == null || typeof result !== "object") {
                      result = undefined;
                      break;
                    }
                    result = result[key];
                  }
                  setPathResult(
                    result !== undefined
                      ? typeof result === "object"
                        ? JSON.stringify(result, null, 2)
                        : String(result)
                      : "❌ 未找到路径: " + e.target.value
                  );
                } catch {
                  setPathResult("");
                }
              }
            }}
            placeholder="JSONPath 查询，如 $.store.book[0].author"
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {pathResult && (
            <div className="mt-1 text-sm bg-gray-50 rounded p-2 text-gray-700 font-mono overflow-x-auto">
              {pathResult}
            </div>
          )}
        </div>
      )}

      {/* 可拖拽分栏 */}
      <ResizablePanel
        leftContent={
          <div className="h-full flex flex-col bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-lg">📄</span> 输入
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                >
                  清空
                </button>
                <button
                  onClick={() => {
                    try {
                      navigator.clipboard.readText().then((text) =>
                        setInput(text)
                      );
                    } catch {
                      alert("请允许剪贴板权限");
                    }
                  }}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                >
                  粘贴
                </button>
              </div>
            </div>
            <div className="flex-1 flex relative overflow-hidden">
              {lineNumbers && input && (
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-start justify-end pr-2 pt-3 pb-3 text-xs text-gray-400 select-none font-mono overflow-hidden bg-gray-50 border-r border-gray-100">
                  {lineNumbersStr.split("\n").map((_, i) => (
                    <div key={i} className="h-[19px] leading-[19px] text-right">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder='{"key": "value"}'
                className={`flex-1 p-3 font-mono text-sm bg-transparent resize-none focus:outline-none ${
                  wrapText ? "whitespace-pre-wrap" : "whitespace-pre"
                }`}
                spellCheck={false}
                style={{
                  paddingLeft: lineNumbers && input ? "42px" : "12px",
                }}
              />
            </div>
          </div>
        }
        rightContent={
          <div className="h-full flex flex-col bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-lg">📋</span>{" "}
                {activeTab === "tree" ? "🌳 树形视图" : "输出"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  disabled={!output && activeTab !== "tree"}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {output || activeTab === "tree" ? "📋 复制" : "空"}
                </button>
                {!error && output && (
                  <span className="text-xs text-green-500 flex items-center">
                    ✅ 有效
                  </span>
                )}
              </div>
            </div>
            {activeTab === "tree" && input ? (
              <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-white">
                <TreeNode data={JSON.parse(stripJsonComments(input))} />
              </div>
            ) : (
              <>
                <div className="flex-1 relative overflow-hidden">
                  {lineNumbers && output && activeTab !== "tree" && (
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-start justify-end pr-2 pt-3 pb-3 text-xs text-gray-400 select-none font-mono overflow-hidden bg-gray-50 border-r border-gray-100">
                      {outputLineNumbers.split("\n").map((_, i) => (
                        <div key={i} className="h-[19px] leading-[19px] text-right">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                  <textarea
                    value={
                      (activeTab === "escape" || activeTab === "tree") && output
                        ? output
                        : output
                    }
                    readOnly
                    placeholder={
                      activeTab === "tree"
                        ? "在左侧输入JSON查看树形视图..."
                        : "处理结果..."
                    }
                    className={`w-full h-full p-3 font-mono text-sm bg-gray-50 resize-none focus:outline-none ${
                      wrapText ? "whitespace-pre-wrap" : "whitespace-pre"
                    }`}
                  />
                </div>
                {error && (
                  <div
                    className={`px-4 py-2 text-sm font-medium ${
                      error.startsWith("✅")
                        ? "text-green-600 bg-green-50"
                        : error.startsWith("❌")
                        ? "text-red-600 bg-red-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {error}
                  </div>
                )}
              </>
            )}
          </div>
        }
      />

      {/* 快捷操作 */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          📝 格式化
        </button>
        <button
          onClick={handleMinify}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          📦 压缩
        </button>
        <button
          onClick={handleSort}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          🔤 键排序
        </button>
        <button
          onClick={handleEscape}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
        >
          🔒 转义
        </button>
        <button
          onClick={() => {
            setActiveTab("tree");
            if (input.trim()) {
              try {
                JSON.parse(stripJsonComments(input));
                setError("");
              } catch (e) {
                setError("❌ 无效的JSON: " + (e as Error).message);
              }
            }
          }}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
        >
          🌳 树形视图
        </button>
        <button
          onClick={handleValidate}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
        >
          ✅ 校验
        </button>
        <button
          onClick={copyOutput}
          disabled={!output && activeTab !== "tree"}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm disabled:bg-gray-400"
        >
          📋 复制结果
        </button>
      </div>
    </div>
  );
}