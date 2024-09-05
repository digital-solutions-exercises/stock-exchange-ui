import { YahooQuote, YahooCompanyDetails } from "../types/yahooData.types";

export const companyDetailsDefault: YahooCompanyDetails = {
  assetProfile: {
    industry: null,
  },
};

export const stockQuoteDefault: YahooQuote = {
  region: null,
  currency: null,
  regularMarketChangePercent: null,
  regularMarketPrice: null,
  exchange: null,
  shortName: null,
  longName: null,
  regularMarketChange: null,
  marketCap: null,
  firstTradeDateMilliseconds: null,
};
