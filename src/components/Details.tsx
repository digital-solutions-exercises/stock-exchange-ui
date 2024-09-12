import { FC, useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { YahooQuote } from "../types/yahooData.types";

interface Props {
  details: YahooQuote & { industry: string | null };
}

const Details: FC<Props> = ({ details }) => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  const detailList: { [key: string]: string } = {
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
    if (number === null || number === undefined || isNaN(number)) {
      return "-";
    }
    return (number / 1000000000).toFixed(2) + "B";
  };

  const convertToLocalDate = (date: string) => {
    if (
      date === null ||
      date === undefined ||
      isNaN(new Date(date).getTime())
    ) {
      return "-";
    }
    return new Date(date).toLocaleDateString();
  };

  const formatValue = (item: string) => {
    if (item === "marketCap") {
      return convertToBillion(details[item]!);
    }
    if (item === "firstTradeDateMilliseconds") {
      return convertToLocalDate(details[item]!);
    }
    if (item === "longName") {
      return details.longName || details.shortName || "-";
    }
    return (details as any)[item] || "-";
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
