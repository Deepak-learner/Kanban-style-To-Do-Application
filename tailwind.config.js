/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {colors: {
      'custom-blue': '#5D8AA8',
      'button-orange': '#F28C28'
    },},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
