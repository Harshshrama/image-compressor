"use client";
import { useState } from "react";
import { FaBolt, FaImage, FaMobileAlt, FaShieldAlt, FaHeart, FaRegSmile } from "react-icons/fa";

export default function CompresTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversion, setConversion] = useState<"mbToKb" | "kbToMb">("mbToKb");

  const texts = {
    en: {
      title: "Image Compressor",
      paragraph: "Resize your image size (MB ⇆ KB). Supports JPG, PNG, and WebP",
      subtitle: "Upload or drag & drop your image",
      upload: "Upload Image",
      compress: "Compress Image",
      downloading: "Download Image",
      processing: "Processing...",
      uploaded: "Image Uploaded",
      option: "Conversion Options",
      mbToKb: "MB → KB (Reduce Size)",
      kbToMb: "KB → MB (Increase Size)",
      featuresTitle: "Why Choose Our Tool?",
      features: [
        { icon: <FaBolt />, title: "Fast Compression", desc: "Get compressed images in seconds" },
        { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Your images never leave your browser" },
        { icon: <FaImage />, title: "High Quality", desc: "Maintain image clarity after compression" },
        { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Use on any device easily" },
        { icon: <FaHeart />, title: "Free to Use", desc: "No hidden charges or signup required" },
        { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple drag & drop interface" },
      ],
    },
    hi: {
      title: "इमेज कम्प्रेसर",
      paragraph:
        "अपनी इमेज का साइज बदलें (MB ⇆ KB). JPG, PNG, WebP सपोर्ट करता है।",
      subtitle: "अपनी इमेज अपलोड करें या ड्रैग & ड्रॉप करें",
      upload: "इमेज अपलोड करें",
      compress: "इमेज कम्प्रेस करें",
      downloading: "इमेज डाउनलोड करें",
      processing: "प्रोसेस हो रहा है...",
      uploaded: "इमेज अपलोड हो गई",
      option: "कन्वर्ज़न विकल्प",
      mbToKb: "MB → KB (साइज घटाएँ)",
      kbToMb: "KB → MB (साइज बढ़ाएँ)",
      featuresTitle: "हमारा टूल क्यों चुनें?",
      features: [
        { icon: <FaBolt />, title: "तेज़ कम्प्रेशन", desc: "सेकंडों में कम्प्रेस्ड इमेज पाएं" },
        { icon: <FaShieldAlt />, title: "सुरक्षित", desc: "आपकी इमेज ब्राउज़र में ही रहती है" },
        { icon: <FaImage />, title: "उच्च गुणवत्ता", desc: "कम्प्रेशन के बाद इमेज क्लियर रहे" },
        { icon: <FaMobileAlt />, title: "सभी डिवाइस पर", desc: "मोबाइल या डेस्कटॉप, आसानी से इस्तेमाल करें" },
        { icon: <FaHeart />, title: "फ्री टूल", desc: "कोई Hidden Charges या Signup नहीं" },
        { icon: <FaRegSmile />, title: "यूजर फ्रेंडली", desc: "सरल Drag & Drop Interface" },
      ],
    },
  };

  const handleFileChange = (f: File) => {
    setFile(f);
    setCompressedUrl(null);
    setProgress(0);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let MAX_WIDTH = 800;
        let quality = 0.6;

        if (conversion === "kbToMb") {
          MAX_WIDTH = img.width * 1.2;
          quality = 1.0;
        }

        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Fake progress animation
        let progressVal = 0;
        const interval = setInterval(() => {
          progressVal += 15;
          setProgress(progressVal);
          if (progressVal >= 100) {
            clearInterval(interval);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            setCompressedUrl(compressedDataUrl);
            setLoading(false);
          }
        }, 150);
      };
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">{texts[lang].title}</h1>
        <p className="text-gray-600 text-lg md:text-xl">{texts[lang].paragraph}</p>
      </div>

      {/* Main Tool */}
      <div className={`grid ${file ? "md:grid-cols-2" : "grid-cols-1"} gap-8 mb-16`}>
        {/* Upload Box */}
        <div
          className={`bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed transition ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {!file && <p className="text-gray-500 mb-4">{texts[lang].subtitle}</p>}

          {file && previewUrl && (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="mx-auto rounded-xl border shadow max-h-60"
              />
              <p className="mt-3 text-green-600 font-medium">
                ✅ {texts[lang].uploaded}
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
          >
            {file ? "Upload Another Image" : texts[lang].upload}
          </label>
        </div>

        {/* Right: Options */}
        {file && (
          <div className="space-y-6">
            {/* Conversion Options */}
            <div className="bg-white shadow-md rounded-3xl p-6">
              <h3 className="font-semibold mb-4 text-lg">{texts[lang].option}</h3>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={conversion === "mbToKb"}
                    onChange={() => setConversion("mbToKb")}
                  />
                  {texts[lang].mbToKb}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={conversion === "kbToMb"}
                    onChange={() => setConversion("kbToMb")}
                  />
                  {texts[lang].kbToMb}
                </label>
              </div>
            </div>

            {/* Compress Button */}
            {!loading && !compressedUrl && (
              <button
                onClick={handleCompress}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium shadow-md"
              >
                {texts[lang].compress}
              </button>
            )}

            {/* Loader */}
            {loading && (
              <div className="bg-white shadow-md rounded-3xl p-6 text-center">
                <p className="text-blue-600 font-semibold mb-2">
                  {texts[lang].processing}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{progress}%</p>
              </div>
            )}

            {/* Compressed Preview */}
            {compressedUrl && !loading && (
              <div className="bg-white shadow-md rounded-3xl p-6 text-center">
                <h3 className="font-semibold mb-4 text-lg">
                  Compressed Image Preview
                </h3>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="mx-auto rounded-xl border shadow mb-6 max-h-80"
                />
                <a
                  href={compressedUrl}
                  download="compressed.jpg"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
                >
                  ⬇ {texts[lang].downloading}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{texts[lang].featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {texts[lang].features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition text-center">
              <div className="flex justify-center items-center text-4xl text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
