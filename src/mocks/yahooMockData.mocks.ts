import { YahooSearchQuote } from "../types/yahooData.types";

export const mockYahooSearchQuotes: YahooSearchQuote[] = [
  {
    exchange: "NMS",
    shortname: "Apple Inc.",
    quoteType: "EQUITY",
    symbol: "AAPL",
    index: "quotes",
    score: 6414800,
    typeDisp: "Equity",
    longname: "Apple Inc.",
    exchDisp: "NASDAQ",
    sector: "Technology",
    sectorDisp: "Technology",
    industry: "Consumer Electronics",
    industryDisp: "Consumer Electronics",
    dispSecIndFlag: true,
    isYahooFinance: true,
  },
  {
    exchange: "NGM",
    shortname: "Direxion Daily AAPL Bull 2X Sha",
    quoteType: "ETF",
    symbol: "AAPU",
    index: "quotes",
    score: 20015,
    typeDisp: "ETF",
    longname: "Direxion Daily AAPL Bull 2X Shares",
    exchDisp: "NASDAQ",
    isYahooFinance: true,
  },
  {
    exchange: "PCX",
    shortname: "Tidal ETF Trust II YieldMax AAP",
    quoteType: "ETF",
    symbol: "APLY",
    index: "quotes",
    score: 20009,
    typeDisp: "ETF",
    longname: "YieldMax AAPL Option Income Strategy ETF",
    exchDisp: "NYSEArca",
    isYahooFinance: true,
  },
  {
    exchange: "NEO",
    shortname: "APPLE CDR (CAD HEDGED)",
    quoteType: "EQUITY",
    symbol: "AAPL.NE",
    index: "quotes",
    score: 20006,
    typeDisp: "Equity",
    longname: "Apple Inc.",
    exchDisp: "NEO",
    sector: "Technology",
    sectorDisp: "Technology",
    industry: "Consumer Electronics",
    industryDisp: "Consumer Electronics",
    isYahooFinance: true,
  },
  {
    exchange: "OPR",
    shortname: "AAPL Dec 2024 165.000 call",
    quoteType: "OPTION",
    symbol: "AAPL241220C00165000",
    index: "quotes",
    score: 20006,
    typeDisp: "Option",
    longname: "AAPL Dec 2024 165.000 call",
    exchDisp: "OPR",
    isYahooFinance: true,
  },
  {
    exchange: "OPR",
    shortname: "AAPL Jan 2026 300.000 call",
    quoteType: "OPTION",
    symbol: "AAPL260116C00300000",
    index: "quotes",
    score: 20005,
    typeDisp: "Option",
    longname: "AAPL Jan 2026 300.000 call",
    exchDisp: "OPR",
    isYahooFinance: true,
  },
];

export const mockYahooQuoteCompanyDetails = {
  assetProfile: {
    industry: "Consumer Electronics",
  },
};

export const mockYahooQuote = {
  region: "US",
  currency: "USD",
  regularMarketChangePercent: 1.4570125,
  regularMarketPrice: 229.79,
  exchange: "NMS",
  shortName: "Apple Inc.",
  longName: "Apple Inc.",
  regularMarketChange: 3.2999878,
  marketCap: 3493750112256,
  firstTradeDateMilliseconds: "1980-12-12T14:30:00.000Z",
};

export const mockYahooHistoryData = [
  {
    date: "2024-01-02T00:00:00.000Z",
    close: 185.639999,
  },
  {
    date: "2024-01-03T00:00:00.000Z",
    close: 184.25,
  },
  {
    date: "2024-01-04T00:00:00.000Z",
    close: 181.910004,
  },
  {
    date: "2024-01-05T00:00:00.000Z",
    close: 181.179993,
  },
  {
    date: "2024-01-08T00:00:00.000Z",
    close: 185.559998,
  },
  {
    date: "2024-01-09T00:00:00.000Z",
    close: 185.139999,
  },
];
