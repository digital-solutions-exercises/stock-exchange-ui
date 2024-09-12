import { FC } from "react";
import Card from "./Card";

interface Props {
  symbol: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  currency: string | null;
}

const Overview: FC<Props> = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
}) => {
  return (
    <Card>
      <span className="absolute left-4 top-4 text-neutral-400 sm:text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className="w-full h-full flex flex-row items-center justify-around">
        <span className="text-xl sm:text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          ${price}
          <span className="text-sm sm:text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
            {currency}
          </span>
        </span>
        <span
          className={`text-sm sm:text-lg xl:text-xl 2xl:text-2xl ${
            change && change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change && change.toFixed(2)}{" "}
          <span>({changePercent && changePercent.toFixed(2)}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
