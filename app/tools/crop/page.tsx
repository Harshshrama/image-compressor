import CropTool from "./CropTool";
export const metadata = {
  title: "Crop Image Online - Free Photo Crop Tool",
  description:
    "Crop your images online for free. Adjust and cut JPG, PNG, and WebP images to the perfect size.",
  keywords: [
    "crop image",
    "crop photo",
    "crop jpg",
    "crop png",
    "online image cropper",
  ],
  openGraph: {
    title: "Free Online Image Cropper",
    description:
      "Crop and adjust JPG, PNG, and WebP images online for free.",
    url: "https://yourwebsite.com/tools/crop",
    siteName: "ImageTools",
    images: [
      {
        url: "https://yourwebsite.com/og-crop.jpg",
        width: 1200,
        height: 630,
        alt: "Image Cropper Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function Page() {
  return <CropTool/>;
}