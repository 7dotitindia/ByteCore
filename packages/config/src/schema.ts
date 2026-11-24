import { z } from "zod";

export const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["twitter", "linkedin", "github", "youtube", "rss"]),
  url: z.string().url(),
});

export const homepageSectionId = z.enum([
  "hero",
  "latest",
  "trending",
  "software-spotlight",
  "ai-innovation",
  "reviews-comparisons",
  "tutorials",
  "newsletter",
]);

export const siteConfigSchema = z.object({
  siteName: z.string().default("ByteScope"),
  tagline: z.string().default("Technology, in perspective."),
  logo: z.string().default("/brand/logo.svg"),
  favicon: z.string().default("/favicon.ico"),

  colors: z.object({
    primary: z.string().default("#111111"),
    accent: z.string().default("#E87535"),
  }),

  typography: z.object({
    sans: z.string().default("Inter"),
    serif: z.string().optional(),
  }),

  radius: z.enum(["none", "sm", "md", "lg"]).default("sm"),

  headerLayout: z.enum(["standard", "centered", "minimal"]).default("standard"),
  footerLayout: z.enum(["standard", "compact", "expanded"]).default("standard"),
  homepageLayout: z.enum(["editorial", "news", "directory"]).default("editorial"),

  navigation: z.array(navLinkSchema).default([]),
  socialLinks: z.array(socialLinkSchema).default([]),

  defaultTheme: z.enum(["light", "dark"]).default("light"),

  homepageSections: z
    .array(
      z.object({
        id: homepageSectionId,
        visible: z.boolean().default(true),
      }),
    )
    .default([]),

  adsEnabled: z.boolean().default(true),

  analytics: z
    .object({
      provider: z.enum(["none", "plausible", "ga4"]).default("none"),
      id: z.string().optional(),
    })
    .default({ provider: "none" }),

  adsense: z
    .object({
      publisherId: z.string().optional(),
    })
    .default({}),

  siteUrl: z.string().url().default("https://example.com"),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type NavLink = z.infer<typeof navLinkSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
