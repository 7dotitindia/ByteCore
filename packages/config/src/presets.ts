import type { SiteConfig } from "./schema";
import { defaultConfig } from "./defaults";

type PartialConfig = Partial<Omit<SiteConfig, "colors" | "typography">> & {
  colors?: Partial<SiteConfig["colors"]>;
  typography?: Partial<SiteConfig["typography"]>;
};

export const themePresets: Record<string, PartialConfig> = {
  editorial: {
    homepageLayout: "editorial",
    headerLayout: "standard",
    defaultTheme: "light",
    typography: { serif: "Source Serif 4" },
  },
  "dark-tech": {
    homepageLayout: "editorial",
    headerLayout: "minimal",
    defaultTheme: "dark",
    radius: "none",
  },
  "software-hub": {
    homepageLayout: "directory",
    headerLayout: "standard",
    defaultTheme: "light",
  },
  "minimal-blog": {
    homepageLayout: "news",
    headerLayout: "centered",
    footerLayout: "compact",
    defaultTheme: "light",
  },
};

/**
 * Resolution order: default config -> preset -> admin overrides.
 */
export function resolveConfig(
  presetName: keyof typeof themePresets | undefined,
  overrides: PartialConfig = {},
): SiteConfig {
  const preset = presetName ? themePresets[presetName] : {};

  return {
    ...defaultConfig,
    ...preset,
    ...overrides,
    colors: { ...defaultConfig.colors, ...preset.colors, ...overrides.colors },
    typography: {
      ...defaultConfig.typography,
      ...preset.typography,
      ...overrides.typography,
    },
    homepageSections: overrides.homepageSections ?? defaultConfig.homepageSections,
    navigation: overrides.navigation ?? defaultConfig.navigation,
    socialLinks: overrides.socialLinks ?? defaultConfig.socialLinks,
  };
}
