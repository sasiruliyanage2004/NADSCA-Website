import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        azure: {
          DEFAULT: "#0099FF",
          light: "#38BDF8",
          navy: "#0A2051",
        },
        primary: {
          DEFAULT: "#0099FF",
          hover: "#0070F3",
        },
        teal: {
          DEFAULT: "#06B6D4",
        },
        lime: {
          DEFAULT: "#22C55E",
          light: "#4ADE80",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(100deg, #0099FF 0%, #06B6D4 45%, #22C55E 100%)",
        "brand-gradient-soft": "linear-gradient(120deg, rgba(0,153,255,0.12) 0%, rgba(6,182,212,0.10) 45%, rgba(34,197,94,0.12) 100%)",
        "nadsca-gradient": "linear-gradient(135deg, #00A3FF 0%, #0284C7 40%, #10B981 80%, #22C55E 100%)",
        "ink-gradient": "linear-gradient(160deg, #090A0F 0%, #171922 100%)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(11,30,61,0.06), 0 12px 32px -18px rgba(11,30,61,0.25)",
      },
      maxWidth: {
        content: "1240px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;


