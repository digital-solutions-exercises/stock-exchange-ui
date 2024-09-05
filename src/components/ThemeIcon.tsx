import { useContext } from "react";
import { MoonIcon } from "@heroicons/react/24/solid";
import ThemeContext from "../context/ThemeContext";

const ThemeIcon = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)!;
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-3 sm:right-10 shadow-lg ${darkTheme ? "shadow-gray-100" : null}`}
      onClick={toggleDarkTheme}
      aria-label="Toggle theme"
    >
      <MoonIcon
        data-testid="theme-icon-id"
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${darkTheme ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-neutral-400"}`}
      />
    </button>
  );
};

export default ThemeIcon;
