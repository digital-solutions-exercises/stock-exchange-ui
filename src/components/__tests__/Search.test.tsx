import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Search";
import ThemeContext from "../../context/ThemeContext";
import { getYahooSearchQuotes } from "../../api/yahooData";
import { mockYahooSearchQuotes } from "../../mocks/yahooMockData.mocks";
import StockContext from "../../context/StockContext";

jest.mock("../../api/yahooData", () => ({
  getYahooSearchQuotes: jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Search.tsx", () => {
  const mockSetStockSymbol = jest.fn();

  const renderSearch = (darkTheme: boolean) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <StockContext.Provider
          value={{ stockSymbol: "AAPL", setStockSymbol: mockSetStockSymbol }}
        >
          <Search />
        </StockContext.Provider>
      </ThemeContext.Provider>,
    );
  };

  test("renders input field and buttons", () => {
    renderSearch(false);

    const inputElement = screen.getByPlaceholderText("components.Search.input.placeholder");
    expect(inputElement).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: "Search input" });
    expect(searchButton).toBeInTheDocument();
  });

  test("updates input value and triggers API call on Enter key press", async () => {
    (getYahooSearchQuotes as jest.Mock).mockResolvedValue(
      mockYahooSearchQuotes,
    );

    renderSearch(false);

    const inputElement = screen.getByPlaceholderText("components.Search.input.placeholder");

    fireEvent.change(inputElement, { target: { value: "AAPL" } });
    expect(inputElement).toHaveValue("AAPL");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    await waitFor(() =>
      expect(getYahooSearchQuotes).toHaveBeenCalledWith("AAPL"),
    );

    await screen.findByText("AAPL");

    await screen.findByText("AAPU");
  });

  test("clears input and results when clear button is clicked", async () => {
    (getYahooSearchQuotes as jest.Mock).mockResolvedValue(
      mockYahooSearchQuotes,
    );

    renderSearch(false);

    const inputElement = screen.getByPlaceholderText("components.Search.input.placeholder");

    fireEvent.change(inputElement, { target: { value: "AAPL" } });
    expect(inputElement).toHaveValue("AAPL");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("AAPL")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("AAPU")).toBeInTheDocument();
    });

    const clearButton = screen.getByRole("button", { name: "Clear input" });
    fireEvent.click(clearButton);

    expect(inputElement).toHaveValue("");
    expect(screen.queryByText("AAPL")).not.toBeInTheDocument();
    expect(screen.queryByText("AAPU")).not.toBeInTheDocument();
  });

  test("handles API errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    (getYahooSearchQuotes as jest.Mock).mockRejectedValue(
      new Error("API error"),
    );

    renderSearch(false);

    const inputElement = screen.getByPlaceholderText("components.Search.input.placeholder");

    fireEvent.change(inputElement, { target: { value: "AAPL" } });
    expect(inputElement).toHaveValue("AAPL");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.queryByText("AAPL")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("AAPU")).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderSearch(true);

    const inputElement = screen.getByPlaceholderText("components.Search.input.placeholder");
    expect(inputElement).toHaveClass("bg-gray-900");

    const containerElement = screen.getByTestId("search-component-id");
    expect(containerElement).toHaveClass("bg-gray-900 border-gray-800");
  });
});
