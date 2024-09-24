import { render, screen, fireEvent } from "@testing-library/react";
import Chart from "../Chart";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";
import { mockYahooHistoryData } from "../../mocks/yahooMockData.mocks";
import { GET_YAHOO_HISTORY_DATA } from "../../graphql/yahooData";
import { useLazyQuery } from "@apollo/client";

const mockedYahooHistoryData = {
  getHistoricalData: mockYahooHistoryData,
};

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useLazyQuery: jest.fn(),
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
  const mockLazyQuery = useLazyQuery as jest.Mock;

  const renderChart = (darkTheme = false, stockSymbol = "AAPL") => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders filter buttons", async () => {
    const fetchYahooHistoryDataMock = jest.fn();

    mockLazyQuery.mockReturnValue([
      fetchYahooHistoryDataMock,
      { loading: false, data: mockedYahooHistoryData },
    ]);

    renderChart();

    const filterButton = screen.getByText("1Y");
    expect(filterButton).toBeInTheDocument();
  });

  test("set filter when is changed", async () => {
    const fetchYahooHistoryDataMock = jest.fn();

    mockLazyQuery.mockReturnValue([
      fetchYahooHistoryDataMock,
      { loading: false, data: mockedYahooHistoryData },
    ]);

    renderChart();

    expect(fetchYahooHistoryDataMock).toHaveBeenNthCalledWith(1, {
      variables: {
        stockSymbol: "AAPL",
        resolution: "1wk",
        startDate: expect.any(Number),
        endDate: expect.any(Number),
      },
    });

    const filterButton = screen.getByText("1W");
    fireEvent.click(filterButton);

    expect(fetchYahooHistoryDataMock).toHaveBeenNthCalledWith(2, {
      variables: {
        stockSymbol: "AAPL",
        resolution: "1d",
        startDate: expect.any(Number),
        endDate: expect.any(Number),
      },
    });
  });

  test("fetches data from sessionStorage if it exists", async () => {
    const persistedData = JSON.stringify(mockYahooHistoryData);
    sessionStorage.setItem("chartData_1Y_AAPL", persistedData);

    const fetchYahooHistoryDataMock = jest.fn();

    mockLazyQuery.mockReturnValue([
      fetchYahooHistoryDataMock,
      { loading: false, data: undefined },
    ]);

    renderChart();

    expect(fetchYahooHistoryDataMock).not.toHaveBeenCalled();
  });

  test("fetches chart data using useLazyQuery and fetchYahooHistoryData", async () => {
    const fetchYahooHistoryDataMock = jest.fn();

    mockLazyQuery.mockReturnValue([
      fetchYahooHistoryDataMock,
      { loading: false, data: mockedYahooHistoryData },
    ]);

    renderChart();

    expect(mockLazyQuery).toHaveBeenCalledWith(GET_YAHOO_HISTORY_DATA);

    expect(fetchYahooHistoryDataMock).toHaveBeenCalledWith({
      variables: {
        stockSymbol: "AAPL",
        resolution: "1wk",
        startDate: expect.any(Number),
        endDate: expect.any(Number),
      },
    });

    const storedData = sessionStorage.getItem("chartData_1Y_AAPL");
    expect(storedData).toBeDefined();
    expect(JSON.parse(storedData!)).toEqual(
      mockYahooHistoryData.map(({ close, date }) => {
        return {
          value: close.toFixed(2),
          date: new Date(date).toLocaleDateString(),
        };
      }),
    );
  });

  test("handles graphql errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const fetchYahooHistoryDataMock = jest.fn();

    mockLazyQuery.mockReturnValue([
      fetchYahooHistoryDataMock,
      { loading: false, error: new Error("GraphQL error"), data: undefined },
    ]);

    renderChart();

    expect(consoleSpy).toHaveBeenCalledWith(Error("GraphQL error"));

    consoleSpy.mockRestore();
  });
});
