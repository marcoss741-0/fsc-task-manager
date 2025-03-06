/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          "dark-blue": "#35383e",
          primary: "#00ADB5",
          "dark-gray": "#818181",
          "text-gray": "#9A9C9F",
          "light-gray": "#EEEEEE",
          wihte: "#FFFFFF",
          background: "#F8F8F8",
          process: "#FFAA04",
          danger: "#EF4444",
        },
      },
    },
    plugins: [],
  },
};
