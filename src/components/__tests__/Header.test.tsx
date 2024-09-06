import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";
import ThemeContext from "../../context/ThemeContext";

jest.mock("../ThemeIcon", () => () => <div data-testid="theme-icon-id"></div>);

describe("Header.tsx", () => {
  const renderHeader = (darkTheme = false) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <Router>
          <Header />
        </Router>
      </ThemeContext.Provider>,
    );
  };

  test("renders Home and Details links", () => {
    renderHeader();

    const homeLink = screen.getByText("Home");
    const detailsLink = screen.getByText("Details");

    expect(homeLink).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
  });

  test("applies active class to Home link when it is active", () => {
    renderHeader();

    const homeLink = screen.getByText("Home");
    expect(homeLink).not.toHaveClass("text-indigo-300");

    const detailsLink = screen.getByText("Details");
    expect(detailsLink).toHaveClass("text-indigo-300");
  });

  test("applies active class to Details link when clicked", () => {
    renderHeader();

    const detailsLink = screen.getByText("Details");

    fireEvent.click(detailsLink);

    expect(detailsLink).not.toHaveClass("text-indigo-300");

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("text-indigo-300");
  });

  test("renders the ThemeIcon component", () => {
    renderHeader();

    const themeIcon = screen.getByTestId("theme-icon-id");
    expect(themeIcon).toBeInTheDocument();
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderHeader(true);

    const headerElement = screen.getByTestId("header-component-id");
    expect(headerElement).toHaveClass("bg-gray-900 border-gray-800 text-white");
  });
});
