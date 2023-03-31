/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gridView: "repeat(auto-fit, minmax(15rem, 1fr))"
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        navBg: "#E7E7E7",
        borderModal: "#A9A9A9",
        borderTextField: "#B8B8B8",
        headTableBg: "#B9B9B9",
        authIconBg: "#D9D9D9",
      },
      boxShadow: {
        shadowModal: "8px 8px 4px rgba(0, 0, 0, 0.4)"
      }

    },
  },
  plugins: [],
}
