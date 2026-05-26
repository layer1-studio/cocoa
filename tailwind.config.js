/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#3e2723",
        "accent-gold": "#C8A951",
        "accent-cream": "#F5E6D3",
        "background-light": "#f7f7f6",
        "background-dark": "#1c1716",
      },
      fontFamily: {
        "display": ["Noto Serif", "serif"],
        "sans": ["Noto Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}
