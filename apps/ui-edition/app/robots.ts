import type { MetadataRoute } from "next";
import { defaultConfig } from "@bytescope/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
