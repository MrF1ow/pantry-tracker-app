import { createTheme } from "@mui/material/styles";

// Typography settings
const typography = {
  fontFamily: "Ubuntu, sans-serif",
};

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFA500",
    },
    secondary: {
      main: "#FFD700",
    },
    background: {
      default: "rgb(var(--background-start-rgb))",
      paper: "rgb(var(--tile-start-rgb))",
    },
    text: {
      primary: "rgb(var(--foreground-rgb))",
      secondary: "rgb(var(--secondary-foreground-rgb))",
    },
  },
  typography,
});

export { lightTheme };
