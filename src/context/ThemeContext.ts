import { createContext, Dispatch, SetStateAction } from "react";

interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
