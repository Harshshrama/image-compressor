"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // arrow icon

const links = [
  { name: "Compressor Image", href: "/tools/compressor" },
  { name: "Resize Image", href: "/tools/resize" },
  { name: "Convert Image", href: "/tools/convert" },
  { name: "Crop Image", href: "/tools/crop" },
  { name: "Image to PDF", href: "/tools/pdf" },
  { name: "Image to Text", href: "/tools/ocr" },
];

const moreTools = [
  { name: "QR Code Generator", href: "/tools/qrcodegenerator" },
  { name: "Text Overlay Watermark", href: "/tools/textoverlay" },
  { name: "Color Picker / Palette Generator", href: "/tools/colorpicker" },
];


export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/black_white_logo.png"
              alt="MyImageTools Logo"
              width={140}
              height={50}
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-6 items-center relative">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Tools Dropdown */}
            <div
              className="relative group"
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                More Tools <FaChevronDown className="ml-1 text-sm" />
              </button>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {moreTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
                      pathname === tool.href ? "font-semibold text-blue-600" : ""
                    }`}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="pt-20"></div>
    </>
  );
}
