"use client";
import { useState } from "react";
import { FaBolt, FaShieldAlt, FaRegFileAlt, FaRegSmile, FaMobileAlt, FaHeart, FaCopy } from "react-icons/fa";

export default function MetaTagTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generatedMeta, setGeneratedMeta] = useState("");

  const features = [
    { icon: <FaBolt />, title: "Fast Generation", desc: "Generate meta tags instantly" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "All processing happens in your browser" },
    { icon: <FaRegFileAlt />, title: "SEO Friendly", desc: "Optimize your pages with proper meta tags" },
    { icon: <FaMobileAlt />, title: "Responsive", desc: "Works on all devices" },
    { icon: <FaHeart />, title: "Free to Use", desc: "No signup or hidden charges" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple interface for everyone" },
  ];

  const handleGenerate = () => {
    const meta = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />`;
    setGeneratedMeta(meta);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMeta);
    alert("Meta tags copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Meta Tag Generator</h1>
        <p className="text-gray-600 text-lg md:text-xl">Generate SEO friendly meta tags for your website quickly and easily.</p>
      </div>

      {/* Main Tool */}
      <div className="grid grid-cols-1 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center">
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Meta Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Meta Keywords (comma separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md"
          >
            Generate Meta Tags
          </button>

          {generatedMeta && (
            <div className="mt-6 text-left bg-gray-100 p-4 rounded-xl shadow">
              <pre className="text-sm">{generatedMeta}</pre>
              <button
                onClick={handleCopy}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-medium flex items-center gap-2"
              >
                <FaCopy /> Copy
              </button>
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
