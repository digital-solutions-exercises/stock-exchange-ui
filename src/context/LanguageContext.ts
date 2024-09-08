import { createContext, Dispatch, SetStateAction } from "react";
import { LanguageType } from "../constants/languages";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export default LanguageContext;
