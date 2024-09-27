import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";
import ThemeContext from "../../context/ThemeContext";
import { languages } from "../../config/languages";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../i18n", () => ({
  changeLanguage: jest.fn(),
}));

describe("Header.tsx", () => {
  const renderHeader = (darkTheme = false, language = languages[0]) => {
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

    const homeLink = screen.getAllByTestId("dubak-logo-id")[0];
    const detailsLink = screen.getByText("components.Header.detailsLink");

    expect(homeLink).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
  });

  test("mobile - should render header menu icon, header menu should be hidden", () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event("resize"));

    renderHeader();

    const headerMenuIcon = screen.getByTestId("header-menu-icon-id");
    expect(headerMenuIcon).toBeInTheDocument();

    const headerMenu = screen.getByTestId("header-menu-id");

    expect(headerMenu).toHaveClass("hidden");
  });

  test("mobile - should display header menu once clicked on header menu icon", () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event("resize"));

    renderHeader();

    const headerMenuIcon = screen.getByTestId("header-menu-icon-id");
    fireEvent.click(headerMenuIcon);

    const headerMenu = screen.getByTestId("header-menu-id");

    expect(headerMenu).not.toHaveClass("hidden");
  });

  test("applies active class to Home link when it is active", () => {
    renderHeader();

    const homeLink = screen.getAllByTestId("dubak-logo-id")[0];
    expect(homeLink).not.toHaveClass("text-indigo-300");

    const detailsLink = screen.getByText("components.Header.detailsLink");
    expect(detailsLink).toHaveClass("text-indigo-300");
  });

  test("applies active class to Details link when clicked", () => {
    renderHeader();

    const detailsLink = screen.getByText("components.Header.detailsLink");

    fireEvent.click(detailsLink);

    expect(detailsLink).toHaveClass("text-indigo-600");
  });

  test("applies active class to Contact Us link when clicked", () => {
    renderHeader();

    const contactUsLink = screen.getByText("components.Header.contactUsLink");

    fireEvent.click(contactUsLink);

    expect(contactUsLink).toHaveClass("text-indigo-600");
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
