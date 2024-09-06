import { useContext, useState } from "react";
import ThemeIcon from "./ThemeIcon";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/");
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <>
      <div
        data-testid="header-component-id"
        className={`col-span-3 row-span-1 flex justify-start items-center gap-6 pl-3 sm:pl-10 border-2 ${darkTheme ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-neutral-200"}`}
      >
        <Link
          to="/"
          className={activeLink === "/" ? undefined : "text-indigo-300"}
          onClick={() => setActiveLink("/")}
        >
          Home
        </Link>
        <Link
          to="/details"
          className={activeLink === "/details" ? undefined : "text-indigo-300"}
          onClick={() => setActiveLink("/details")}
        >
          Details
        </Link>
        <ThemeIcon />
      </div>
    </>
  );
};

export default Header;
