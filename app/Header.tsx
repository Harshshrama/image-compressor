"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `hover:text-blue-600 ${
      pathname === href ? "text-blue-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded">
            IMAGE
          </span>
          <span className="border px-2 py-1 font-medium">TOOLS</span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          <Link href="/tools/compressor" className={linkClass("/tools/compressor")}>
            Compressor Image
          </Link>
          <Link href="/tools/resize" className={linkClass("/tools/resize")}>
            Resize Image
          </Link>
          <Link href="/tools/convert" className={linkClass("/tools/convert")}>
            Convert Image
          </Link>
          <Link href="/tools/crop" className={linkClass("/tools/crop")}>
            Crop Image
          </Link>
          <Link href="/tools/imagetopdf" className={linkClass("/tools/imagetopdf")}>
            Image to PDF
          </Link>
          <Link href="/tools/ocr" className={linkClass("/tools/ocr")}>
            Image to Text
          </Link>

          {/* Dropdown on hover */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
            >
              More Tools <FaChevronDown className="text-xs" />
            </button>
            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg w-56 p-2 z-50 hidden group-hover:block">
              {/* <Link href="/tools/speechtotext" className={`${linkClass("/tools/speechtotext")} block px-4 py-2 hover:bg-gray-100`}>
                🎙️ Speech to Text
              </Link> */}
              <Link href="/tools/textspeech" className={`${linkClass("/tools/textspeech")} block px-4 py-2 hover:bg-gray-100`}>
                🗣️ Text to Speech
              </Link>
              <Link href="/tools/metatag" className={`${linkClass("/tools/metatag")} block px-4 py-2 hover:bg-gray-100`}>
                🏷️ Meta Tag Generator
              </Link>
              <Link href="/tools/opengraph" className={`${linkClass("/tools/opengraph")} block px-4 py-2 hover:bg-gray-100`}>
                🔗 Open Graph Preview
              </Link>
              <Link href="/tools/wordcounter" className={`${linkClass("/tools/wordcounter")} block px-4 py-2 hover:bg-gray-100`}>
                ✍️ Word Counter
              </Link>
              <Link href="/tools/colorpicker" className={`${linkClass("/tools/colorpicker")} block px-4 py-2 hover:bg-gray-100`}>
                🎨 Color Picker
              </Link>
              <Link href="/tools/excelpdf" className={`${linkClass("/tools/excelpdf")} block px-4 py-2 hover:bg-gray-100`}>
                📑 Excel to PDF
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
