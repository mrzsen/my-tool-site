"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "颜色转换工具 | 在线工具箱",
  description: "在线颜色格式转换工具，支持RGB、HEX、HSL等多种格式互转。",
  alternates: {
    canonical: "https://tool.wnsj.net/tools/color-converter"
  }
};

import { useState, useCallback } from "react";

const PRESET_COLORS: { name: string; hex: string }[] = [
  { name: "红色", hex: "#FF0000" },
  { name: "绿色", hex: "#00FF00" },
  { name: "蓝色", hex: "#0000FF" },
  { name: "黑色", hex: "#000000" },
  { name: "白色", hex: "#FFFFFF" },
  { name: "灰色", hex: "#808080" },
  { name: "黄色", hex: "#FFFF00" },
  { name: "紫色", hex: "#800080" },
  { name: "橙色", hex: "#FFA500" },
  { name: "青色", hex: "#008080" },
];

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.round(x).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverterPage() {
  const [colorInput, setColorInput] = useState("#FF5733");
  const [result, setResult] = useState<{
    hex: string;
    rgb: string;
    hsl: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [bgColor, setBgColor] = useState("#FF5733");

  const convert = useCallback((input: string) => {
    setError("");
    input = input.trim();
    if (!input) return;

    // 如果是 # 开头的十六进制
    if (input.startsWith("#")) {
      const hex = input.replace("#", "");
      if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) {
        setError("无效的十六进制颜色值");
        setResult(null);
        return;
      }
      const { r, g, b } = hexToRgb(input);
      const hsl = rgbToHsl(r, g, b);
      setResult({
        hex: input.toUpperCase(),
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      });
      setBgColor(input);
      return;
    }

    // 如果是 rgb() 格式
    const rgbMatch = input.match(
      /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
    );
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      if (r > 255 || g > 255 || b > 255) {
        setError("RGB 值必须在 0-255 之间");
        setResult(null);
        return;
      }
      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      setResult({
        hex: hex.toUpperCase(),
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      });
      setBgColor(hex);
      return;
    }

    // 如果是 hsl() 格式
    const hslMatch = input.match(
      /^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i
    );
    if (hslMatch) {
      let h = parseInt(hslMatch[1]) % 360;
      let s = parseInt(hslMatch[2]);
      let l = parseInt(hslMatch[3]);
      if (s > 100 || l > 100) {
        setError("HSL 百分比值必须在 0-100 之间");
        setResult(null);
        return;
      }
      // HSL to RGB
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0,
        g = 0,
        b = 0;
      if (h < 60) {
        [r, g, b] = [c, x, 0];
      } else if (h < 120) {
        [r, g, b] = [x, c, 0];
      } else if (h < 180) {
        [r, g, b] = [0, c, x];
      } else if (h < 240) {
        [r, g, b] = [0, x, c];
      } else if (h < 300) {
        [r, g, b] = [x, 0, c];
      } else {
        [r, g, b] = [c, 0, x];
      }
      const hex = rgbToHex(
        (r + m) * 255,
        (g + m) * 255,
        (b + m) * 255
      );
      setResult({
        hex: hex.toUpperCase(),
        rgb: `rgb(${Math.round((r + m) * 255)}, ${Math.round(
          (g + m) * 255
        )}, ${Math.round((b + m) * 255)})`,
        hsl: `hsl(${h}, ${s * 100}%, ${l * 100}%)`,
      });
      setBgColor(hex);
      return;
    }

    setError("无法识别的颜色格式，请输入 #FF5733、rgb(255,87,51) 或 hsl(14,100%,60%)");
    setResult(null);
  }, []);

  const handleConvert = useCallback(() => {
    convert(colorInput);
  }, [colorInput, convert]);

  const copyAll = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `HEX: ${result.hex}\nRGB: ${result.rgb}\nHSL: ${result.hsl}`
      );
      alert("已复制所有格式到剪贴板");
    } catch {
      alert("复制失败");
    }
  }, [result]);

  const presetClick = useCallback(
    (hex: string) => {
      setColorInput(hex);
      convert(hex);
    },
    [convert]
  );

  // 实时预览：当输入合法hex时更新预览
  const previewBg = (() => {
    if (/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(colorInput.trim())) {
      return colorInput.trim();
    }
    return bgColor;
  })();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          颜色格式转换器
        </h1>
        <p className="text-gray-600">
          在 HEX、RGB、HSL 颜色格式之间相互转换。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        {/* 颜色预览 */}
        <div className="mb-6">
          <div
            className="w-full h-32 rounded-lg border-2 border-gray-200 transition-colors duration-300"
            style={{ backgroundColor: previewBg }}
          />
        </div>

        {/* 颜色预设 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => presetClick(c.hex)}
              className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        {/* 输入 */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入颜色值
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="#FF5733 或 rgb(255,87,51) 或 hsl(14,100%,60%)"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <button
            onClick={handleConvert}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
            转换
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">转换结果</h2>
              <button
                onClick={copyAll}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                全部复制
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-orange-700 font-medium w-20">HEX</span>
                <code className="font-mono text-lg font-bold text-orange-900">
                  {result.hex}
                </code>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(result!.hex);
                    alert("已复制HEX");
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  复制
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-700 font-medium w-20">RGB</span>
                <code className="font-mono text-lg font-bold text-green-900">
                  {result.rgb}
                </code>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(result!.rgb);
                    alert("已复制RGB");
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  复制
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-purple-700 font-medium w-20">HSL</span>
                <code className="font-mono text-lg font-bold text-purple-900">
                  {result.hsl}
                </code>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(result!.hsl);
                    alert("已复制HSL");
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  复制
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          颜色格式说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="bg-white rounded p-3">
            <h4 className="font-semibold text-blue-800 mb-1">HEX 十六进制</h4>
            <p className="text-sm text-blue-700">
              以 # 开头，如 #FF5733。网页开发中最常用的颜色表示方式。
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h4 className="font-semibold text-blue-800 mb-1">RGB 红绿蓝</h4>
            <p className="text-sm text-blue-700">
              如 rgb(255,87,51)，三个通道值 0-255，直观表示颜色混合。
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h4 className="font-semibold text-blue-800 mb-1">HSL 色相饱和度</h4>
            <p className="text-sm text-blue-700">
              如 hsl(14,100%,60%)，更符合人类直觉的颜色描述方式。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}