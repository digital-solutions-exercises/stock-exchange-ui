import { render, screen, fireEvent } from "@testing-library/react";
import SearchResults from "../SearchResults";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";
import { mockYahooSearchQuotes } from "../../mocks/yahooMockData.mocks";
import { YahooSearchQuote } from "../../types/yahooData.types";

describe("SearchResults.tsx", () => {
  const mockSetStockSymbol = jest.fn();
  const mockSetBestMatches = jest.fn();

  const renderSearchResults = (
    results: YahooSearchQuote[],
    darkTheme: boolean,
  ) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <StockContext.Provider
          value={{ stockSymbol: "AAPL", setStockSymbol: mockSetStockSymbol }}
        >
          <SearchResults
            results={results}
            setBestMatches={mockSetBestMatches}
          />
        </StockContext.Provider>
      </ThemeContext.Provider>,
    );
  };

  test("renders the correct number of results", () => {
    renderSearchResults(mockYahooSearchQuotes, false);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(mockYahooSearchQuotes.length);
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderSearchResults(mockYahooSearchQuotes, true);

    const listElement = screen.getByRole("list");
    expect(listElement).toHaveClass("bg-gray-900 border-gray-800");

    const listItemElements = screen.getAllByRole("listitem");
    listItemElements.forEach((item) => {
      expect(item).toHaveClass("hover:bg-indigo-600");
    });
  });

  test("applies light theme styles when darkTheme is false", () => {
    renderSearchResults(mockYahooSearchQuotes, false);

    const listElement = screen.getByRole("list");
    expect(listElement).toHaveClass("bg-white border-neutral-200");

    const listItemElements = screen.getAllByRole("listitem");
    listItemElements.forEach((item) => {
      expect(item).toHaveClass("hover:bg-indigo-200");
    });
  });

  test("calls setStockSymbol with the correct symbol when an item is clicked", () => {
    renderSearchResults(mockYahooSearchQuotes, false);

    const listItemElements = screen.getAllByRole("listitem");
    fireEvent.click(listItemElements[0]);

    expect(mockSetStockSymbol).toHaveBeenCalledWith("AAPL");
    expect(mockSetStockSymbol).toHaveBeenCalledTimes(1);
  });

  test("does not render items without a symbol", () => {
    const mockResults = [
      ...mockYahooSearchQuotes,
      { symbol: "", longname: "No Symbol Corp." },
    ] as any;

    renderSearchResults(mockResults, false);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(items[0]).toHaveTextContent("AAPL");
  });
});
