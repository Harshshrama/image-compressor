"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { FaBolt, FaShieldAlt, FaMobileAlt, FaDownload, FaSmile, FaCheckCircle } from "react-icons/fa";

export default function OcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setText(null);
    }
  };

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);

    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });

    setText(result.data.text);
    setLoading(false);
  };

  const features = [
    { icon: <FaCheckCircle className="text-blue-600 text-3xl mx-auto mb-2" />, title: "Accurate OCR", desc: "Extract text reliably from images." },
    { icon: <FaBolt className="text-blue-600 text-3xl mx-auto mb-2" />, title: "Fast Processing", desc: "Quick extraction without delays." },
    { icon: <FaMobileAlt className="text-blue-600 text-3xl mx-auto mb-2" />, title: "Supports Multiple Formats", desc: "JPG, PNG, and more." },
    { icon: <FaShieldAlt className="text-blue-600 text-3xl mx-auto mb-2" />, title: "Secure", desc: "All processing happens in your browser." },
    { icon: <FaDownload className="text-blue-600 text-3xl mx-auto mb-2" />, title: "Downloadable", desc: "Save extracted text easily." },
    { icon: <FaSmile className="text-blue-600 text-3xl mx-auto mb-2" />, title: "User-Friendly", desc: "Clean interface for everyone." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl text-blue-600 font-bold text-center mb-6">
        Image to Text (OCR) Tool
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Upload an image and extract text quickly and accurately.
      </p>

      <div className={`grid ${file ? "md:grid-cols-2" : "grid-cols-1"} gap-8`}>
        {/* Upload Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
          {!file && (
            <p className="text-gray-500 mb-4">
              Upload an image (JPG, PNG) to extract text
            </p>
          )}

          {file && (
            <div className="mb-4">
              <p className="text-gray-700 text-sm">✅ {file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-2 max-h-40 mx-auto rounded-md"
              />
            </div>
          )}

          <label
            htmlFor="ocrInput"
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition font-medium inline-block"
          >
            {file ? "Upload Another Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="ocrInput"
              className="hidden"
            />
          </label>
        </div>

        {/* Extract & Preview Section */}
        {file && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6 text-center">
              <button
                onClick={handleExtractText}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition font-semibold text-lg"
              >
                {loading ? "Extracting..." : "📄 Extract Text"}
              </button>
            </div>

            {text && (
              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="font-semibold mb-4 text-lg">Extracted Text</h3>
                <textarea
                  className="w-full h-40 p-3 border rounded-lg"
                  readOnly
                  value={text}
                ></textarea>
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
                  download="extracted-text.txt"
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md inline-block"
                >
                  ⬇ Download Text
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Use Our OCR Tool?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              {f.icon}
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
