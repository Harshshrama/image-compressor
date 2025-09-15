import Home from "./Home"; // client component import

// ✅ SEO metadata only here
export const metadata = {
  title: "Free Online Image Compressor - Reduce Image Size (JPG, PNG, WebP)",
  description:
    "Compress and resize your images online for free. Reduce JPG, PNG, and WebP file sizes (MB ⇆ KB) without losing quality.",
  keywords: [
    "image compressor",
    "compress jpg",
    "compress png",
    "resize image",
    "reduce image size",
    "image tools online",
    "convert image mb to kb",
  ],
  openGraph: {
    title: "Free Online Image Compressor - Reduce Image Size",
    description:
      "Compress and resize your images online for free. Supports JPG, PNG, and WebP formats.",
    url: "https://yourwebsite.com/",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Image Compressor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <Home />;
}
