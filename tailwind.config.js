/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1d4ed8",
        secondary: "#000",
      },

      textColor: {
        primary: "#1d4ed8",
        secondary: "#000",
      },
      colors: {
        primary: "#1d4ed8",
        secondary: "#000",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
