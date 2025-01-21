import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
// Ensure you have the store file correctly set up
import theme from "./styles/theme.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </ThemeProvider>
);
