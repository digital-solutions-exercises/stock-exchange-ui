import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Card = ({ children }: any) => {
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <div
      data-testid="card-component-id"
      className={`w-full h-full rounded-md relative p-8 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
    >
      {children}
    </div>
  );
};

export default Card;
