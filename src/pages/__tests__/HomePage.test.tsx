import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../HomePage";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";
import {
  getYahooQuote,
  getYahooQuoteCompanyDetails,
} from "../../api/yahooData";
import {
  mockYahooQuote,
  mockYahooQuoteCompanyDetails,
} from "../../mocks/yahooMockData.mocks";

jest.mock("../../api/yahooData");
jest.mock("../../components/ChartHeader", () => () => (
  <div>Mocked ChartHeader</div>
));
jest.mock("../../components/Chart", () => () => <div>Mocked Chart</div>);
jest.mock("../../components/Overview", () => () => <div>Mocked Overview</div>);
jest.mock("../../components/Details", () => () => <div>Mocked Details</div>);

describe("HomePage.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHomePage = (darkTheme = false) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <StockContext.Provider
          value={{ stockSymbol: "AAPL", setStockSymbol: jest.fn() }}
        >
          <HomePage />
        </StockContext.Provider>
      </ThemeContext.Provider>,
    );
  };

  it("renders HomePage correctly with fetched data", async () => {
    (getYahooQuote as jest.Mock).mockResolvedValue(mockYahooQuote);

    (getYahooQuoteCompanyDetails as jest.Mock).mockResolvedValue(
      mockYahooQuoteCompanyDetails,
    );

    await waitFor(() => renderHomePage());

    expect(screen.getByText("Mocked ChartHeader")).toBeInTheDocument();
    expect(screen.getByText("Mocked Chart")).toBeInTheDocument();
    expect(screen.getByText("Mocked Overview")).toBeInTheDocument();
    expect(screen.getByText("Mocked Details")).toBeInTheDocument();

    await waitFor(() => {
      expect(getYahooQuote).toHaveBeenCalledWith("AAPL");
    });
    await waitFor(() => {
      expect(getYahooQuoteCompanyDetails).toHaveBeenCalledWith("AAPL");
    });
  });

  it("falls back to default data on API error", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    (getYahooQuote as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching quote"),
    );
    (getYahooQuoteCompanyDetails as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching company details"),
    );

    await waitFor(() => renderHomePage());

    await waitFor(() => {
      expect(getYahooQuote).toHaveBeenCalledWith("AAPL");
    });
    await waitFor(() => {
      expect(getYahooQuoteCompanyDetails).toHaveBeenCalledWith("AAPL");
    });

    expect(screen.getByText("Mocked ChartHeader")).toBeInTheDocument();
    expect(screen.getByText("Mocked Chart")).toBeInTheDocument();
    expect(screen.getByText("Mocked Overview")).toBeInTheDocument();
    expect(screen.getByText("Mocked Details")).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      new Error("Error fetching company details"),
    );
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Error fetching quote"));

    consoleSpy.mockRestore();
  });

  it("applies dark theme class correctly", async () => {
    (getYahooQuote as jest.Mock).mockResolvedValue(mockYahooQuote);

    (getYahooQuoteCompanyDetails as jest.Mock).mockResolvedValue(
      mockYahooQuoteCompanyDetails,
    );

    await waitFor(() => renderHomePage(true));

    const container = screen.getByTestId("home-page-id");
    expect(container).toHaveClass("bg-gray-900");
  });
});
