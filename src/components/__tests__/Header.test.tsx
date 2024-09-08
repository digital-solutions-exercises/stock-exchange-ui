import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";
import ThemeContext from "../../context/ThemeContext";
import LanguageContext from "../../context/LanguageContext";
import { languages } from "../../constants/languages";

jest.mock("../ThemeIcon", () => () => <div data-testid="theme-icon-id"></div>);
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Header.tsx", () => {
  const renderHeader = (darkTheme = false, language = languages[0]) => {
    render(
      <LanguageContext.Provider value={{ language, setLanguage: jest.fn() }}>
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
          <Router>
            <Header />
          </Router>
        </ThemeContext.Provider>
        ,
      </LanguageContext.Provider>,
    );
  };

  test("renders Home and Details links", () => {
    renderHeader();

    const homeLink = screen.getByText("components.Header.homeLink");
    const detailsLink = screen.getByText("components.Header.detailsLink");

    expect(homeLink).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
  });

  test("applies active class to Home link when it is active", () => {
    renderHeader();

    const homeLink = screen.getByText("components.Header.homeLink");
    expect(homeLink).not.toHaveClass("text-indigo-300");

    const detailsLink = screen.getByText("components.Header.detailsLink");
    expect(detailsLink).toHaveClass("text-indigo-300");
  });

  test("applies active class to Details link when clicked", () => {
    renderHeader();

    const detailsLink = screen.getByText("components.Header.detailsLink");

    fireEvent.click(detailsLink);

    expect(detailsLink).not.toHaveClass("text-indigo-300");

    const homeLink = screen.getByText("components.Header.homeLink");
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
