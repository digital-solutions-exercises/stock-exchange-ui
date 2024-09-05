import { useState } from "react";
import ThemeIcon from "./ThemeIcon";
import { Link } from "react-router-dom";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <>
      <div className="col-span-3 row-span-1 flex justify-start items-center gap-6 pl-3 sm:pl-10">
        <Link
          to="/"
          className={activeLink === "/" ? "text-indigo-700" : undefined}
          onClick={() => setActiveLink("/")}
        >
          Home
        </Link>
        <Link
          to="/details"
          className={activeLink === "/details" ? "text-indigo-700" : undefined}
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
