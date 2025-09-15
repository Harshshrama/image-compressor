"use client";

import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";

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
      logger: (m) => console.log(m), // progress log
    });

    setText(result.data.text);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Image to Text (OCR)</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
          {!file && <p className="text-gray-500 mb-4">Upload an image to extract text (JPG, PNG)</p>}

          {file && (
            <div className="mb-4">
              <p className="text-gray-700 text-sm">✅ {file.name}</p>
              <img src={URL.createObjectURL(file)} alt="preview" className="mt-2 max-h-40 mx-auto rounded-md" />
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleFileChange} id="ocrInput" className="hidden" />
          <label
            htmlFor="ocrInput"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md inline-block"
          >
            {file ? "Upload Another Image" : "Upload Image"}
          </label>
        </div>

        {/* Result Section */}
        {file && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Extract Options</h3>
              <button
                onClick={handleExtractText}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition"
              >
                {loading ? "Extracting..." : "Extract Text"}
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
    </div>
  );
}
