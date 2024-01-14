import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: "#0D0C22"
        },
        gray: {
          400: "#565564"
        },
      },
      boxShadow: {
        "3xl": "0 0 0 4px rgba(234,100,217,0.1)"
      }
    },
    fontFamily: {
      mona: ["var(--font-mona)"]
    }
  },
};
export default config;
