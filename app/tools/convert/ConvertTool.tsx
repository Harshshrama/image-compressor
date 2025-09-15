"use client";

import { useState, useEffect } from "react";

export default function ConvertTool() {
  const [image, setImage] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<
    { format: string; dataUrl: string }[]
  >([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["jpeg"]);
  const [quality, setQuality] = useState<number>(90);

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
      <h1 className="text-4xl font-bold text-center mb-10">Convert Image</h1>

      {/* Agar image upload nahi hui hai to center mei box */}
      {!image && (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 mx-auto max-w-6xl">
          <p className="text-gray-500 mb-4">Upload an image to convert</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="uploadInput"
            className="hidden"
          />
          <label
            htmlFor="uploadInput"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md inline-block"
          >
            Upload Image
          </label>
        </div>
      )}

      {/* Agar image upload ho gayi hai to 2 column layout */}
      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Uploaded Image Preview */}
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center border">
            <img
              src={image}
              alt="Uploaded"
              className="mx-auto rounded-lg border shadow max-h-72"
            />
            <p className="mt-3 text-green-600 font-medium">
              ✅ Image uploaded successfully
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="uploadInput"
              className="hidden"
            />
            <label
              htmlFor="uploadInput"
              className="mt-4 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md inline-block"
            >
              Upload Another Image
            </label>
          </div>

          {/* Right: Options + Converted Results */}
          <div className="space-y-6">
            {/* Format + Quality Settings */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Choose Formats</h3>
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

              {(selectedFormats.includes("jpeg") ||
                selectedFormats.includes("webp")) && (
                <div className="mb-6">
                  <label className="block font-medium mb-2">
                    Quality: {quality}%
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
                  <p className="text-gray-500 text-sm mt-1">
                    Lower quality = smaller file size, but less clarity
                  </p>
                </div>
              )}

              <button
                onClick={handleConvert}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Convert Selected Formats
              </button>
            </div>

            {/* Converted Images */}
            {convertedImages.length > 0 && (
              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="font-semibold mb-6 text-lg text-center">
                  Converted Images
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {convertedImages.map(({ format, dataUrl }) => (
                    <div
                      key={format}
                      className="border rounded-lg p-4 text-center shadow"
                    >
                      <p className="mb-2 font-medium">{format.toUpperCase()}</p>
                      <img
                        src={dataUrl}
                        alt={format}
                        className="mx-auto rounded border mb-3 max-h-40"
                      />
                      <a
                        href={dataUrl}
                        download={`converted-image.${format}`}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition inline-block"
                      >
                        ⬇ Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
