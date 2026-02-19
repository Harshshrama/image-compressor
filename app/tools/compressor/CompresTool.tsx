"use client";
import { useState } from "react";
import JSZip from "jszip";

export default function CompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [compressedImages, setCompressedImages] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (fileList: FileList) => {
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
    setCompressedImages([]);
    setProgress(0);

    const previewArray = fileArray.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(previewArray);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setProgress(0);

    const compressedArray: Blob[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;

          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const originalType = file.type; // image/png, image/jpeg, image/webp

          let quality = 0.6;

          // PNG me quality parameter ka effect nahi hota
          if (originalType === "image/png") {
            quality = 1.0;
          }

          canvas.toBlob(
            (blob) => {
              if (blob) {
                compressedArray.push(blob);
              }
              resolve(true);
            },
            originalType,
            quality
          );
        };
      });

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setCompressedImages(compressedArray);
    setLoading(false);
  };

  // 🔥 UPDATED DOWNLOAD LOGIC
  const handleDownload = async () => {
    if (compressedImages.length === 1) {
      // Direct single download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(compressedImages[0]);
      const originalName = files[0].name;
      const extension = originalName.split(".").pop();
      link.download = `compressed-image.${extension}`;
      link.click();
      return;
    }

    // Multiple → ZIP
    const zip = new JSZip();

    compressedImages.forEach((blob, index) => {
      const originalName = files[index].name;
      const extension = originalName.split(".").pop();
      zip.file(`compressed-${index + 1}.${extension}`, blob);
    });

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "compressed-images.zip";
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Image Compressor
        </h1>
        <p className="text-gray-600">
          Select images → Preview → Compress → Download
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white shadow-lg rounded-3xl p-8 text-center border-2 border-dashed border-gray-300 mb-8">

        {previews.length === 0 && (
          <p className="text-gray-500 mb-4">
            Upload or drag & drop images
          </p>
        )}

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {previews.map((url, index) => (
              <img
                key={index}
                src={url}
                className="rounded-xl border shadow max-h-40 mx-auto"
                alt="Preview"
              />
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              handleFileChange(e.target.files);
            }
          }}
          className="hidden"
          id="fileInput"
        />

        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
        >
          Upload Images
        </label>
      </div>

      {/* Compress Button */}
      {files.length > 0 && compressedImages.length === 0 && !loading && (
        <button
          onClick={handleCompress}
          className="w-64 mx-auto block bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium shadow-md mb-6"
        >
          Compress Images
        </button>
      )}

      {/* Loader */}
      {loading && (
        <div className="bg-white shadow-md rounded-3xl p-6 text-center mb-6">
          <p className="text-blue-600 font-semibold mb-2">
            Processing...
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

      {/* Download Button */}
      {compressedImages.length > 0 && !loading && (
        <button
          onClick={handleDownload}
          className="w-64 mx-auto block bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium shadow-md"
        >
          ⬇ Download {compressedImages.length > 1 ? "All Images" : "Image"}
        </button>
      )}
    </div>
  );
}