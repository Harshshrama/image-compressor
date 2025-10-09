"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `hover:text-blue-600 ${pathname === href ? "text-blue-600 font-semibold" : "text-gray-700"}`;

  // Close mobile menu on link click
  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white border-b shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 z-50 relative">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/black_white_logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="object-contain rounded cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium relative">
          <Link href="/tools/compressor" className={linkClass("/tools/compressor")}>Compressor Image</Link>
          <Link href="/tools/resize" className={linkClass("/tools/resize")}>Resize Image</Link>
          <Link href="/tools/convert" className={linkClass("/tools/convert")}>Convert Image</Link>
          <Link href="/tools/crop" className={linkClass("/tools/crop")}>Crop Image</Link>
          <Link href="/tools/pdf" className={linkClass("/tools/pdf")}>Image to PDF</Link>
          <Link href="/tools/ocr" className={linkClass("/tools/ocr")}>Image to Text</Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              More Tools <FaChevronDown className="text-xs" />
            </button>
            <div className="absolute right-0 bg-white shadow-lg border rounded-lg w-56 p-2 z-50 hidden group-hover:block">
              <Link href="/tools/textspeech" className={`${linkClass("/tools/textspeech")} block px-4 py-2 hover:bg-gray-100`}>🗣️ Text to Speech</Link>
              <Link href="/tools/metatag" className={`${linkClass("/tools/metatag")} block px-4 py-2 hover:bg-gray-100`}>🏷️ Meta Tag Generator</Link>
              <Link href="/tools/opengraph" className={`${linkClass("/tools/opengraph")} block px-4 py-2 hover:bg-gray-100`}>🔗 Open Graph Preview</Link>
              <Link href="/tools/wordcounter" className={`${linkClass("/tools/wordcounter")} block px-4 py-2 hover:bg-gray-100`}>✍️ Word Counter</Link>
              <Link href="/tools/colorpicker" className={`${linkClass("/tools/colorpicker")} block px-4 py-2 hover:bg-gray-100`}>🎨 Color Picker</Link>
              <Link href="/tools/excelpdf" className={`${linkClass("/tools/excelpdf")} block px-4 py-2 hover:bg-gray-100`}>📑 Excel to PDF</Link>
            </div>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden z-50 relative">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 text-2xl focus:outline-none">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col px-6 py-10 overflow-y-auto">
          <div className="flex flex-col gap-6 mt-15">
            <Link href="/tools/compressor" className={linkClass("/tools/compressor")} onClick={handleLinkClick}>Compressor Image</Link>
            <Link href="/tools/resize" className={linkClass("/tools/resize")} onClick={handleLinkClick}>Resize Image</Link>
            <Link href="/tools/convert" className={linkClass("/tools/convert")} onClick={handleLinkClick}>Convert Image</Link>
            <Link href="/tools/crop" className={linkClass("/tools/crop")} onClick={handleLinkClick}>Crop Image</Link>
            <Link href="/tools/imagetopdf" className={linkClass("/tools/imagetopdf")} onClick={handleLinkClick}>Image to PDF</Link>
            <Link href="/tools/ocr" className={linkClass("/tools/ocr")} onClick={handleLinkClick}>Image to Text</Link>
            <hr className="border-gray-200 my-4" />
            <Link href="/tools/textspeech" className={linkClass("/tools/textspeech")} onClick={handleLinkClick}>🗣️ Text to Speech</Link>
            <Link href="/tools/metatag" className={linkClass("/tools/metatag")} onClick={handleLinkClick}>🏷️ Meta Tag Generator</Link>
            <Link href="/tools/opengraph" className={linkClass("/tools/opengraph")} onClick={handleLinkClick}>🔗 Open Graph Preview</Link>
            <Link href="/tools/wordcounter" className={linkClass("/tools/wordcounter")} onClick={handleLinkClick}>✍️ Word Counter</Link>
            <Link href="/tools/colorpicker" className={linkClass("/tools/colorpicker")} onClick={handleLinkClick}>🎨 Color Picker</Link>
            <Link href="/tools/excelpdf" className={linkClass("/tools/excelpdf")} onClick={handleLinkClick}>📑 Excel to PDF</Link>
          </div>
        </div>
      )}
    </header>
  );
}
