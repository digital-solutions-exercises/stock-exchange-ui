import { render, screen } from "@testing-library/react";
import Overview from "../Overview";

jest.mock("../Card", () => ({ children }: any) => <div>{children}</div>);

describe("Overview.tsx", () => {
  const renderOverview = (props: any) => {
    render(<Overview {...props} />);
  };

  test("renders the symbol", () => {
    const props = {
      symbol: "AAPL",
      price: 150.0,
      change: 1.5,
      changePercent: 1.0,
      currency: "USD",
    };

    renderOverview(props);

    const symbolElement = screen.getByText("AAPL");
    expect(symbolElement).toBeInTheDocument();
    expect(symbolElement).toHaveClass(
      "absolute left-4 top-4 text-neutral-400 sm:text-lg xl:text-xl 2xl:text-2xl",
    );
  });

  test("renders the price and currency correctly", () => {
    const props = {
      symbol: "AAPL",
      price: 150.0,
      change: 1.5,
      changePercent: 1.0,
      currency: "USD",
    };

    renderOverview(props);

    const priceElement = screen.getByText("$150");
    expect(priceElement).toBeInTheDocument();

    const currencyElement = screen.getByText("USD");
    expect(currencyElement).toBeInTheDocument();
    expect(currencyElement).toHaveClass(
      "text-sm sm:text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2",
    );
  });

  test("renders positive change in green", () => {
    const props = {
      symbol: "AAPL",
      price: 150.0,
      change: 1.5,
      changePercent: 1.0,
      currency: "USD",
    };

    renderOverview(props);

    const changeElement = screen.getByText("1.50");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-lime-500");

    const changePercentElement = screen.getByText("(1.00%)");
    expect(changePercentElement).toBeInTheDocument();
  });

  test("renders negative change in red", () => {
    const props = {
      symbol: "TSLA",
      price: 700.0,
      change: -10.0,
      changePercent: -1.5,
      currency: "USD",
    };

    renderOverview(props);

    const changeElement = screen.getByText("-10.00");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-red-500");

    const changePercentElement = screen.getByText("(-1.50%)");
    expect(changePercentElement).toBeInTheDocument();
  });
});
