"use client";

import "../globals.css";
import Header from "../Header";
import Footer from "../Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaExchangeAlt,
  FaCrop,
  FaFilePdf,
  FaFileAlt,
  FaShieldAlt,
  FaBolt,
  FaMobileAlt,
  FaRegSmile,
  FaHeart,
  FaExpandArrowsAlt as FaExpandIcon,
} from "react-icons/fa";

// All 12 tools
const tools = [
  { name: "Compressor Image", href: "/tools/compressor", desc: "Compress images without losing quality.", icon: <FaCompressArrowsAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Resize Image", href: "/tools/resize", desc: "Easily resize images online.", icon: <FaExpandArrowsAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Convert Image", href: "/tools/convert", desc: "Convert images between formats like JPG, PNG, etc.", icon: <FaExchangeAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Crop Image", href: "/tools/crop", desc: "Crop your images instantly.", icon: <FaCrop className="text-3xl text-blue-600 mb-3" /> },
  { name: "Image to PDF", href: "/tools/imagetopdf", desc: "Convert images into PDF files.", icon: <FaFilePdf className="text-3xl text-blue-600 mb-3" /> },
  { name: "Image to Text", href: "/tools/ocr", desc: "Extract text from images using OCR.", icon: <FaFileAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Text to Speech", href: "/tools/textspeech", desc: "Convert text into natural-sounding speech.", icon: <FaRegSmile className="text-3xl text-blue-600 mb-3" /> },
  { name: "Meta Tag Generator", href: "/tools/metatag", desc: "Generate SEO-friendly meta tags for your website.", icon: <FaBolt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Open Graph Preview", href: "/tools/opengraph", desc: "Preview how your page looks on social media.", icon: <FaMobileAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Word Counter", href: "/tools/wordcounter", desc: "Count words, characters, and more instantly.", icon: <FaHeart className="text-3xl text-blue-600 mb-3" /> },
  { name: "Color Picker", href: "/tools/colorpicker", desc: "Pick colors easily and get HEX/RGB codes.", icon: <FaShieldAlt className="text-3xl text-blue-600 mb-3" /> },
  { name: "Excel to PDF", href: "/tools/excelpdf", desc: "Convert Excel files into PDF quickly.", icon: <FaFilePdf className="text-3xl text-blue-600 mb-3" /> },
];

// Features Section (Why Choose Our Tool?)
const features = [
  { icon: <FaRegSmile className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Perfect Quality", desc: "Resize and compress your images at the highest quality." },
  { icon: <FaBolt className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Lightning Fast", desc: "Highly scalable tools that process your images within seconds." },
  { icon: <FaMobileAlt className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Easy To Use", desc: "Upload your image, set options, and download instantly." },
  { icon: <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Privacy Guaranteed", desc: "Secure 256-bit SSL. Files auto-deleted after a few hours." },
  { icon: <FaHeart className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Always Free", desc: "Millions of images processed — no watermarks, no signup." },
  { icon: <FaExpandIcon className="text-4xl text-blue-600 mx-auto mb-4" />, title: "Cross Platform", desc: "Use our tools on any device – mobile, tablet, or desktop." },
];

// Example static blog posts (replace with dynamic fetching later)
const blogPosts = [
  { title: "How to Compress Images Without Losing Quality", slug: "compress-images", date: "Oct 1, 2025" },
  { title: "10 Tips to Resize Images Online Easily", slug: "resize-images-tips", date: "Sep 28, 2025" },
  { title: "Convert Images to PDF in Seconds", slug: "convert-images-pdf", date: "Sep 20, 2025" },
];

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-0 flex-1 mt-[0px] bg-gray-50">
        {/* Tool Page Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">{children}</div>

        {/* Our Tools Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="flex justify-center items-center mb-3">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-4">{tool.desc}</p>
                  <Link href={tool.href} className="text-blue-600 font-medium hover:underline">Try Now →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Our Tool? */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Tool?</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition">
                {f.icon}
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
