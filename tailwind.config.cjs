/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        ocean: {
          50:  "#f2f9ff",
          100: "#e6f2ff",
          200: "#bfe0ff",
          300: "#99ceff",
          400: "#4daaff",
          500: "#0087ff",
          600: "#006bd1",
          700: "#0053a3",
          800: "#003c75",
          900: "#002547",
        },
        iceberg: {
          50: "#f4fbff",
          100: "#e9f7ff",
          200: "#c8ecff",
          300: "#a8e1ff",
          400: "#67ccff",
          500: "#26b8ff",
          600: "#1e92cc",
          700: "#176d99",
          800: "#0f4766",
          900: "#082233",
        },
      },
    },
  },
  plugins: [],
};
