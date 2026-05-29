import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#071014",
          900: "#0D1B1E",
          850: "#111827",
        },
        neon: {
          mint: "#00FFC6",
          cyan: "#00D9FF",
          green: "#14F195",
        },
      },
      boxShadow: {
        glow: "0 0 34px rgba(0, 255, 198, 0.16)",
        "glow-cyan": "0 0 42px rgba(0, 217, 255, 0.15)",
      },
      backgroundImage: {
        "radial-premium":
          "radial-gradient(circle at 18% 8%, rgba(0, 255, 198, 0.14), transparent 28%), radial-gradient(circle at 90% 18%, rgba(0, 217, 255, 0.13), transparent 30%), linear-gradient(180deg, #071014 0%, #0D1B1E 46%, #071014 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
