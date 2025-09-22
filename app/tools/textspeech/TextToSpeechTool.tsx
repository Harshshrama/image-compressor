"use client";
import { useState } from "react";
import { FaBolt, FaShieldAlt, FaRegFileAlt, FaRegSmile, FaMobileAlt, FaHeart, FaPlay, FaStop, FaDownload } from "react-icons/fa";

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "Hindi" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
];

export default function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en-US");
  const [speaking, setSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSpeak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    setSpeaking(true);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleDownload = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const audioBlob = new Blob([text], { type: "text/plain" }); // simple text as placeholder
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = "speech.mp3";
    link.click();
    URL.revokeObjectURL(url);
  };

  const features = [
    { icon: <FaBolt />, title: "Fast Conversion", desc: "Convert text to speech in seconds" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "Your text never leaves your browser" },
    { icon: <FaRegFileAlt />, title: "Multiple Languages", desc: "Supports multiple languages" },
    { icon: <FaMobileAlt />, title: "Responsive", desc: "Works on desktop and mobile" },
    { icon: <FaHeart />, title: "Free to Use", desc: "No signup required" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple interface for everyone" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Text to Speech (TTS) Tool</h1>
        <p className="text-gray-600 text-lg md:text-xl">Convert your text into natural speech using our free online tool.</p>
      </div>

      {/* Main Tool */}
      <div className="grid grid-cols-1 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Language:</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="border rounded-xl px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
            className="w-full h-48 p-4 border rounded-xl shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <div className="flex justify-center gap-4 flex-wrap">
            {!speaking && (
              <button onClick={handleSpeak} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md">
                <FaPlay /> Speak
              </button>
            )}
            {speaking && (
              <button onClick={handleStop} className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-medium shadow-md">
                <FaStop /> Stop
              </button>
            )}
            <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md">
              <FaDownload /> Download
            </button>
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
