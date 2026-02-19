import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        bold: "700",
        black: "900",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tactech: {
          dark: "#2D1640",
          primary: "#4B2E7B",
          mid: "#6F45B8",
          accent: "#8454DE",
          light: "#D2C1EE",
          mint: "#72E6AD",
        },
      },
    },
  },
  plugins: [],
};
export default config;
