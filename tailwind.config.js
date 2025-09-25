export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#465EFF",
        yellow: "#FCFC30",
        graybb: "#333333",
      },
      fontFamily: {
        body: ["BancoDoBrasil", "sans-serif"],
        title: ["BancoDoBrasilTitle", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
