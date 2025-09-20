"use client";

import { useState, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { FaCrop, FaShieldAlt, FaMobileAlt, FaHeart, FaRegSmile, FaBolt } from "react-icons/fa";

export default function CropTool() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | null>(1); // default square
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const texts = {
    en: {
      title: "Crop Your Image",
      subtitle: "Upload and crop your image with ease",
      cropButton: "✅ Crop Image",
      featuresTitle: "Why Use Our Crop Tool?",
      features: [
        { icon: <FaBolt />, title: "Fast & Smooth", desc: "Quick cropping without delays" },
        { icon: <FaShieldAlt />, title: "Secure", desc: "Your images never leave your browser" },
        { icon: <FaMobileAlt />, title: "Responsive", desc: "Works on all devices" },
        { icon: <FaCrop />, title: "Flexible Crop", desc: "Choose aspect ratios or free crop" },
        { icon: <FaHeart />, title: "Free & Easy", desc: "No signup required, very simple" },
        { icon: <FaRegSmile />, title: "User-Friendly", desc: "Intuitive interface for everyone" },
      ],
    },
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setCroppedImage(null);
    }
  };

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = async (imageSrc: string, cropPixels: Area) => {
    const imageEl = new Image();
    imageEl.src = imageSrc;
    await new Promise((resolve) => (imageEl.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        imageEl,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        -cropPixels.width / 2,
        -cropPixels.height / 2,
        cropPixels.width,
        cropPixels.height
      );
      ctx.restore();
    }

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const handleCrop = async () => {
    if (image && croppedAreaPixels) {
      const cropped = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(cropped);
    }
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
            ref={inputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
          >
            Upload Image
          </button>
        </div>
      )}

      {/* Main Grid */}
      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left: Cropper */}
          <div className="relative w-full h-96 bg-black rounded-2xl overflow-hidden">
            {!croppedImage && (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect || undefined}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={handleCropComplete}
              />
            )}
            {croppedImage && (
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-full h-full object-contain rounded-2xl"
              />
            )}
          </div>

          {/* Right: Controls + Preview */}
          <div className="bg-white shadow-md rounded-3xl p-6 space-y-6">
            {!croppedImage && (
              <>
                {/* Aspect Ratio Selector */}
                <label className="block font-medium mb-2">Aspect Ratio</label>
                <select
                  value={aspect ?? 0}
                  onChange={(e) => setAspect(Number(e.target.value) || null)}
                  className="border rounded-lg p-2 w-full mb-4"
                >
                  <option value={1}>1:1 (Square)</option>
                  <option value={16 / 9}>16:9 (Landscape)</option>
                  <option value={9 / 16}>9:16 (Portrait)</option>
                  <option value={0}>Free</option>
                </select>

                {/* Zoom */}
                <label className="block font-medium mb-2">Zoom: {zoom.toFixed(1)}x</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full mb-4 accent-blue-600"
                />

                {/* Rotation */}
                <label className="block font-medium mb-2">Rotation: {rotation}°</label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full mb-6 accent-blue-600"
                />

                <button
                  onClick={handleCrop}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium transition shadow-md"
                >
                  {texts.en.cropButton}
                </button>
              </>
            )}

            {croppedImage && (
              <div className="text-center">
                <h3 className="font-semibold mb-4 text-lg">Cropped Preview</h3>
                <img
                  src={croppedImage}
                  alt="Preview"
                  className="mx-auto rounded-2xl border shadow mb-4 max-h-64"
                />
                <a
                  href={croppedImage}
                  download="cropped-image.jpg"
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium shadow-md inline-block"
                >
                  ⬇ Download Cropped Image
                </a>
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
