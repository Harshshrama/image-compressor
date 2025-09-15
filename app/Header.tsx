"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // get current path

  const links = [
    { name: "Compressor Image", href: "/" },
    { name: "Resize Image", href: "/tools/resize" },
    { name: "Convert Image", href: "/tools/convert" },
    { name: "Crop Image", href: "/tools/crop" },
    { name: "Image to Pdf", href: "/tools/pdf" },
    { name: "Image to Text", href: "/tools/ocr" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ImageTools</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`hover:text-blue-600 transition-colors ${
                pathname === link.href ? "text-blue-600" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">ImageTools</h1>
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col items-start gap-6 px-6 py-6 text-gray-700 font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`w-full border-b hover:text-blue-600 transition-colors ${
                pathname === link.href ? "text-blue-600" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
