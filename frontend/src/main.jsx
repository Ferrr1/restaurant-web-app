import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import { NotifyProvider } from "./context/NotifyContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <NotifyProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </NotifyProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
