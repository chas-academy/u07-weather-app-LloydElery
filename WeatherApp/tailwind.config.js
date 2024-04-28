/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-yellow": "#f3d38a",
      },
      backgroundImage: {
        defult: "url('src/assets/background.svg')",
      },
    },
  },
  plugins: [],
};
