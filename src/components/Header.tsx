import { FC, useContext, useState } from "react";
import ThemeIcon from "./ThemeIcon";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import LanguageIcon from "./LanguageIcon";
import { useTranslation } from "react-i18next";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Header: FC = () => {
  const { t } = useTranslation();
  const [activeLink, setActiveLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext)!;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        data-testid="header-component-id"
        className={`h-20 w-screen flex flex-row justify-between items-center px-3 sm:px-10 border-2 ${
          darkTheme
            ? "bg-gray-900 border-gray-800 text-white"
            : "bg-white border-neutral-200"
        }`}
      >
        <div className="sm:hidden h-6 w-6">
          <Bars3Icon
            data-testid="header-menu-icon-id"
            className={`h-8 w-8 text-black ${darkTheme ? "text-white" : ""}`}
            onClick={toggleMenu}
          />
        </div>

        {/* Links - Hidden on mobile, visible on larger screens */}
        <div
          data-testid="header-menu-id"
          className={`${
            isMenuOpen ? "flex z-50" : "hidden"
          } sm:flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 absolute sm:relative top-20 left-0 sm:top-0 w-full sm:w-auto sm:bg-transparent ${
            darkTheme ? "bg-gray-900" : "bg-white"
          } p-5 sm:p-0`}
        >
          <Link
            to="/"
            className={
              activeLink === "/" ? "" : "text-indigo-300 hover:text-indigo-500"
            }
            onClick={() => {
              setActiveLink("/");
              setIsMenuOpen(false);
            }}
          >
            {t("components.Header.homeLink")}
          </Link>
          <Link
            to="/details"
            className={
              activeLink === "/details"
                ? ""
                : "text-indigo-300 hover:text-indigo-500"
            }
            onClick={() => {
              setActiveLink("/details");
              setIsMenuOpen(false);
            }}
          >
            {t("components.Header.detailsLink")}
          </Link>
        </div>

        <div className="ml-auto flex flex-row gap-3 sm:gap-6">
          <LanguageIcon />
          <ThemeIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
