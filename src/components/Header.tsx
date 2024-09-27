import { FC, useContext, useEffect, useState } from "react";
import ThemeIcon from "./ThemeIcon";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import LanguageIcon from "./LanguageIcon";
import { useTranslation } from "react-i18next";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { ActiveLinkType } from "../App";

const Header: FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext)!;
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (link: ActiveLinkType) => {
    setActiveLink(link);
    sessionStorage.setItem("activeLink", link);
  };

  useEffect(() => {
    const storedActiveLink = sessionStorage.getItem("activeLink");

    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

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
        <Link
          to="/"
          className="sm:hidden h-8 w-auto"
          onClick={() => handleLinkClick("/")}
        >
          <img
            data-testid="dubak-logo-id"
            src={
              darkTheme
                ? "/images/dubak-logo-dark.png"
                : "/images/dubak-logo-white.png"
            }
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        <div className="sm:hidden h-6 w-6">
          <Bars3Icon
            data-testid="header-menu-icon-id"
            className="h-8 w-8 text-black text-indigo-600"
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
            className={`hidden sm:block
              ${
                activeLink === "/"
                  ? "text-indigo-600 font-bold"
                  : "text-indigo-300 hover:text-indigo-500"
              }`}
            onClick={() => handleLinkClick("/")}
          >
            <img
              data-testid="dubak-logo-id"
              src={
                darkTheme
                  ? "/images/dubak-logo-dark.png"
                  : "/images/dubak-logo-white.png"
              }
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
          <Link
            to="/details"
            className={
              activeLink === "/details"
                ? "text-indigo-600 font-bold"
                : "text-indigo-300 hover:text-indigo-500"
            }
            onClick={() => handleLinkClick("/details")}
          >
            {t("components.Header.detailsLink")}
          </Link>
          <Link
            to="/contact-us"
            className={
              activeLink === "/contact-us"
                ? "text-indigo-600 font-bold"
                : "text-indigo-300 hover:text-indigo-500"
            }
            onClick={() => handleLinkClick("/contact-us")}
          >
            {t("components.Header.contactUsLink")}
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
