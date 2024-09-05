import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Chart from "../Chart";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";
import { getYahooHistoryData } from "../../api/yahooData";
import { mockYahooHistoryData } from "../../mocks/yahooMockData.mocks";

jest.mock("../../api/yahooData", () => ({
  getYahooHistoryData: jest.fn(),
}));

jest.mock("recharts", () => {
  const OriginalRechartsModule = jest.requireActual("recharts");

  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ height, children }: any) => (
      <div
        className="recharts-responsive-container"
        style={{ width: 800, height }}
      >
        {children}
      </div>
    ),
  };
});

describe("Chart.tsx", () => {
  const renderChart = (darkTheme: boolean, stockSymbol: string) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <StockContext.Provider
          value={{ stockSymbol, setStockSymbol: jest.fn() }}
        >
          <Chart />
        </StockContext.Provider>
      </ThemeContext.Provider>,
    );
  };

  test("renders filter buttons", async () => {
    (getYahooHistoryData as jest.Mock).mockResolvedValue(mockYahooHistoryData);

    await waitFor(() => renderChart(false, "AAPL"));

    const filterButton = screen.getByText("1Y");
    expect(filterButton).toBeInTheDocument();
  });

  test("fetches chart data", async () => {
    (getYahooHistoryData as jest.Mock).mockResolvedValue(mockYahooHistoryData);

    await waitFor(() => renderChart(false, "AAPL"));

    await waitFor(() => {
      expect(getYahooHistoryData).toHaveBeenCalledWith(
        "AAPL",
        "1wk",
        expect.any(Number),
        expect.any(Number),
      );
    });
  });

  test("handles API errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    (getYahooHistoryData as jest.Mock).mockRejectedValue(
      new Error("API error"),
    );

    await waitFor(() => renderChart(false, "AAPL"));

    await waitFor(() => {
      expect(screen.queryByText("150.00")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("155.00")).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });

  test("set filter when is changed", async () => {
    (getYahooHistoryData as jest.Mock).mockResolvedValue(mockYahooHistoryData);

    await waitFor(() => renderChart(false, "AAPL"));

    await waitFor(() => {
      expect(getYahooHistoryData).toHaveBeenCalledWith(
        "AAPL",
        "1wk",
        expect.any(Number),
        expect.any(Number),
      );
    });

    const filterButton = screen.getByText("3M");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(getYahooHistoryData).toHaveBeenCalledWith(
        "AAPL",
        "1wk",
        expect.any(Number),
        expect.any(Number),
      );
    });
  });
});
