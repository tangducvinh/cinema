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
      backgroundColor: {
        "[-input]": "rgb(241 241 242)",
        "[-primary]": "rgb(254, 44, 85)",
        "[-button-text]": "rgba(22, 24, 35, 0.03)",
        "[-button-primary]": "#F97316",
        "[-white-fake]": "#f8f8f8",
        "[-image-bg]": "rgba(0, 0, 0, 0.65)",
      },
      textColor: {
        "[text-color]": "#4a4a4a",

        "[text-primary]": "#F97316",
      },
      colors: {
        main: "#F97316",
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
