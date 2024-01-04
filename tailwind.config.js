/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pos: {
          primary: "#202124",
          secondary: "#323232",
          accent: "#33FF9C",
          neutral: "#0d0807",
          "base-100": "#202124",
          info: "#008eb7",
          success: "#00cc90",
          warning: "#f5751a",
          error: "#ff4670",
        },
      },
    ],
  },
};
