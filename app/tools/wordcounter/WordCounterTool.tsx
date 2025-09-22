"use client";
import { useState } from "react";
import { FaBolt, FaShieldAlt, FaRegFileAlt, FaRegSmile, FaMobileAlt, FaHeart } from "react-icons/fa";

export default function WordCounterTool() {
  const [text, setText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    const words = value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(value.replace(/\s/g, "").length);
  };

  const features = [
    { icon: <FaBolt />, title: "Fast & Accurate", desc: "Instantly count words and characters" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "All data stays in your browser" },
    { icon: <FaRegFileAlt />, title: "Multiple Formats", desc: "Copy or export your text easily" },
    { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Use on any device" },
    { icon: <FaHeart />, title: "Free to Use", desc: "No signup or hidden charges" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple and clean interface" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Word Counter Tool</h1>
        <p className="text-gray-600 text-lg md:text-xl">Count words and characters in your text quickly and accurately.</p>
      </div>

      {/* Main Tool */}
      <div className="grid grid-cols-1 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste or type your text here..."
            className="w-full h-48 p-4 border rounded-xl shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Stats */}
          <div className="mt-4 flex justify-center gap-8 text-gray-700 font-medium">
            <p>Words: <span className="text-blue-600">{wordCount}</span></p>
            <p>Characters: <span className="text-blue-600">{charCount}</span></p>
          </div>
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
