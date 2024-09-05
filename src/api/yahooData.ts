import {
  YahooCompanyDetails,
  YahooHistoryDataRow,
  YahooQuote,
  YahooSearchQuote,
} from "../types/yahooData.types";
import axios from "axios";

const basePath = "http://localhost:4002";

export const getYahooSearchQuotes = async (
  query: string,
): Promise<YahooSearchQuote[]> => {
  try {
    const response = await axios.get(`${basePath}/yahoo/symbols`, {
      params: { query },
      headers: {
        Authorization: "Bearer ACCESS_TOKEN",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message = `An error has occured: ${error}`;
    throw new Error(message);
  }
};

export const getYahooQuoteCompanyDetails = async (
  stockSymbol: string,
): Promise<YahooCompanyDetails> => {
  try {
    const response = await axios.get(`${basePath}/yahoo/stock-details`, {
      params: { stockSymbol },
      headers: {
        Authorization: "Bearer ACCESS_TOKEN",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message = `An error has occured: ${error}`;
    throw new Error(message);
  }
};

export const getYahooQuote = async (
  stockSymbol: string,
): Promise<YahooQuote> => {
  try {
    const response = await axios.get(`${basePath}/yahoo/quote`, {
      params: { stockSymbol },
      headers: {
        Authorization: "Bearer ACCESS_TOKEN",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message = `An error has occured: ${error}`;
    throw new Error(message);
  }
};

export const getYahooHistoryData = async (
  stockSymbol: string,
  resolution: "1d" | "1wk" | "1mo",
  startDate: number,
  endDate: number,
): Promise<YahooHistoryDataRow[]> => {
  try {
    const response = await axios.get(`${basePath}/yahoo/historical-data`, {
      params: { stockSymbol, resolution, startDate, endDate },
      headers: {
        Authorization: "Bearer ACCESS_TOKEN",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const message = `An error has occured: ${error}`;
    throw new Error(message);
  }
};
