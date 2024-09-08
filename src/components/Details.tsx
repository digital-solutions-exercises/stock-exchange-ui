import { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Details = ({ details }: any) => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  const detailList: any = {
    longName: t("components.Details.detailList.longName"),
    region: t("components.Details.detailList.region"),
    currency: t("components.Details.detailList.currency"),
    exchange: t("components.Details.detailList.exchange"),
    firstTradeDateMilliseconds: t(
      "components.Details.detailList.firstTradeDateMilliseconds",
    ),
    marketCap: t("components.Details.detailList.marketCap"),
    industry: t("components.Details.detailList.industry"),
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
