"use client";


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
} from "react-icons/fa";

const tools = [
  {
    name: "Compressor Image",
    href: "/tools/compressor",
    desc: "Compress images without losing quality.",
    icon: <FaCompressArrowsAlt className="text-3xl text-blue-600 mb-3" />,
  },
  {
    name: "Resize Image",
    href: "/tools/resize",
    desc: "Easily resize images online.",
    icon: <FaExpandArrowsAlt className="text-3xl text-blue-600 mb-3" />,
  },
  {
    name: "Convert Image",
    href: "/tools/convert",
    desc: "Convert images between formats like JPG, PNG, etc.",
    icon: <FaExchangeAlt className="text-3xl text-blue-600 mb-3" />,
  },
  {
    name: "Crop Image",
    href: "/tools/crop",
    desc: "Crop your images instantly.",
    icon: <FaCrop className="text-3xl text-blue-600 mb-3" />,
  },
  {
    name: "Image to PDF",
    href: "/tools/pdf",
    desc: "Convert images into PDF files.",
    icon: <FaFilePdf className="text-3xl text-blue-600 mb-3" />,
  },
  {
    name: "Image to Text",
    href: "/tools/ocr",
    desc: "Extract text from images using OCR.",
    icon: <FaFileAlt className="text-3xl text-blue-600 mb-3" />,
  },
];

const features = [
  {
    icon: <FaRegSmile className="text-4xl text-blue-600 mx-auto mb-4" />,
    title: "Perfect Quality",
    desc: "Resize and compress your images at the highest quality.",
  },
  {
    icon: <FaBolt className="text-4xl text-blue-600 mx-auto mb-4" />,
    title: "Lightning Fast",
    desc: "Highly scalable tools that process your images within seconds.",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-blue-600 mx-auto mb-4" />,
    title: "Easy To Use",
    desc: "Upload your image, set options, and download instantly.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />,
    title: "Privacy Guaranteed",
    desc: "Secure 256-bit SSL. Files auto-deleted after a few hours.",
  },
  {
    icon: <FaHeart className="text-4xl text-blue-600 mx-auto mb-4" />,
    title: "Always Free",
    desc: "Millions of images processed — no watermarks, no signup.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          All-in-One Online Image Tools
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Compress, resize, convert, and edit images in seconds. Free & easy to
          use!
        </p>
        <Link
          href="/tools/compressor"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>

{/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center items-center mb-3">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.desc}</p>
                <Link
                  href={tool.href}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Try Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            ...features,
            {
              icon: <FaExpandArrowsAlt className="text-4xl text-blue-600 mx-auto mb-4" />,
              title: "Cross Platform",
              desc: "Use our tools on any device – mobile, tablet, or desktop.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Upload your image",
              "Choose your tool & settings",
              "Download instantly",
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md"
              >
                <span className="text-4xl font-bold text-blue-600">
                  {i + 1}
                </span>
                <p className="mt-4 text-gray-700">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Is it free to use?</h3>
              <p className="text-gray-600">
                Yes, all tools are 100% free to use without sign-up.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Will my images be safe?</h3>
              <p className="text-gray-600">
                Yes, your images are processed securely and never stored
                permanently.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Do I need to install software?</h3>
              <p className="text-gray-600">
                No, everything works online directly from your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Edit Your Images?
        </h2>
        <p className="mb-8 text-lg">
          Start using our free tools today. No signup required!
        </p>
        <Link
          href="/tools/compressor"
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        >
          Get Started Free →
        </Link>
      </section>
    </main>
  );
}
