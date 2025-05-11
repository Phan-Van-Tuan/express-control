/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // hoặc 'media'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ecc71", // Thêm màu primary vào theme
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
