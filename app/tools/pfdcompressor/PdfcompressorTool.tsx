"use client";

import { useState } from "react";
import { FaFilePdf, FaSpinner } from "react-icons/fa";

export default function PDFCompress() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const texts = {
    en: {
      title: "Compress PDF",
      subtitle: "Drag & drop your PDF here or click to upload",
      uploaded: "✅ PDF uploaded successfully",
      compressButton: "Compress PDF",
      download: "⬇ Download Compressed PDF",
    },
  };

  const handleUpload = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      alert("PDF too large (max 100MB)");
      return;
    }
    setPdfFile(file);
    setCompressedPdfUrl(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleUpload(e.target.files[0]);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleUpload(e.dataTransfer.files[0]);
  };

  const handleCompress = async () => {
    if (!pdfFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await fetch("/api/pfdcompressor", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Compression failed: " + (errorData.error || res.statusText));
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);
    } catch (err: any) {
      console.error(err);
      alert("Compression failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">{texts.en.title}</h1>
        <p className="text-gray-600 text-lg md:text-xl">{texts.en.subtitle}</p>
      </div>

      {/* Upload Box */}
      {!pdfFile && (
        <div
          className={`bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed mx-auto max-w-3xl cursor-pointer transition
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <p className="text-gray-500 mb-4">Drag & drop your PDF here</p>
          <input type="file" accept="application/pdf" onChange={handleInputChange} id="pdfUpload" className="hidden" />
          <label
            htmlFor="pdfUpload"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
          >
            Upload PDF
          </label>
        </div>
      )}

      {/* PDF Info + Compress */}
      {pdfFile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left */}
          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border flex flex-col items-center justify-center">
            <FaFilePdf className="text-red-600 text-6xl mb-4" />
            <p className="text-gray-700 font-medium">{pdfFile.name}</p>
            <p className="mt-2 text-green-600 font-medium">{texts.en.uploaded}</p>
            <input type="file" accept="application/pdf" onChange={handleInputChange} id="pdfUpload" className="hidden" />
            <label
              htmlFor="pdfUpload"
              className="mt-4 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
            >
              Upload Another PDF
            </label>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col gap-4">
              <button
                onClick={handleCompress}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin text-white" /> Compressing...
                  </div>
                ) : (
                  texts.en.compressButton
                )}
              </button>
            </div>

            {/* Download */}
            {compressedPdfUrl && (
              <div className="bg-white shadow-md rounded-3xl p-6 text-center">
                <h3 className="font-semibold mb-6 text-lg text-center">Compressed PDF</h3>
                <a
                  href={compressedPdfUrl}
                  download={`compressed-${pdfFile.name}`}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md inline-block"
                >
                  {texts.en.download}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}