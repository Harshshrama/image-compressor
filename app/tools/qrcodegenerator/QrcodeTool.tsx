"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaDownload, FaLink, FaMobileAlt, FaRegSmile, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function QrcodeTool() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(250);

  const handleDownload = () => {
    const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">QR Code Generator</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Generate QR codes instantly for URLs or text. Free and easy to use.
        </p>
      </div>

      {/* Main Tool Card */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Input Card */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-gray-300">
          <label className="block text-gray-700 font-medium mb-2">Enter Text or URL:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text or URL"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          />

          <label className="block text-gray-700 font-medium mb-2">Size (px):</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Output Card */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center flex flex-col items-center justify-center">
          <QRCodeCanvas value={text || " "} size={size} className="mb-6" />
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaDownload /> Download QR Code
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Use This Tool?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { icon: <FaBolt />, title: "Fast & Instant", desc: "Generate QR codes in seconds" },
            { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Your data never leaves your browser" },
            { icon: <FaLink />, title: "Supports URLs", desc: "Easily convert any link to QR" },
            { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Works on any device" },
            { icon: <FaRegSmile />, title: "Free to Use", desc: "No signup or hidden charges" },
            { icon: <FaDownload />, title: "Easy Download", desc: "Download QR codes instantly" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center items-center text-4xl text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">1️⃣</div>
            <h3 className="font-semibold mb-2">Enter Text or URL</h3>
            <p className="text-gray-600 text-sm">Type or paste the text/link you want to convert to QR code.</p>
          </div>
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">2️⃣</div>
            <h3 className="font-semibold mb-2">Adjust Size</h3>
            <p className="text-gray-600 text-sm">Choose the desired size of your QR code for download.</p>
          </div>
          <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">3️⃣</div>
            <h3 className="font-semibold mb-2">Download QR Code</h3>
            <p className="text-gray-600 text-sm">Click the download button to save your QR code as an image.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
