"use client";
import { useState } from "react";
import {
  FaBolt,
  FaPalette,
  FaRegCopy,
  FaShieldAlt,
  FaMobileAlt,
  FaRegSmile,
} from "react-icons/fa";

export default function ColorpickerTool() {
  const [color, setColor] = useState("#3498db");

  const features = [
    { icon: <FaPalette />, title: "Pick Any Color", desc: "Instantly choose colors with the picker" },
    { icon: <FaRegCopy />, title: "Copy Codes", desc: "Copy HEX codes in one click" },
    { icon: <FaBolt />, title: "Fast & Simple", desc: "Quick tool for designers & developers" },
    { icon: <FaShieldAlt />, title: "Secure", desc: "Runs directly in your browser" },
    { icon: <FaMobileAlt />, title: "Works Anywhere", desc: "Fully responsive on all devices" },
    { icon: <FaRegSmile />, title: "User Friendly", desc: "Clean and easy-to-use interface" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-blue-600 font-bold mb-2">
         Color Picker
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Pick a color, preview instantly, and copy HEX codes with one click.
        </p>
      </div>

      {/* Tool Section */}
      <div className="bg-white shadow-lg rounded-3xl p-8 text-center mb-16">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-40 h-40 cursor-pointer rounded-xl border shadow"
        />
        <p className="mt-6 text-2xl font-semibold">{color}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
          onClick={() => navigator.clipboard.writeText(color)}
        >
          Copy Color Code
        </button>
      </div>

      
    </div>
  );
}
