import axios from "axios";
import {
  getYahooSearchQuotes,
  getYahooQuoteCompanyDetails,
  getYahooQuote,
  getYahooHistoryData,
} from "../yahooData";
import {
  mockYahooSearchQuotes,
  mockYahooQuoteCompanyDetails,
  mockYahooQuote,
  mockYahooHistoryData,
} from "../../mocks/yahooMockData.mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("yahooData.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getYahooSearchQuotes", () => {
    it("should return data on successful API call", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockYahooSearchQuotes });

      const result = await getYahooSearchQuotes("AAPL");
      expect(result).toEqual(mockYahooSearchQuotes);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:4002/yahoo/symbols",
        expect.objectContaining({
          params: { query: "AAPL" },
        }),
      );
    });

    it("should throw an error when API call fails", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getYahooSearchQuotes("AAPL")).rejects.toThrow(
        `An error has occured: Error: ${errorMessage}`,
      );
    });
  });

  describe("getYahooQuoteCompanyDetails", () => {
    it("should return data on successful API call", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockYahooQuoteCompanyDetails });

      const result = await getYahooQuoteCompanyDetails("AAPL");
      expect(result).toEqual(mockYahooQuoteCompanyDetails);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:4002/yahoo/stock-details",
        expect.objectContaining({
          params: { stockSymbol: "AAPL" },
        }),
      );
    });

    it("should throw an error when API call fails", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getYahooQuoteCompanyDetails("AAPL")).rejects.toThrow(
        `An error has occured: Error: ${errorMessage}`,
      );
    });
  });

  describe("getYahooQuote", () => {
    it("should return data on successful API call", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockYahooQuote });

      const result = await getYahooQuote("AAPL");
      expect(result).toEqual(mockYahooQuote);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:4002/yahoo/quote",
        expect.objectContaining({
          params: { stockSymbol: "AAPL" },
        }),
      );
    });

    it("should throw an error when API call fails", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getYahooQuote("AAPL")).rejects.toThrow(
        `An error has occured: Error: ${errorMessage}`,
      );
    });
  });

  describe("getYahooHistoryData", () => {
    it("should return data on successful API call", async () => {
      mockedAxios.get.mockResolvedValue({ data: mockYahooHistoryData });

      const result = await getYahooHistoryData(
        "AAPL",
        "1d",
        1633075200,
        1633248000,
      );
      expect(result).toEqual(mockYahooHistoryData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:4002/yahoo/historical-data",
        expect.objectContaining({
          params: {
            stockSymbol: "AAPL",
            resolution: "1d",
            startDate: 1633075200,
            endDate: 1633248000,
          },
        }),
      );
    });

    it("should throw an error when API call fails", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(
        getYahooHistoryData("AAPL", "1d", 1633075200, 1633248000),
      ).rejects.toThrow(`An error has occured: Error: ${errorMessage}`);
    });
  });
});
