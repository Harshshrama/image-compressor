"use client";

import { useState, useEffect } from "react";
import { FaArrowsAltH, FaArrowsAltV, FaMobileAlt, FaBolt, FaShieldAlt, FaRegSmile, FaHeart } from "react-icons/fa";

export default function ResizeTool() {
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);

  const texts = {
    en: {
      title: "Resize Your Image",
      subtitle: "Upload or drag & drop your image",
      width: "Width (px)",
      height: "Height (px)",
      lock: "Maintain aspect ratio",
      reset: "Reset to Original",
      uploaded: "✅ Image uploaded successfully",
      download: "⬇ Download Resized Image",
      featuresTitle: "Why Use Our Resize Tool?",
      features: [
        { icon: <FaBolt />, title: "Fast Resizing", desc: "Resize images in seconds without lag" },
        { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Images stay in your browser, never uploaded" },
        { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Works perfectly on mobile & desktop" },
        { icon: <FaArrowsAltH />, title: "Custom Dimensions", desc: "Resize exactly to your desired width" },
        { icon: <FaArrowsAltV />, title: "Aspect Lock", desc: "Keep original ratio or resize freely" },
        { icon: <FaHeart />, title: "Free & Easy", desc: "No signup, simple interface for everyone" },
      ],
    },
    hi: {
      title: "अपनी इमेज का साइज बदलें",
      subtitle: "अपनी इमेज अपलोड करें या ड्रैग & ड्रॉप करें",
      width: "चौड़ाई (px)",
      height: "ऊँचाई (px)",
      lock: "आसपेक्ट रेशियो बनाए रखें",
      reset: "मूल आकार पर रीसेट करें",
      uploaded: "✅ इमेज सफलतापूर्वक अपलोड हो गई",
      download: "⬇ रीसेज की गई इमेज डाउनलोड करें",
      featuresTitle: "हमारा Resize Tool क्यों चुनें?",
      features: [
        { icon: <FaBolt />, title: "तेज़ रीसेजिंग", desc: "सेकंडों में इमेज का आकार बदलें" },
        { icon: <FaShieldAlt />, title: "सुरक्षित", desc: "इमेज ब्राउज़र में ही रहती है, अपलोड नहीं होती" },
        { icon: <FaMobileAlt />, title: "सभी डिवाइस पर", desc: "मोबाइल और डेस्कटॉप दोनों पर इस्तेमाल करें" },
        { icon: <FaArrowsAltH />, title: "कस्टम डाइमेंशन", desc: "इच्छित चौड़ाई के अनुसार रीसेज करें" },
        { icon: <FaArrowsAltV />, title: "आस्पेक्ट लॉक", desc: "मूल अनुपात बनाए रखें या स्वतंत्र रूप से बदलें" },
        { icon: <FaHeart />, title: "फ्री & आसान", desc: "कोई साइनअप नहीं, सभी के लिए सरल इंटरफेस" },
      ],
    },
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.src = ev.target?.result as string;
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
        };
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setResizedImage(null);
    }
  };

  // Auto-resize when image / width / height change
  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        setResizedImage(canvas.toDataURL("image/jpeg", 0.9));
      }
    };
  }, [image, width, height]);

  const handleWidthChange = (value: number) => {
    if (lockAspect && originalWidth && originalHeight) {
      const ratio = originalHeight / originalWidth;
      setWidth(value);
      setHeight(Math.round(value * ratio));
    } else {
      setWidth(value);
    }
  };

  const handleHeightChange = (value: number) => {
    if (lockAspect && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setHeight(value);
      setWidth(Math.round(value * ratio));
    } else {
      setHeight(value);
    }
  };

  const resetSize = () => {
    setWidth(originalWidth);
    setHeight(originalHeight);
    setResizedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">{texts.en.title}</h1>
        <p className="text-gray-600 text-lg md:text-xl">{texts.en.subtitle}</p>
      </div>

      {/* Upload & Resize */}
      {!image ? (
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed border-gray-300 mx-auto max-w-3xl">
          <p className="text-gray-500 mb-4">{texts.en.subtitle}</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="uploadInput"
            className="hidden"
          />
          <label
            htmlFor="uploadInput"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
          >
            Upload Image
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Original Image */}
          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border">
            <img
              src={image}
              alt="Uploaded"
              className="mx-auto rounded-xl border shadow max-h-72"
            />
            <p className="mt-3 text-green-600 font-medium">{texts.en.uploaded}</p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="uploadInput"
              className="hidden"
            />
            <label
              htmlFor="uploadInput"
              className="mt-4 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
            >
              Upload Another Image
            </label>
          </div>

          {/* Resize Options */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-3xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Resize Options</h3>

              <div className="flex gap-4 mb-6 flex-wrap">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">{texts.en.width}</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">{texts.en.height}</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                />
                <span className="text-sm">{texts.en.lock}</span>
              </label>

              <button
                onClick={resetSize}
                className="w-full bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 font-medium transition"
              >
                {texts.en.reset}
              </button>
            </div>

            {resizedImage && (
              <div className="bg-white shadow-md rounded-3xl p-6 text-center">
                <h3 className="font-semibold mb-4 text-lg">Resized Image Preview</h3>
                <img
                  src={resizedImage}
                  alt="Resized"
                  className="mx-auto rounded-xl border shadow mb-6 max-h-80"
                />
                <a
                  href={resizedImage}
                  download="resized-image.jpg"
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
