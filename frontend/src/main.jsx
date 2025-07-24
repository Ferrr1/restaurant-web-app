import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import { NotifyProvider } from "./context/NotifyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <NotifyProvider>
          <App />
        </NotifyProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
