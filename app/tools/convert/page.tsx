import ConvertTool from "./ConvertTool"; // client component import

export const metadata = {
  title: "Convert Image Online - JPG, PNG, WebP Converter Free",
  description:
    "Convert images between JPG, PNG, and WebP formats online for free. Fast and secure image converter.",
  keywords: [
    "convert image",
    "jpg to png",
    "png to jpg",
    "webp to jpg",
    "online image converter",
  ],
  openGraph: {
    title: "Free Online Image Converter",
    description:
      "Convert JPG, PNG, and WebP images online easily without quality loss.",
    url: "https://yourwebsite.com/tools/convert",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-convert.jpg",
        width: 1200,
        height: 630,
        alt: "Image Converter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function Page() {
  return <ConvertTool/>;
}