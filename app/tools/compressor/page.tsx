// app/tools/compressor/seo.ts
import CompresTool from "./CompresTool";
export const compressorMetadata = {
  title: "Image Compressor Online - Free JPG, PNG, WebP Tool",
  description:
    "Compress and resize your images (JPG, PNG, WebP) quickly online. Reduce image size from MB to KB or increase quality. 100% Free, Fast & Secure.",
  keywords: [
    "Image Compressor",
    "Compress JPG",
    "Compress PNG",
    "Compress WebP",
    "Online Image Tool",
    "Reduce Image Size",
  ],
  openGraph: {
    title: "Image Compressor - Free JPG, PNG, WebP Tool",
    description:
      "Free online tool to compress JPG, PNG, WebP images. Resize MB ⇆ KB instantly with high quality output.",
    url: "https://yourdomain.com/tools/compressor",
    type: "website",
  },
};
export default function Page() {
  return <CompresTool/>;
}
