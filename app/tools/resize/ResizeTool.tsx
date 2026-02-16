"use client";

import { useState, useEffect } from "react";
import { FaArrowsAltH, FaArrowsAltV, FaMobileAlt, FaBolt, FaShieldAlt, FaHeart, FaSpinner } from "react-icons/fa";

export default function ResizeTool() {
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("resized-image");

  // Drag & Drop Handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0]);
    }
  };

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large (max 10MB)");
      return;
    }

    setFileName(file.name.split(".")[0]);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target?.result as string;
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setResizedImage(null);
      };
      setImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Auto-resize when image / width / height change
  useEffect(() => {
    if (!image) return;
    setLoading(true);
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
        setLoading(false);
      }
    };
  }, [image, width, height]);

  const handleWidthChange = (value: number) => {
    if (value < 50) value = 50;
    if (value > originalWidth) value = originalWidth;
    if (lockAspect && originalWidth && originalHeight) {
      const ratio = originalHeight / originalWidth;
      setWidth(value);
      setHeight(Math.round(value * ratio));
    } else {
      setWidth(value);
    }
  };

  const handleHeightChange = (value: number) => {
    if (value < 50) value = 50;
    if (value > originalHeight) value = originalHeight;
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
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Resize Your Image</h1>
        <p className="text-gray-600 text-lg md:text-xl">Upload or drag & drop your image</p>
      </div>

      {/* Upload & Resize */}
      {!image ? (
        <div
          className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed border-gray-300 mx-auto max-w-3xl cursor-pointer hover:bg-gray-50 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-gray-500 mb-4">Drag & drop your image here</p>
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
            <p className="mt-3 text-green-600 font-medium">✅ Image uploaded successfully</p>
            <p className="text-gray-500 mt-2">Original: {originalWidth}px × {originalHeight}px</p>

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
                  <label className="text-sm text-gray-600 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-gray-600 mb-1">Height (px)</label>
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
                <span className="text-sm">Maintain aspect ratio</span>
              </label>

              <button
                onClick={resetSize}
                className="w-full bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 font-medium transition"
              >
                Reset to Original
              </button>
            </div>

            {resizedImage && (
              <div className="bg-white shadow-md rounded-3xl p-6 text-center">
                <h3 className="font-semibold mb-4 text-lg">Resized Image Preview</h3>
                {loading ? (
                  <div className="flex justify-center items-center h-48">
                    <FaSpinner className="animate-spin text-3xl text-blue-600" />
                  </div>
                ) : (
                  <>
                    <img
                      src={resizedImage}
                      alt="Resized"
                      className="mx-auto rounded-xl border shadow mb-2 max-h-80"
                    />
                    <p className="text-gray-500 mb-4">Resized: {width}px × {height}px</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <a
                        href={resizedImage}
                        download={`${fileName}-resized.jpg`}
                        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md"
                      >
                        ⬇ Download JPG
                      </a>
                      <a
                        href={resizedImage.replace("image/jpeg", "image/png")}
                        download={`${fileName}-resized.png`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
                      >
                        ⬇ Download PNG
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center mb-8">Why Use Our Resize Tool?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6">
            <FaBolt className="text-4xl text-blue-600 mb-4" />
            <h4 className="font-semibold mb-2">Fast Resizing</h4>
            <p className="text-gray-500 text-center">Resize images in seconds without lag</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6">
            <FaShieldAlt className="text-4xl text-blue-600 mb-4" />
            <h4 className="font-semibold mb-2">Safe & Secure</h4>
            <p className="text-gray-500 text-center">Images stay in your browser, never uploaded</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6">
            <FaMobileAlt className="text-4xl text-blue-600 mb-4" />
            <h4 className="font-semibold mb-2">Responsive Design</h4>
            <p className="text-gray-500 text-center">Works perfectly on mobile & desktop</p>
          </div>
        </div>
      </div>
    </div>
  );
}