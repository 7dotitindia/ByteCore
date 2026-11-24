import type { Config } from "tailwindcss";

export const tailwindPreset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        graphite: "var(--color-graphite)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      maxWidth: {
        article: "42rem",
        content: "72rem",
      },
    },
  },
};

export default tailwindPreset;
