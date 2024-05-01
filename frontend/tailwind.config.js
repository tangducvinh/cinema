module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        "[-500]": "500px",
        "[-435]": "435px",
      },
      width: {
        "[-1500]": "1500px",
        "[-290]": "290px",
        "[-500]": "500px",
      },
      textColor: {
        "[text-color]": "#4a4a4a",

        "[text-primary]": "#F97316",
      },
      fontSize: {
        "[-16]": "16px",
        "[-14]": "14px",
        "[-18]": "18px",
        "[-20]": "20px",
      },
      borderRadius: {
        "[-92]": "92px",
        "[-8]": "8px",
        "[-50%]": "50%",
      },
    },
  },
  plugins: [],
};
