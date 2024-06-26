/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontSize: {
        title: [
          " 1.375rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "500",
          },
        ],
        titleModal: [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "400",
          },
        ],
      },
      backgroundColor: {
        editModal: "var(--light-surfaces-1, #FFF8F8)",
        tab: "rgba(31, 31, 31)",
        menu: "rgba(167, 53, 116, 0.08)",
        tabProfile: "rgba(31, 31, 31, 0.08)",
        modal: "rgba(0, 0, 0, 0.32)",
        menuOption: "rgba(31, 26, 28, 0.08)",
        buttonHoverLight: "rgba(167, 53, 116, 0.08)",
        disableButton: "rgba(0, 0, 0, 0.12)",
        buttonHoverDark: "rgba(255, 175, 213, 0.08)",
        bgAuthenPage: "linear-gradient(180deg, #FC3872 0%, #75D3FB 100%)",
        buttonSubmit: "var(--light-primary-primary, #A73574)",
        bgErrorButton: "rgba(186, 26, 26, 0.08)",
        bgButtonHover: "rgba(0, 0, 0, 0.08)",
        bgViewmore:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), #A73574;     ",
      },
      fontFamily: {
        roboto: ["Roboto", "sans"],
      },
      boxShadow: {
        search: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        mobile: "0px 4px 16px 1px rgba(8, 53, 141, 0.16)",
        modal:
          "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
        tile: " 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
        buttonHover:
          "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
        formAuthen: "0px 0px 64px 0px #A4E3FF",
        boxSettingComment:
          "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
      },
      borderRadius: {
        messageOther: "4px 18px 18px 4px",
        messageOwn: "18px 4px 4px 18px",
      },
      colors: {
        primary: "#FFD8E8",
        secondary: "#FFF8F8",
        light_surface_on_surface: "#1F1A1C",
        disableButton: "rgba(0, 0, 0, 0.38)",
        light_surface_on_surface_variant: "#504348",
        search: "rgb(131, 128, 128)",
        seacrhFill: "rgb(91, 107, 255)",
        inputFocus: "rgb(91, 107, 255)",
      },
      textColor: {
        light: "#1F1A1C",
      },
      screens: {
        desktop: "1320px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const gradients = {
        ".bg-post": {
          backgroundImage:
            "linear-gradient(0deg, #FFF8F8 0%, rgba(255, 248, 248, 0.00) 100%)",
        },
        ".buttonHover": {
          backgroundImage:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%)",
        },
        ".bg-authen-page": {
          backgroundImage: "linear-gradient(180deg, #FC3872 0%, #75D3FB 100%)",
        },
        ".bg-button-hover-light": {
          backgroundColor:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), #A73574;",
        },

        ".bg-button-submit-light": {
          backgroundColor: "var(--light-primary-primary, #A73574)",
        },
        ".border-button-submit-light": {
          borderColor: "var(--light-outline-outline, #827379)",
        },
        ".text-button-submit-light": {
          color: "var(--light-primary-primary, #A73574)",
        },
      };

      addUtilities(gradients, ["backgroundColor"]);
    },
  ],
};
