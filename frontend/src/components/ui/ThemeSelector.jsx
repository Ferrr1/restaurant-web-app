import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeSelector = () => {
  const { theme, toggleTheme, accent, toggleChangeAccent } =
    useContext(ThemeContext);
  const accentColors = [
    {
      name: "Forest",
      value: "accent-forest",
      color: "#39e079",
    },
    {
      name: "Ocean",
      value: "accent-ocean",
      color: "#0c92f2",
    },
    {
      name: "Purple",
      value: "accent-purple",
      color: "#731fc7",
    },
  ];

  return (
    <>
      {/* Acccent Selector */}
      <div className="bg-surface p-4 rounded-xl">
        <div className="flex gap-20 py-2 border-b-2 border-border last:border-b-0">
          <div>
            <h2 className="text-sm text-text font-semibold">Accent Color</h2>
            <p className="text-sm text-text/50">
              Select or change your accent color
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {accentColors.map(({ name, value, color }, key) => (
              <button
                key={key}
                onClick={() => toggleChangeAccent(value)}
                className={`flex border border-border items-center gap-2 p-4 rounded-md shadow-md ${
                  accent === value
                    ? "bg-secondary text-text-accent"
                    : " text-text"
                } cursor-pointer transition-colors duration-200 ease-in-out`}
              >
                <p className="text-sm font-semibold">{name}</p>
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              </button>
            ))}
          </div>
        </div>
        {/* Theme Selector */}
        <div className="flex gap-20 py-2 border-b-2 border-border last:border-b-0">
          <div>
            <h2 className="text-sm text-text font-semibold">Theme Color</h2>
            <p className="text-sm text-text/50">
              Select or change your theme color
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={toggleTheme}
              className={`relative top-2.5 w-16 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
                theme === "dark" ? "bg-secondary" : "bg-primary/20"
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-surface rounded-full shadow-md transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
              />

              <div className="w-full flex justify-around gap-2 items-center z-10">
                <FaSun
                  className={`text-yellow-500 text-sm transition-opacity ${
                    theme === "dark" ? "opacity-0" : "opacity-100"
                  }`}
                />
                <FaMoon
                  className={`text-indigo-500 text-sm transition-opacity ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSelector;
