// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2rem" },
    h2: { fontSize: "1.5rem" },
    body1: { fontSize: "1rem" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
