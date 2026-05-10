"use client";

import { useState, useCallback, useRef } from "react";

export default function QRGeneratorPage() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [size, setSize] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(() => {
    if (!text.trim()) {
      alert("请输入内容");
      return;
    }
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrUrl(url);
  }, [text, size]);

  const downloadQR = useCallback(() => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrUrl]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">二维码生成器</h1>
        <p className="text-gray-600">将文本、网址等信息快速转换为二维码图片。</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入内容
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本或网址..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            尺寸: {size}x{size}px
          </label>
          <input
            type="range"
            min="100"
            max="500"
            step="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <button
          onClick={generateQR}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          生成二维码
        </button>
      </div>

      {qrUrl && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <img
            src={qrUrl}
            alt="Generated QR Code"
            className="mx-auto mb-4"
            width={size}
            height={size}
          />
          <button
            onClick={downloadQR}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            下载二维码
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
