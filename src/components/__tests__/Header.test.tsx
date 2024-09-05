import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";

jest.mock("../ThemeIcon", () => () => <div data-testid="theme-icon-id"></div>);

describe("Header.tsx", () => {
  const renderHeader = () => {
    render(
      <Router>
        <Header />
      </Router>,
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
    expect(homeLink).toHaveClass("text-indigo-700");

    const detailsLink = screen.getByText("Details");
    expect(detailsLink).not.toHaveClass("text-indigo-700");
  });

  test("applies active class to Details link when clicked", () => {
    renderHeader();

    const detailsLink = screen.getByText("Details");

    fireEvent.click(detailsLink);

    expect(detailsLink).toHaveClass("text-indigo-700");

    const homeLink = screen.getByText("Home");
    expect(homeLink).not.toHaveClass("text-indigo-700");
  });

  test("renders the ThemeIcon component", () => {
    renderHeader();

    const themeIcon = screen.getByTestId("theme-icon-id");
    expect(themeIcon).toBeInTheDocument();
  });
});
