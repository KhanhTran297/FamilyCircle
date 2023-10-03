/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
      },
      backgroundColor: {
        tab: "rgba(31, 31, 31)",
        menu: "rgba(167, 53, 116, 0.08)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans"],
      },
      boxShadow: {
        search: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        mobile: "0px 4px 16px 1px rgba(8, 53, 141, 0.16)",
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
      };

      addUtilities(gradients, ["backgroundColor"]);
    },
  ],
};
