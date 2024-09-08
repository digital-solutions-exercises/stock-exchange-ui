import { useContext, useState } from "react";
import ThemeIcon from "./ThemeIcon";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import LanguageIcon from "./LanguageIcon";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState("/");
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <>
      <div
        data-testid="header-component-id"
        className={`h-20 w-screen flex flex-row justify-start items-center gap-3 sm:gap-6 pl-3 sm:pl-10 border-2 ${darkTheme ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-neutral-200"}`}
      >
        <Link
          to="/"
          className={activeLink === "/" ? undefined : "text-indigo-300"}
          onClick={() => setActiveLink("/")}
        >
          {t("components.Header.homeLink")}
        </Link>
        <Link
          to="/details"
          className={activeLink === "/details" ? undefined : "text-indigo-300"}
          onClick={() => setActiveLink("/details")}
        >
          {t("components.Header.detailsLink")}
        </Link>
        <div className="ml-auto flex flex-row absolute right-3 sm:right-10 gap-3 sm:gap-6">
          <LanguageIcon />
          <ThemeIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
