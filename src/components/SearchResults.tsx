import { useContext, FC } from "react";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { YahooSearchQuote } from "../types/yahooData.types";

interface Props {
  results: YahooSearchQuote[];
  setBestMatches: (searchQuotes: YahooSearchQuote[]) => void;
}

const SearchResults: FC<Props> = ({ results, setBestMatches }) => {
  const { darkTheme } = useContext(ThemeContext)!;
  const { setStockSymbol } = useContext(StockContext)!;

  return (
    <ul
      className={`absolute top-12 border w-full rounded-md h-64 overflow-y-scroll custom-scrollbar ${darkTheme ? "bg-gray-900 border-gray-800 custom-scrollbar-dark" : "bg-white border-neutral-200"}`}
    >
      {results.map((item) => {
        return (
          item.symbol && (
            <li
              key={item.symbol}
              className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${darkTheme ? "hover:bg-indigo-600" : "hover:bg-indigo-200"} transition duration-300`}
              onClick={() => {
                setStockSymbol(item.symbol);
                setBestMatches([]);
              }}
            >
              <span>{item.symbol}</span>
              <span>{item.longname}</span>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default SearchResults;
