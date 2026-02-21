import lineClamp from "@tailwindcss/line-clamp";

module.exports = {
  plugins: [lineClamp],
  theme: {
    extend: {
      transitionDuration: {
        5000: "5000ms",
      },
    },
  },
};
