"use client";
import { useState } from "react";
import { FaBolt, FaShieldAlt, FaImage, FaRegSmile, FaMobileAlt, FaHeart } from "react-icons/fa";

export default function OpenGraphTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  const features = [
    { icon: <FaBolt />, title: "Instant Preview", desc: "See how your page looks on social media instantly" },
    { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "All processing happens in your browser" },
    { icon: <FaImage />, title: "Visual Preview", desc: "Check image, title, and description exactly" },
    { icon: <FaMobileAlt />, title: "Responsive", desc: "Preview works on desktop & mobile" },
    { icon: <FaHeart />, title: "Free Tool", desc: "No signup required" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Simple input fields and instant preview" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">Open Graph Preview Tool</h1>
        <p className="text-gray-600 text-lg md:text-xl">Check how your webpage will appear when shared on social media platforms.</p>
      </div>

      {/* Main Tool */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Input Form */}
        <div className="bg-white shadow-lg rounded-3xl p-8 text-center space-y-4">
          <input
            type="text"
            placeholder="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Page Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Website URL"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preview */}
        <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-md border rounded-xl overflow-hidden shadow">
            {imageUrl && <img src={imageUrl} alt="OG Image" className="w-full h-40 object-cover" />}
            <div className="p-4 text-left">
              <h3 className="font-semibold text-lg mb-1">{title || "Page Title"}</h3>
              <p className="text-gray-600 text-sm">{description || "Page Description"}</p>
              {siteUrl && <p className="text-blue-600 text-xs mt-2">{siteUrl}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
