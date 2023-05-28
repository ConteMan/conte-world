module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "black",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
};
