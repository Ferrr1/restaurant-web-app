import { createContext, useState } from "react";

const ThemeContext = createContext({});

const applyTheme = (theme, accent) => {
  const root = document.documentElement;

  // Apply theme
  root.classList.remove("light", "dark");
  root.classList.add(theme);

  // Apply accent
  root.classList.remove("accent-forest", "accent-ocean", "accent-purple");
  root.classList.add(accent);
};

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const storedAccent = localStorage.getItem("accentColor") || "accent-forest";
  applyTheme(storedTheme, storedAccent);
  return { theme: storedTheme, accent: storedAccent };
};

const ThemeProvider = ({ children }) => {
  const { theme: initialTheme, accent: initialAccent } = getInitialTheme();

  const [theme, setTheme] = useState(initialTheme);
  const [accent, setAccent] = useState(initialAccent);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme, accent);
    setTheme(newTheme);
  };

  const toggleChangeAccent = (newAccent) => {
    localStorage.setItem("accentColor", newAccent);
    applyTheme(theme, newAccent);
    setAccent(newAccent);
  };
  return (
    <ThemeContext.Provider
      value={{ theme, accent, toggleTheme, toggleChangeAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
