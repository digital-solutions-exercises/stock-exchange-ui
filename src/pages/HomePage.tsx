import { useContext, useEffect, useState } from "react";
import ChartHeader from "../components/ChartHeader";
import Details from "../components/Details";
import Overview from "../components/Overview";
import Chart from "../components/Chart";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { getYahooQuote, getYahooQuoteCompanyDetails } from "../api/yahooData";
import {
  companyDetailsDefault,
  stockQuoteDefault,
} from "../constants/yahooDefaultData";

const HomePage = () => {
  const { darkTheme } = useContext(ThemeContext)!;
  const { stockSymbol } = useContext(StockContext)!;

  const [stockDetails, setStockDetails] = useState(companyDetailsDefault);
  const [quote, setQuote] = useState(stockQuoteDefault);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await getYahooQuoteCompanyDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails(companyDetailsDefault);
        console.log(error);
      }
    };
    const updateStockOverview = async () => {
      try {
        const result = await getYahooQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote(stockQuoteDefault);
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      data-testid="home-page-id"
      className={`grid grid-cols-3 grid-rows-8 auto-rows-fr gap-3 sm:gap-6 p-6 sm:pl-10 sm:pr-10 ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
    >
      <div className="col-span-3 row-span-1 flex justify-start items-center">
        <ChartHeader name={quote.longName || quote.shortName} />
      </div>
      <div className="col-span-3 sm:col-span-2 row-span-7">
        <Chart />
      </div>
      <div className="col-span-3 sm:col-span-1 row-span-2">
        <Overview
          symbol={stockSymbol}
          price={quote.regularMarketPrice}
          change={quote.regularMarketChange}
          changePercent={quote.regularMarketChangePercent}
          currency={quote.currency}
        />
      </div>
      <div className="col-span-3 sm:col-span-1 row-span-5">
        <Details
          details={{ ...quote, industry: stockDetails.assetProfile.industry }}
        />
      </div>
    </div>
  );
};

export default HomePage;
