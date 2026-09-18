import type { Config } from "tailwindcss";

/* Tailwind is deliberately thin here: the design system lives in
   CSS custom properties (app/globals.css). Tailwind covers one-off
   utilities only, so the art direction stays in one readable place. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      transitionTimingFunction: { editorial: "cubic-bezier(0.16, 1, 0.3, 1)" },
      maxWidth: { page: "1640px" },
    },
  },
  plugins: [],
};
export default config;
