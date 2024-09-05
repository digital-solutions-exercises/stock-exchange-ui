import { render, screen } from "@testing-library/react";
import ChartHeader from "../ChartHeader";

jest.mock("../Search", () => () => <div data-testid="search-component"></div>);

describe("ChartHeader.tsx", () => {
  test("renders the header with the correct name", () => {
    const headerName = "Stock Overview";
    render(<ChartHeader name={headerName} />);

    const headingElement = screen.getByRole("heading", { name: headerName });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("text-2xl sm:text-5xl");
  });

  test("renders the Search component", () => {
    render(<ChartHeader name="Test Header" />);

    const searchComponent = screen.getByTestId("search-component");
    expect(searchComponent).toBeInTheDocument();
  });

  test("applies correct layout classes", () => {
    render(<ChartHeader name="Layout Test" />);

    const containerElement = screen.getByTestId("chart-header-component-id");
    expect(containerElement).toHaveClass(
      "flex flex-col justify-start sm:items-center sm:flex-row sm:gap-6",
    );
  });
});
