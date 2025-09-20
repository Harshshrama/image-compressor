"use client";
import { useState } from "react";
import { FaDownload, FaTextHeight } from "react-icons/fa";
import {
  FaBolt,
  FaShieldAlt,
  FaLink,
  FaMobileAlt,
  FaRegSmile,
} from "react-icons/fa";


export default function TextOverlayTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string>("My Watermark");
  const [fontSize, setFontSize] = useState<number>(40);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleDownload = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = previewUrl!;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      // Watermark
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(watermark, canvas.width - 10, canvas.height - 10);

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "watermarked.png";
      link.click();
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">
          Text Overlay / Watermark
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Add custom text or watermark to your images easily. Free & fast.
        </p>
      </div>

      {/* Main Tool */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Input Card */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-gray-300">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mb-4"
          />
          <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
            <FaTextHeight /> Watermark Text:
          </label>
          <input
            type="text"
            value={watermark}
            onChange={(e) => setWatermark(e.target.value)}
            placeholder="Enter watermark"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="block text-gray-700 font-medium mb-2">
            Font Size (px):
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Preview + Download */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center flex flex-col items-center justify-center">
          {previewUrl && (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="mb-6 max-h-80 rounded-xl border shadow"
              />
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaDownload /> Download Watermarked Image
              </button>
            </>
          )}
          {!previewUrl && (
            <p className="text-gray-500">Upload an image to preview</p>
          )}
        </div>
      </div>

<div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">
    Why Use This Tool?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaBolt className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Fast & Instant</h3>
      <p className="text-gray-600 text-sm text-center">
        Add watermark or text to images instantly.
      </p>
    </div>
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Safe & Secure</h3>
      <p className="text-gray-600 text-sm text-center">
        Your images are processed in-browser, never uploaded.
      </p>
    </div>
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaLink className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Supports URLs</h3>
      <p className="text-gray-600 text-sm text-center">
        Works with images from URLs as well.
      </p>
    </div>
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaMobileAlt className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Responsive Design</h3>
      <p className="text-gray-600 text-sm text-center">
        Works perfectly on any device.
      </p>
    </div>
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaRegSmile className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Free to Use</h3>
      <p className="text-gray-600 text-sm text-center">
        No signup or hidden charges.
      </p>
    </div>
    <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <FaDownload className="text-blue-600 text-4xl mb-4" />
      <h3 className="font-semibold mb-2">Easy Download</h3>
      <p className="text-gray-600 text-sm text-center">
        Download watermarked images instantly.
      </p>
    </div>
  </div>
</div>

      {/* How to Use Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">1️⃣</div>
            <h3 className="font-semibold mb-2">Upload Image</h3>
            <p className="text-gray-600 text-sm">
              Select the image you want to add text or watermark to.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">2️⃣</div>
            <h3 className="font-semibold mb-2">Add Text & Adjust Size</h3>
            <p className="text-gray-600 text-sm">
              Type your watermark and adjust font size as desired.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">3️⃣</div>
            <h3 className="font-semibold mb-2">Download Image</h3>
            <p className="text-gray-600 text-sm">
              Click the download button to save your watermarked image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
