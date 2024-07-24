/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "450px",
        md: "800px",
      },
      backgroundColor: {
        "button-hover": "var(--hover-bg-color)",
      },
      textColor: {
        "button-hover": "var(--hover-text-color)",
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": "1.2vw",
        "4xs": "4vw",
        "5xs": "1.3vw",
      },
      lineHeight: {
        4.5: "1.125rem",
      },
      padding: {
        4.5: "1.125rem",
      },
      rotate: {
        25: "25deg",
      },
      spacing: {
        100: "61vw",
        150: "29vw",
        400: "42vw",
        200: "40rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
      textColor: ["group-hover"],
    },
  },
  plugins: [],
};
