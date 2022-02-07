module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        phone: "420px",
      },
      fontFamily: {
        body: ["Open Sans"],
      },
      minHeight: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        192: "48rem",
        224: "56rem",
        256: "64rem",
        288: "72rem",
        320: "80rem",
        384: "96rem",
        416: "112rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
