import TextOverlayTool from "./TextOverlayTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Overlay / Watermark Tool - MyImageTools",
  description: "Add custom text or watermark to images online for free. Simple and fast tool by MyImageTools.",
  keywords: "Text Overlay, Watermark, Image Editor, Free Online Tool, MyImageTools",
};

export default function Page() {
  return <TextOverlayTool />;
}
