// app/tools/resize/page.tsx
import ResizeTool from "./ResizeTool"; // client component import

export const metadata = {
  title: "Resize Image Online - Free Image Resizer Tool",
  description:
    "Resize your images online for free. Adjust width and height for JPG, PNG, and WebP without losing quality.",
  keywords: [
    "resize image",
    "resize jpg",
    "resize png",
    "resize webp",
    "online image resizer",
    "change image size",
  ],
  openGraph: {
    title: "Free Online Image Resizer",
    description:
      "Easily resize JPG, PNG, and WebP images online without losing quality.",
    url: "https://yourwebsite.com/tools/resize",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-resize.jpg",
        width: 1200,
        height: 630,
        alt: "Online Image Resizer Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <ResizeTool />;
}
