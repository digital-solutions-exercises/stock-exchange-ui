import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Card from "../components/Card";

const DetailsPage = () => {
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <div
      className={`sm:h-[calc(100vh-80px)] grid grid-cols-3 grid-rows-8 auto-rows-fr gap-3 sm:gap-6 p-6 sm:pl-10 sm:pr-10 ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
    >
      <div>
        <Card></Card>
      </div>
      <div>
        <Card></Card>
      </div>
      <div>
        <Card></Card>
      </div>
      <div>
        <Card></Card>
      </div>
    </div>
  );
};

export default DetailsPage;
