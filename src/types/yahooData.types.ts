export interface YahooCompanyDetails {
  assetProfile: {
    industry: string | null;
  };
}

export interface YahooQuote {
  region: string | null;
  currency: string | null;
  regularMarketChangePercent: number | null;
  regularMarketPrice: number | null;
  exchange: string | null;
  shortName: string | null;
  longName: string | null;
  regularMarketChange: number | null;
  marketCap: number | null;
  firstTradeDateMilliseconds: string | null;
}

export interface YahooHistoryDataRow {
  [key: string]: any;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose?: number;
  volume: number;
}

export interface YahooSearchQuote {
  [key: string]: any;
  symbol: string;
  isYahooFinance: true;
  exchange: string;
  exchDisp?: string;
  shortname?: string;
  longname?: string;
  index: "quotes";
  score: number;
  newListingDate?: Date;
  prevName?: string;
  nameChangeDate?: Date;
  sector?: string;
  industry?: string;
  dispSecIndFlag?: boolean;
  quoteType:
    | "EQUITY"
    | "OPTION"
    | "ETF"
    | "MUTUALFUND"
    | "INDEX"
    | "CURRENCY"
    | "CRYPTOCURRENCY"
    | "FUTURE";
  typeDisp:
    | "Equity"
    | "Option"
    | "ETF"
    | "Fund"
    | "Index"
    | "Currency"
    | "Cryptocurrency"
    | "Future"
    | "Futures";
}

export interface NonYahooSearchQuote {
  index: string;
  name: string;
  permalink: string;
  isYahooFinance: false;
}
