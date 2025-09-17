// app/blog/[slug]/page.jsx
import React from "react";
import { notFound } from "next/navigation";

// ✅ Blog Data (ready SEO blogs)
const blogs = {
  "image-compression": {
    title: "Best Free Online Image Compressor Tools in 2025",
    description:
      "Learn how to compress images online without losing quality. Boost your website speed and SEO with free tools.",
    content: `
## Why Image Compression is Important?
Large images slow down websites. Compression reduces file size while keeping good quality.

### Benefits:
- Faster website loading
- Better SEO ranking
- Easy sharing & uploads

### How to Compress Images Online?
1. Go to our free [Image Compressor Tool](/).
2. Upload your image (JPG, PNG, WebP supported).
3. Click **Compress** and download optimized file.

👉 Perfect for bloggers, e-commerce owners, and developers.
    `,
  },

  "resize-image": {
    title: "How to Resize Images for Social Media (Instagram, FB, LinkedIn)",
    description:
      "Resize images online for Instagram, Facebook, and LinkedIn without losing quality.",
    content: `
## Why Resize Images?
Different platforms require different image sizes. Our resize tool makes it simple.

### Popular Sizes:
- Instagram Post: 1080x1080
- LinkedIn Banner: 1584x396
- Facebook Cover: 820x312

### Steps:
1. Visit [Resize Tool](/tools/resize).
2. Upload your photo.
3. Enter width & height → Download.

👉 Great for content creators and social media managers.
    `,
  },

  "convert-image": {
    title: "Convert Images Online: JPG, PNG, WebP in Seconds",
    description:
      "Convert JPG to PNG, PNG to JPG, or any image format quickly online without software.",
    content: `
## Why Convert Images?
Some websites accept only specific formats. Conversion helps in compatibility.

### Supported Formats:
- JPG → PNG
- PNG → JPG
- JPG/PNG → WebP

### Steps:
1. Open [Image Converter Tool](/tools/convert).
2. Upload image.
3. Select output format & download.

👉 Save time and avoid installing heavy apps.
    `,
  },

  "crop-image": {
    title: "Crop Images Online – Free & Easy Tool",
    description:
      "Crop any image online to adjust focus, aspect ratio, or remove background space easily.",
    content: `
## Why Crop Images?
Cropping helps highlight the subject, remove unwanted areas, and improve visuals.

### Use Cases:
- Passport photos
- Profile pictures
- Product images

### Steps:
1. Go to [Crop Tool](/tools/crop).
2. Upload your image.
3. Drag & select area → Download.

👉 Designers and students love this simple cropping tool.
    `,
  },

  "image-to-pdf": {
    title: "Convert Image to PDF Online – Free & Fast",
    description:
      "Turn JPG, PNG, or WebP into PDF instantly without installing software.",
    content: `
## Why Convert Image to PDF?
PDF format is secure, easy to share, and required in many official works.

### Features:
- Combine multiple images into one PDF
- Works with JPG, PNG, WebP
- No watermark, free forever

### Steps:
1. Use our [Image to PDF Tool](/tools/pdf).
2. Upload your images.
3. Click Convert → Download PDF.

👉 Perfect for resumes, ID proofs, and official documents.
    `,
  },

  "image-to-text": {
    title: "Extract Text from Images Online (OCR Tool)",
    description:
      "Use OCR (Optical Character Recognition) to extract text from images easily online.",
    content: `
## Why Image to Text?
OCR saves time when you need to copy text from scanned images, documents, or notes.

### Supported Use Cases:
- Extract text from documents
- Convert handwritten notes to text
- Copy text from screenshots

### Steps:
1. Visit [Image to Text Tool](/tools/ocr).
2. Upload image with text.
3. Get extracted text instantly.

👉 Students, teachers, and professionals benefit the most from OCR.
    `,
  },
};

export default function BlogPage({ params }) {
  const { slug } = params;
  const blog = blogs[slug];

  if (!blog) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{blog.description}</p>
      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}
