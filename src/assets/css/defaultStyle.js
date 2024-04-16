export default {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
    zIndex: 1000,
    maxWidth: "100%",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
      maxWidth: "100%",
    },
    highlighter: {
      padding: 9,
      maxWidth: "100%",
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
      zIndex: 100,
      maxWidth: "100%",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    zIndex: 1000,
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
