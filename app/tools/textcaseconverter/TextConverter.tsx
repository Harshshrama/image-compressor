"use client";

import { useState } from "react";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());

  const toCapitalize = () =>
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    );

  const toSentenceCase = () =>
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) =>
          c.toUpperCase()
        )
    );

  const clearText = () => setText("");

  const copyToClipboard = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount =
    text.trim().length === 0
      ? 0
      : text.trim().split(/\s+/).length;

  const charCount = text.length;

  return (
    <div className="flex flex-col items-center py-6 px-4 mb-10">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">
        Text Case Converter
      </h1>

      <p className="text-gray-600 text-lg md:text-xl mb-10">
        Convert text to Uppercase, Lowercase, Capitalize, or Sentence case instantly.
      </p>

      {/* Main Tool Box */}
      <div className="w-full max-w-4xl bg-white border-2 border-dashed border-gray-300 rounded-2xl shadow-md p-6 md:p-8">

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-40 md:h-52 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc] resize-none text-sm md:text-base"
        />

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 mt-3">
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">

          <button
            onClick={toUpperCase}
            className="px-4 py-2 bg-[#155dfc] text-white rounded-lg shadow hover:bg-[#0f4de0] transition text-sm md:text-base"
          >
            UPPERCASE
          </button>

          <button
            onClick={toLowerCase}
            className="px-4 py-2 bg-[#155dfc] text-white rounded-lg shadow hover:bg-[#0f4de0] transition text-sm md:text-base"
          >
            lowercase
          </button>

          <button
            onClick={toCapitalize}
            className="px-4 py-2 bg-[#155dfc] text-white rounded-lg shadow hover:bg-[#0f4de0] transition text-sm md:text-base"
          >
            Capitalize
          </button>

          <button
            onClick={toSentenceCase}
            className="px-4 py-2 bg-[#155dfc] text-white rounded-lg shadow hover:bg-[#0f4de0] transition text-sm md:text-base"
          >
            Sentence case
          </button>

          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm md:text-base"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={clearText}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm md:text-base"
          >
            Clear
          </button>

        </div>
      </div>
    </div>
  );
}
