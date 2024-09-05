import { render, screen, fireEvent } from "@testing-library/react";
import ChartFilter from "../ChartFilter";

describe("ChartFilter.tsx", () => {
  const mockOnClick = jest.fn();

  const renderChartFilter = (text: string, active: boolean) => {
    render(<ChartFilter text={text} active={active} onClick={mockOnClick} />);
  };

  test("renders the button with the correct text", () => {
    const buttonText = "1D";
    renderChartFilter(buttonText, false);

    const buttonElement = screen.getByRole("button", { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies active styles when active is true", () => {
    renderChartFilter("1W", true);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass(
      "bg-indigo-600 border-indigo-700 text-gray-100",
    );
  });

  test("applies inactive styles when active is false", () => {
    renderChartFilter("1M", false);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("border-indigo-300 text-indigo-300");
  });

  test("calls onClick when the button is clicked", () => {
    renderChartFilter("1Y", false);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("applies hover styles on mouse over", () => {
    renderChartFilter("5Y", false);

    const buttonElement = screen.getByRole("button");

    fireEvent.mouseOver(buttonElement);

    expect(buttonElement).toHaveClass(
      "hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700",
    );
  });
});
