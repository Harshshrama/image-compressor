import OcrTool from "./OcrTool";

export const metadata = {
  title: "Image to Text Online - Free OCR Tool",
  description:
    "Extract text from images online using OCR. Convert JPG, PNG, and scanned documents into editable text.",
  keywords: [
    "image to text",
    "ocr online",
    "extract text from image",
    "jpg to text",
    "png to text",
  ],
  openGraph: {
    title: "Free OCR - Extract Text from Images",
    description:
      "Convert images (JPG, PNG, WebP) to editable text using OCR online for free.",
    url: "https://yourwebsite.com/tools/ocr",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-ocr.jpg",
        width: 1200,
        height: 630,
        alt: "Image to Text OCR Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function Page() {
  return <OcrTool/>;
}