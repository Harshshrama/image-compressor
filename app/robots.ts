// app/robots.ts

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"], // sensitive cheeze block
    },
    sitemap: "https://image-compressor-kohl-kappa.vercel.app/sitemap.xml",
  };
}
