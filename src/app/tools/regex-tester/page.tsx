"use client";

import { useState, useCallback } from "react";

export default function RegexTesterPage() {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<Array<{ match: string; index: number }>>([]);
  const [replaceText, setReplaceText] = useState("");
  const [replaced, setReplaced] = useState("");
  const [error, setError] = useState("");

  const testRegex = useCallback(() => {
    setError("");
    setMatches([]);
    if (!regex) return;
    try {
      const regExp = new RegExp(regex, flags);
      const result: Array<{ match: string; index: number }> = [];
      let match;
      while ((match = regExp.exec(text)) !== null) {
        result.push({ match: match[0], index: match.index });
        if (!regExp.global) break;
      }
      setMatches(result);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [regex, text, flags]);

  const doReplace = useCallback(() => {
    setError("");
    if (!regex) return;
    try {
      const regExp = new RegExp(regex, flags.replace("g", ""));
      setReplaced(text.replace(regExp, replaceText));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [regex, text, flags, replaceText]);

  const clearAll = useCallback(() => {
    setRegex("");
    setText("");
    setFlags("g");
    setMatches([]);
    setReplaceText("");
    setReplaced("");
    setError("");
  }, []);

  const copyResult = useCallback(async () => {
    if (!replaced) return;
    try {
      await navigator.clipboard.writeText(replaced);
      alert("已复制到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [replaced]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          正则表达式测试工具
        </h1>
        <p className="text-gray-600">
          实时测试正则表达式，支持匹配结果查看和替换功能。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            正则表达式
          </label>
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="例如：\d+ 匹配数字"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="g"
              checked={flags.includes("g")}
              onChange={(e) =>
                setFlags((f) =>
                  e.target.checked
                    ? f + "g"
                    : f.replace("g", "")
                )
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-1 text-sm text-gray-700">全局匹配(g)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="i"
              checked={flags.includes("i")}
              onChange={(e) =>
                setFlags((f) =>
                  e.target.checked
                    ? f + "i"
                    : f.replace("i", "")
                )
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-1 text-sm text-gray-700">忽略大小写(i)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="m"
              checked={flags.includes("m")}
              onChange={(e) =>
                setFlags((f) =>
                  e.target.checked
                    ? f + "m"
                    : f.replace("m", "")
                )
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-1 text-sm text-gray-700">多行模式(m)</span>
          </label>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          测试文本
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入要匹配的文本..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={testRegex}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            执行匹配
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            清空
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">正则表达式错误: {error}</p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            匹配结果 ({matches.length}个)
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matches.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-100"
              >
                <span className="font-mono text-sm text-blue-800">
                  "{m.match.replace(/"/g, '"')}"
                </span>
                <span className="text-gray-500 text-xs">位置: {m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">替换文本</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            替换为
          </label>
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="输入替换内容"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={doReplace}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          执行替换
        </button>

        {replaced && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-green-800">替换结果</span>
              <button
                onClick={copyResult}
                className="text-xs text-blue-600 hover:underline"
              >
                复制
              </button>
            </div>
            <div className="p-3 bg-white rounded font-mono text-sm break-all whitespace-pre-wrap">
              {replaced}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-orange-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">
          常用正则表达式
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="p-2 bg-orange-100 rounded text-sm">
            <code className="text-orange-900">\d{{3}}-\d{{4}}-\d{{4}}</code>
            <p className="text-orange-700 text-xs">匹配中国手机号</p>
          </div>
          <div className="p-2 bg-orange-100 rounded text-sm">
            <code className="text-orange-900">[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{{2,}}</code>
            <p className="text-orange-700 text-xs">匹配邮箱地址</p>
          </div>
          <div className="p-2 bg-orange-100 rounded text-sm">
            <code className="text-orange-900">https?://[^\s/$.?#].[^\s]*</code>
            <p className="text-orange-700 text-xs">匹配URL链接</p>
          </div>
          <div className="p-2 bg-orange-100 rounded text-sm">
            <code className="text-orange-900">\b\d{{1,3}}\.\d{{1,3}}\.\d{{1,3}}\.\d{{1,3}}\b</code>
            <p className="text-orange-700 text-xs">匹配IP地址</p>
          </div>
        </div>
      </div>
    </div>
  );
}