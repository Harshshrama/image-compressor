import PdfTool from "./PdfTool";

export const metadata = {
  title: "Convert Image to PDF Online - Free JPG/PNG to PDF",
  description:
    "Convert images to PDF online for free. Supports JPG, PNG, and WebP to PDF conversion without signup.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "convert image to pdf",
  ],
  openGraph: {
    title: "Free Image to PDF Converter",
    description:
      "Convert JPG, PNG, and WebP images into PDF documents online.",
    url: "https://yourwebsite.com/tools/pdf",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-pdf.jpg",
        width: 1200,
        height: 630,
        alt: "Image to PDF Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function Page() {
  return <PdfTool/>;
}