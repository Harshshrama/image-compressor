import QrcodeTool from "./QrcodeTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - MyImageTools",
  description: "Generate QR Codes online for URLs, text, or anything. Free QR code generator tool by MyImageTools.",
  keywords: "QR Code Generator, QR Code Online, Free QR Generator, MyImageTools",
};

export default function Page() {
  return <QrcodeTool />;
}
