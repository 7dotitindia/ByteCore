export const colors = {
  light: {
    bg: "#F5F1EB",
    bgSecondary: "#FFFFFF",
    text: "#111111",
    textSecondary: "#686868",
    graphite: "#1A1A1A",
    border: "#E5E0D8",
    accent: "#E87535",
  },
  dark: {
    bg: "#0D0D0D",
    bgSecondary: "#171717",
    text: "#F5F1EB",
    textSecondary: "#A4A4A4",
    border: "#292929",
    accent: "#E87535",
  },
} as const;

export const fonts = {
  sans: "var(--font-sans)",
  serif: "var(--font-serif)",
} as const;

export const radii = {
  none: "0px",
  sm: "2px",
  md: "4px",
  lg: "6px",
} as const;

export const themePresets = [
  "editorial",
  "dark-tech",
  "software-hub",
  "minimal-blog",
] as const;

export type ThemePreset = (typeof themePresets)[number];
