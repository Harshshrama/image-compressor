import type { Metadata } from "next";
import TextConverter from "./TextConverter"

export const metadata: Metadata = {
  title: "Text Case Converter – Uppercase, Lowercase, Capitalize Online Tool",
  description:
    "Free online Text Case Converter tool. Convert text to Uppercase, Lowercase, Capitalize, or Sentence case instantly. Fast, secure, and mobile-friendly.",
  keywords: [
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "capitalize text",
    "sentence case converter",
    "online text tool",
  ],
  openGraph: {
    title: "Text Case Converter – Free Online Tool",
    description:
      "Convert text to uppercase, lowercase, capitalize, or sentence case instantly.",
    url: "https://yourdomain.com/tools/text-case-converter",
    siteName: "Quotients",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Text Case Converter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Case Converter – Free Online Tool",
    description:
      "Convert text case instantly. Uppercase, Lowercase, Capitalize & more.",
    images: ["https://yourdomain.com/og-image.png"],
  },
  alternates: {
    canonical:
      "https://yourdomain.com/tools/text-case-converter",
  },
};
export default function Page() {
  return <TextConverter/>;
}
