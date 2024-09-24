import { FC, useEffect, useState } from "react";
import { languages, LanguageType } from "../config/languages";
import i18n from "../i18n";

const LanguageIcon: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState(languages[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (language: LanguageType) => {
    setLanguage(language);
    sessionStorage.setItem("language", JSON.stringify(language));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const selectedLanguage = sessionStorage.getItem("language");

    if (selectedLanguage) {
      setLanguage(JSON.parse(selectedLanguage));
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language.code);
  }, [language]);

  return (
    <div className="relative cursor-pointer">
      <button
        className={`border-1 border-neutral-400 ${isDropdownOpen ? "rounded-t-lg" : "rounded-lg"} p-1 shadow-lg`}
        onClick={toggleDropdown}
        aria-label="Toggle language dropdown"
      >
        <img
          src={language.flag}
          alt={`${language.name} flag`}
          className="h-6 w-6 sm:h-10 sm:w-10"
        />
      </button>
      {isDropdownOpen && (
        <ul className="absolute top-8 sm:top-12 left-0 bg-white border-1 rounded-b-lg border-neutral-400 shadow-lg w-full z-40">
          {languages.map((language) => (
            <li
              key={language.code}
              className="flex items-center gap-2 p-1 hover:bg-neutral-200"
              onClick={() => selectLanguage(language)}
            >
              <img
                src={language.flag}
                alt={`${language.name} flag`}
                className="h-6 w-6 sm:h-10 sm:w-10"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageIcon;
