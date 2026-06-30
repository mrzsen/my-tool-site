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
    
      {/* Content section */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>支持将文本、网址等信息快速转换为二维码图片</li>
            <li>支持自定义二维码大小和容错级别</li>
            <li>生成的二维码永久有效，无过期时间</li>
            <li>支持下载二维码为 PNG 图片</li>
            <li>支持批量生成多个二维码</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用说明</h2>
          <p className="text-gray-700 leading-relaxed">在输入框中输入需要生成二维码的内容（文本、网址、联系方式等），选择二维码尺寸和容错级别，点击生成按钮即可生成二维码图片。支持右键保存或点击下载按钮保存为 PNG 格式。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">使用示例</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">二维码应用场景</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">{`场景1: 网站链接二维码 - 输入网址即可生成
场景2: WiFi 连接二维码 - 加密信息一键分享
场景3: 名片二维码 - 存储姓名、电话、邮箱`}</pre>

        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">生成的二维码会过期吗？</h3>
              <p className="text-gray-700">不会。二维码本身是一张静态图片，只要您生成的图片不丢失，就永久有效。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">二维码能存储多少信息？</h3>
              <p className="text-gray-700">QR 码最大可存储 7089 个数字字符或 4296 个字母数字字符或 2953 个字节。建议内容不要过长。</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">扫码无法识别怎么办？</h3>
              <p className="text-gray-700">可以尝试增大二维码尺寸或降低容错级别。同时确保二维码图片清晰，没有遮挡或扭曲。</p>
            </div>
          </div>
        </section>
      </div>

</div>
  );
}
