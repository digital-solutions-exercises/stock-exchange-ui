import { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";

const Details = ({ details }: any) => {
  const { darkTheme } = useContext(ThemeContext)!;

  const detailList: any = {
    longName: "Name",
    region: "Country",
    currency: "Currency",
    exchange: "Exchange",
    firstTradeDateMilliseconds: "IPO Date",
    marketCap: "Market Capitalization",
    industry: "Industry",
  };

  const convertToBillion = (number: number) => {
    return (number / 1000000000).toFixed(2);
  };

  const formatValue = (item: string) => {
    if (item === "marketCap") {
      return details[item] !== undefined
        ? `${convertToBillion(details[item])}B`
        : "-";
    }
    if (item === "firstTradeDateMilliseconds") {
      return details[item] ? new Date(details[item]).toLocaleDateString() : "-";
    }
    if (item === "longName") {
      return details.longName || details.shortName || "-";
    }
    return details[item] || "-";
  };

  return (
    <Card>
      <ul
        className={`w-full h-full flex flex-col justify-between devide-y-1 ${darkTheme ? "divide-gray-800" : null}`}
      >
        {Object.keys(detailList).map((item: string) => {
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{detailList[item]}</span>
              <span>{formatValue(item)}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
