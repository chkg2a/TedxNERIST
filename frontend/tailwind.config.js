/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans these files
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        muted: "var(--text-muted)",
        textred: "var(--textred)",
        tedxred: "var(--tedxred)",
      },
      fontFamily: {
        cirka: ["var(--textfont)", "serif"],
        gilroy: ["var(--headerfont)", "sans-serif"],
        mono: ["var(--titlefont)", "monospace"],
      },
      animation: {
        fadeOut: "fadeOut 1s ease-out forwards",
        "blur-in": "blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1.5)" },
        },
        blurIn: {
          "0%": { opacity: 0, filter: "blur(10px)", transform: "translateY(20px)" },
          "100%": { opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
