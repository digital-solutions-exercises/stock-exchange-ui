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
import { YahooQuote } from "../types/yahooData.types";

const DetailsPage = () => {
  const { darkTheme } = useContext(ThemeContext)!;
  const { stockSymbol } = useContext(StockContext)!;

  const [stockDetails, setStockDetails] = useState(companyDetailsDefault);
  const [quote, setQuote] = useState<YahooQuote>(stockQuoteDefault);

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
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-3 pl-10 pr-10 ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <ChartHeader name={quote.longName || quote.shortName} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.regularMarketPrice}
          change={quote.regularMarketChange}
          changePercent={quote.regularMarketChangePercent}
          currency={quote.currency}
        />
      </div>
      <div className="row-span-3">
        <Details
          details={{ ...quote, industry: stockDetails.assetProfile.industry }}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
