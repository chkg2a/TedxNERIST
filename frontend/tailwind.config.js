/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans these files
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        textred: "var(--textred)",
        tedxred: "var(--tedxred)",
      },
      animation: {
        fadeOut: "fadeOut 1s ease-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1.5)" },
        },
      },
    },
  },
  plugins: [],
};
