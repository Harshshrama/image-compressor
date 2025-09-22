import { Metadata } from "next";
import ColorpickerTool from "./ColorpickerTool";

/* -------- SEO Config -------- */
export const metadata: Metadata = {
  title: "🎨 Online Color Picker Tool | Pick & Copy Colors Instantly",
  description:
    "Free online color picker tool. Choose colors, preview instantly, and copy HEX codes with one click. Perfect for designers, developers, and creators.",
  keywords: [
    "color picker",
    "online color picker",
    "HEX color code",
    "copy color code",
    "color generator",
    "web design tools",
  ],
  openGraph: {
    title: "🎨 Online Color Picker Tool",
    description:
      "Pick, preview, and copy color codes instantly with our free online tool.",
    url: "https://yourwebsite.com/tools/colorpicker",
    type: "website",
  },
};

/* -------- Page Render -------- */
export default function Page() {
  return <ColorpickerTool />;
}
