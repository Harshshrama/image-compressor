// app/tools/resize/ResizeTool.tsx
"use client";

import { useState, useEffect } from "react";

export default function ResizeTool() {
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);

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
      <h1 className="text-4xl font-bold text-center mb-10">Resize Your Image</h1>

      {!image && (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 mx-auto max-w-6xl">
          <p className="text-gray-500 mb-4">Drag & drop or upload an image</p>
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

      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center border">
            <img
              src={image}
              alt="Uploaded"
              className="mx-auto rounded-lg border shadow max-h-72"
            />
            <p className="mt-3 text-green-600 font-medium">✅ Image uploaded successfully</p>

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

          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Resize Options</h3>

              <div className="flex gap-4 mb-6">
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
                className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-medium transition"
              >
                Reset to Original
              </button>
            </div>

            {resizedImage && (
              <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                <h3 className="font-semibold mb-4 text-lg">Resized Image Preview</h3>
                <img
                  src={resizedImage}
                  alt="Resized"
                  className="mx-auto rounded-lg border shadow mb-6 max-h-80"
                />
                <a
                  href={resizedImage}
                  download="resized-image.jpg"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md inline-block"
                >
                  ⬇ Download Resized Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
