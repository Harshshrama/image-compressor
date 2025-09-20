import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://image-compressor-kohl-kappa.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/resize`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/convert`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/crop`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools/ocr`,
      lastModified: new Date(),
    },
  ];
}
