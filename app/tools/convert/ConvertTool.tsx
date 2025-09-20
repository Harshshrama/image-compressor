"use client";

import { useState } from "react";
import { FaFileImage, FaBolt, FaShieldAlt, FaMobileAlt, FaHeart, FaRegSmile } from "react-icons/fa";

export default function ConvertTool() {
  const [image, setImage] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<{ format: string; dataUrl: string }[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["jpeg"]);
  const [quality, setQuality] = useState<number>(90);

  const texts = {
    en: {
      title: "Convert Image",
      subtitle: "Upload an image to convert into multiple formats",
      uploaded: "✅ Image uploaded successfully",
      formatsTitle: "Choose Formats",
      qualityLabel: "Quality",
      qualityDesc: "Lower quality = smaller file size, but less clarity",
      convertButton: "Convert Selected Formats",
      download: "⬇ Download",
      featuresTitle: "Why Use Our Convert Tool?",
      features: [
        { icon: <FaBolt />, title: "Fast Conversion", desc: "Convert images in seconds without delay" },
        { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Your images stay in the browser only" },
        { icon: <FaMobileAlt />, title: "Responsive", desc: "Works on desktop and mobile devices" },
        { icon: <FaFileImage />, title: "Multiple Formats", desc: "JPEG, PNG, WebP support" },
        { icon: <FaHeart />, title: "Free & Easy", desc: "No signup required, very simple interface" },
        { icon: <FaRegSmile />, title: "User-Friendly", desc: "Clean design and easy to use" },
      ],
    },
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setConvertedImages([]);
    }
  };

  const handleFormatChange = (format: string) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  const handleConvert = () => {
    if (!image || selectedFormats.length === 0) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const results: { format: string; dataUrl: string }[] = [];
      selectedFormats.forEach((format) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          let dataUrl: string;
          if (format === "jpeg" || format === "webp") {
            dataUrl = canvas.toDataURL(`image/${format}`, quality / 100);
          } else {
            dataUrl = canvas.toDataURL(`image/${format}`);
          }
          results.push({ format, dataUrl });
        }
      });
      setConvertedImages(results);
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">{texts.en.title}</h1>
        <p className="text-gray-600 text-lg md:text-xl">{texts.en.subtitle}</p>
      </div>

      {/* Upload Box */}
      {!image && (
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
      )}

      {/* Main Grid */}
      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Uploaded Image */}
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

          {/* Right: Options + Converted Results */}
          <div className="space-y-6">
            {/* Format + Quality */}
            <div className="bg-white shadow-md rounded-3xl p-6">
              <h3 className="font-semibold mb-4 text-lg">{texts.en.formatsTitle}</h3>
              <div className="flex gap-4 mb-6 flex-wrap">
                {["jpeg", "png", "webp"].map((format) => (
                  <label key={format} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(format)}
                      onChange={() => handleFormatChange(format)}
                    />
                    <span className="capitalize">{format}</span>
                  </label>
                ))}
              </div>

              {(selectedFormats.includes("jpeg") || selectedFormats.includes("webp")) && (
                <div className="mb-6">
                  <label className="block font-medium mb-2">
                    {texts.en.qualityLabel}: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <p className="text-gray-500 text-sm mt-1">{texts.en.qualityDesc}</p>
                </div>
              )}

              <button
                onClick={handleConvert}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium transition"
              >
                {texts.en.convertButton}
              </button>
            </div>

            {/* Converted Images */}
            {convertedImages.length > 0 && (
              <div className="bg-white shadow-md rounded-3xl p-6">
                <h3 className="font-semibold mb-6 text-lg text-center">Converted Images</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {convertedImages.map(({ format, dataUrl }) => (
                    <div key={format} className="border rounded-xl p-4 text-center shadow">
                      <p className="mb-2 font-medium">{format.toUpperCase()}</p>
                      <img
                        src={dataUrl}
                        alt={format}
                        className="mx-auto rounded border mb-3 max-h-40"
                      />
                      <a
                        href={dataUrl}
                        download={`converted-image.${format}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition inline-block"
                      >
                        {texts.en.download}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{texts.en.featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {texts.en.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition text-center"
            >
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
