"use client";
import { useState } from "react";
import { FaBolt, FaShieldAlt, FaFileAlt, FaRegSmile, FaMobileAlt, FaHeart } from "react-icons/fa";

export default function ExcelPdfConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversionType, setConversionType] = useState<"excelToPdf" | "pdfToExcel">("excelToPdf");

  const handleFileChange = (f: File) => {
    setFile(f);
    setConvertedUrl(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFileChange(e.target.files[0]);
  };

  const handleConvert = () => {
    if (!file) return;
    setLoading(true);

    // Fake conversion simulation
    setTimeout(() => {
      const url = URL.createObjectURL(file); // For demo purposes, same file as output
      setConvertedUrl(url);
      setLoading(false);
    }, 1500);
  };

  const features = [
    { icon: <FaBolt />, title: "Fast Conversion", desc: "Convert files quickly and easily" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "Your files remain in your browser" },
    { icon: <FaFileAlt />, title: "Supports XLSX & PDF", desc: "Works with Excel and PDF files" },
    { icon: <FaMobileAlt />, title: "Responsive", desc: "Use on any device" },
    { icon: <FaHeart />, title: "Free to Use", desc: "No hidden charges or signup required" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple drag & drop interface" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Excel ⇆ PDF Converter</h1>
        <p className="text-gray-600 text-lg md:text-xl">Convert Excel files to PDF and PDF files to Excel quickly and securely.</p>
      </div>

      {/* Main Tool */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Upload & Options */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed">
          {!file && <p className="text-gray-500 mb-4">Upload your file</p>}

          <input type="file" accept=".xlsx,.xls,.pdf" onChange={handleInputChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block">
            {file ? "Upload Another File" : "Upload File"}
          </label>

          {file && (
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={conversionType === "excelToPdf"} onChange={() => setConversionType("excelToPdf")} />
                  Excel → PDF
                </label>
                <label className="flex items-center gap-2 cursor-pointer ml-4">
                  <input type="radio" checked={conversionType === "pdfToExcel"} onChange={() => setConversionType("pdfToExcel")} />
                  PDF → Excel
                </label>
              </div>

              {!loading && !convertedUrl && (
                <button onClick={handleConvert} className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium shadow-md">
                  Convert File
                </button>
              )}

              {loading && <p className="mt-4 text-blue-600 font-semibold">Processing...</p>}

              {convertedUrl && !loading && (
                <a href={convertedUrl} download={`converted.${conversionType === "excelToPdf" ? "pdf" : "xlsx"}`} className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md">
                  ⬇ Download Converted File
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Why Use Our Tool Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Use Our Tool?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition text-center">
              <div className="flex justify-center items-center text-4xl text-blue-600 mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
