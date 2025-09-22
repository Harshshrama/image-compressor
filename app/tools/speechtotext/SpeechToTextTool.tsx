// app/tools/speechtotext/SpeechToTextTool.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FaBolt, 
  FaShieldAlt, 
  FaRegFileAlt, 
  FaRegSmile, 
  FaMobileAlt, 
  FaHeart, 
  FaMicrophone, 
  FaStop, 
  FaCopy, 
  FaDownload 
} from "react-icons/fa";

// Languages
const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "Hindi" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
];

// --- TypeScript declarations for SpeechRecognition ---
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionResult {
  0: { transcript: string };
  isFinal: boolean;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResult[];
}

// Main component
export default function SpeechToTextTool() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window !== "undefined" && !recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang;

        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
          }
          setText(transcript);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [lang]);

  // Start / Stop
  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Copy & Download
  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "speech.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Features
  const features = [
    { icon: <FaBolt />, title: "Fast & Accurate", desc: "Real-time speech recognition" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "All processing happens in your browser" },
    { icon: <FaRegFileAlt />, title: "Multiple Languages", desc: "Supports multiple languages" },
    { icon: <FaMobileAlt />, title: "Responsive", desc: "Works on desktop and mobile" },
    { icon: <FaHeart />, title: "Free to Use", desc: "No signup required" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple interface for everyone" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Speech to Text Tool</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Convert your speech into text in real-time using our free online tool.
        </p>
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
            placeholder="Your speech will appear here..."
            className="w-full h-48 p-4 border rounded-xl shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <div className="flex justify-center gap-4 flex-wrap">
            {!listening && (
              <button onClick={startListening} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md">
                <FaMicrophone /> Start Listening
              </button>
            )}
            {listening && (
              <button onClick={stopListening} className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-medium shadow-md">
                <FaStop /> Stop Listening
              </button>
            )}
            <button onClick={copyText} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md">
              <FaCopy /> Copy Text
            </button>
            <button onClick={downloadText} className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition font-medium shadow-md">
              <FaDownload /> Download TXT
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
