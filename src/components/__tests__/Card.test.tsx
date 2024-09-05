import { render, screen } from "@testing-library/react";
import Card from "../Card";
import ThemeContext from "../../context/ThemeContext";

describe("Card.tsx", () => {
  const renderCardWithTheme = (darkTheme: boolean) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <Card>
          <p>Test Child</p>
        </Card>
      </ThemeContext.Provider>,
    );
  };

  test("renders children correctly", () => {
    renderCardWithTheme(true);
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderCardWithTheme(true);

    const cardElement = screen.getByTestId("card-component-id");
    expect(cardElement).toHaveClass("bg-gray-900 border-gray-800");
  });

  test("applies light theme styles when darkTheme is false", () => {
    renderCardWithTheme(false);

    const cardElement = screen.getByTestId("card-component-id");
    expect(cardElement).toHaveClass("bg-white border-neutral-200");
  });
});
