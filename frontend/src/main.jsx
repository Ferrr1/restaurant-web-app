import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import { NotifyProvider } from "./context/NotifyContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <NotifyProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </QueryClientProvider>
          </CartProvider>
        </NotifyProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
