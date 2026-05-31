import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          deep: "#050810",
          base: "#0a0f1a",
          raised: "#111827",
          card: "#151d2e",
          hover: "#1a2438",
        },
        accent: {
          DEFAULT: "#6366f1",
          bright: "#818cf8",
        },
        cyan: {
          signal: "#22d3ee",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
