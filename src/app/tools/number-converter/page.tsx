"use client";

import { useState, useCallback } from "react";

const BASES = ["二进制 (2)", "八进制 (8)", "十进制 (10)", "十六进制 (16)"] as const;

export default function NumberConverterPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputBase, setInputBase] = useState(10);
  const [result, setResult] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const convert = useCallback(() => {
    setError("");
    setResult({});

    if (!inputValue.trim()) {
      setError("请输入数值");
      return;
    }

    let decimalValue: number;

    try {
      // 验证输入是否为合法的指定进制数
      const validPattern: Record<number, RegExp> = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^-?[\d.]+$/,
        16: /^[0-9A-Fa-f]+$/,
      };

      const cleanInput = inputValue.trim().toUpperCase();

      // 十六进制前缀处理
      const actualInput = cleanInput.startsWith("0X")
        ? cleanInput.slice(2)
        : cleanInput;

      if (!validPattern[inputBase].test(actualInput)) {
        setError(`无效的 ${BASES[inputBase > 3 ? 3 : inputBase === 2 ? 0 : inputBase === 8 ? 1 : 2]} 进制数`);
        return;
      }

      // 16进制转10进制
      if (inputBase === 16) {
        decimalValue = parseInt(actualInput, 16);
      } else if (inputBase === 2) {
        decimalValue = parseInt(actualInput, 2);
      } else if (inputBase === 8) {
        decimalValue = parseInt(actualInput, 8);
      } else {
        decimalValue = parseInt(actualInput, 10);
      }

      if (isNaN(decimalValue)) {
        setError("无效的数值");
        return;
      }

      if (decimalValue > Number.MAX_SAFE_INTEGER) {
        setError("数值超出安全范围");
        return;
      }

      setResult({
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hex: decimalValue.toString(16).toUpperCase(),
        ascii:
          decimalValue >= 32 && decimalValue <= 126
            ? String.fromCharCode(decimalValue)
            : "N/A",
      });
    } catch (e) {
      setError("转换失败");
    }
  }, [inputValue, inputBase]);

  const copyResult = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        alert("已复制到剪贴板");
      } catch {
        alert("复制失败");
      }
    },
    []
  );

  const clearAll = useCallback(() => {
    setInputValue("");
    setInputBase(10);
    setResult({});
    setError("");
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          进制转换器
        </h1>
        <p className="text-gray-600">
          在二进制、八进制、十进制、十六进制之间相互转换，支持ASCII码查看。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        {/* 输入区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入数值
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                inputBase === 16
                  ? "例如: FF2A 或 0xFF2A"
                  : inputBase === 2
                  ? "例如: 1101010"
                  : inputBase === 8
                  ? "例如: 755"
                  : "例如: 255"
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择进制
            </label>
            <select
              value={inputBase}
              onChange={(e) => {
                setInputBase(Number(e.target.value));
                setResult({});
                setError("");
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>二进制 (2)</option>
              <option value={8}>八进制 (8)</option>
              <option value={10}>十进制 (10)</option>
              <option value={16}>十六进制 (16)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={convert}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            转换
          </button>
          <button
            onClick={clearAll}
            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
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

      {Object.keys(result).length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                key: "binary",
                label: "二进制",
                badge: "BIN",
                color: "green",
              },
              {
                key: "octal",
                label: "八进制",
                badge: "OCT",
                color: "blue",
              },
              {
                key: "decimal",
                label: "十进制",
                badge: "DEC",
                color: "purple",
              },
              {
                key: "hex",
                label: "十六进制",
                badge: "HEX",
                color: "orange",
              },
            ].map(({ key, label, badge, color }) => (
              <div
                key={key}
                className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">
                    {badge}
                  </span>
                  <button
                    onClick={() => copyResult(result[key as keyof typeof result])}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    复制
                  </button>
                </div>
                <code className="text-xl font-bold text-gray-900 font-mono break-all">
                  {result[key as keyof typeof result]}
                </code>
                <span className="text-xs text-gray-500">
                  {label} · {result[key as keyof typeof result]?.length || 0} 位
                </span>
              </div>
            ))}
          </div>

          {result.ascii && result.ascii !== "N/A" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <span className="text-sm text-yellow-800">
                ASCII 字符:{" "}
                <strong className="text-lg">{result.ascii}</strong>
              </span>
            </div>
          )}

          {/* 快速参考 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">快速参考</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-600">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">十进制</th>
                    <th className="text-left pr-4">二进制</th>
                    <th className="text-left pr-4">八进制</th>
                    <th className="text-left">十六进制</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [0, "0000", "0", "0"],
                    [1, "0001", "1", "1"],
                    [2, "0010", "2", "2"],
                    [10, "1010", "12", "A"],
                    [16, "10000", "20", "10"],
                    [255, "11111111", "377", "FF"],
                    [1024, "10000000000", "2000", "400"],
                  ].map(([dec, bin, oct, hex]) => (
                    <tr key={dec as number} className="border-b">
                      <td className="py-2 pr-4 font-mono">{dec as number}</td>
                      <td className="pr-4 font-mono">{bin}</td>
                      <td className="pr-4 font-mono">{oct}</td>
                      <td className="font-mono">{hex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          为什么需要进制转换？
        </h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>编程开发</strong>：十六进制用于表示内存地址、颜色值等
          </li>
          <li>
            <strong>计算机科学</strong>：二进制是计算机底层数据表示方式
          </li>
          <li>
            <strong>权限设置</strong>：Linux文件权限使用八进制表示
          </li>
          <li>
            <strong>网络协议</strong>：IP地址、端口等常涉及进制转换
          </li>
        </ul>
      </div>
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持二进制、八进制、十进制、十六进制相互转换</li>
            <li>实时转换，输入即显示所有进制的对应值</li>
            <li>支持大数转换，理论上限取决于浏览器</li>
            <li>十六进制支持大写和小写输出</li>
            <li>支持数字分组显示，便于阅读</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">选择一个进制作为输入格式，输入对应的数字，工具会自动在所有进制之间进行转换。例如输入十进制 255，会同时显示二进制 11111111、八进制 377、十六进制 FF。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">进制转换示例</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`十进制: 255
二进制: 11111111
八进制: 377
十六进制: FF

十进制: 1024
二进制: 10000000000
八进制: 2000
十六进制: 400`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">十六进制中的 A-F 代表什么？</h3>
              <p className="text-gray-700">十六进制使用 0-9 和 A-F 表示 0-15 的值。A=10、B=11、C=12、D=13、E=14、F=15。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">支持负数转换吗？</h3>
              <p className="text-gray-700">本工具主要处理无符号整数。负数的二进制表示涉及补码概念，建议使用专门的计算工具。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">为什么二进制看起来很长的数字？</h3>
              <p className="text-gray-700">因为二进制只使用 0 和 1 表示数字，同样的数值用二进制表示需要的位数比十进制多约 3.3 倍。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}