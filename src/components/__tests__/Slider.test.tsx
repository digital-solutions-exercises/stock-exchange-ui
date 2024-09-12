import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../Slider";
import ThemeContext from "../../context/ThemeContext";
import LanguageContext from "../../context/LanguageContext";
import { BrowserRouter as Router } from "react-router-dom";
import { slides } from "../../constants/blogData";
import { languages } from "../../config/languages";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Slider.tsx", () => {
  const renderSlider = (darkTheme = false) => {
    render(
      <LanguageContext.Provider
        value={{ language: languages[0], setLanguage: jest.fn() }}
      >
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
          <Router>
            <Slider />
          </Router>
        </ThemeContext.Provider>
      </LanguageContext.Provider>,
    );
  };

  test("renders the first slide by default", () => {
    renderSlider();

    const firstSlideTitle = screen.getByText(
      "Clever ways to invest in product to organize your portfolio",
    );

    expect(firstSlideTitle).toBeInTheDocument();
  });

  test("changes to the next slide when 'next' button is clicked", () => {
    renderSlider();

    const nextButton = screen.getByTestId("next-button-id");

    fireEvent.click(nextButton);

    const secondSlideTitle = screen.getByText(
      "How to grow your profit through systematic investment with us",
    );

    expect(secondSlideTitle).toBeInTheDocument();
  });

  test("changes to the previous slide when 'previous' button is clicked", () => {
    renderSlider();

    const prevButton = screen.getByTestId("previous-button-id");
    const nextButton = screen.getByTestId("next-button-id");

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    const firstSlideTitle = screen.getByText(
      "Clever ways to invest in product to organize your portfolio",
    );

    expect(firstSlideTitle).toBeInTheDocument();
  });

  test("returns to first slide once go through all slides", () => {
    renderSlider();

    const nextButton = screen.getByTestId("next-button-id");

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const firstSlideTitle = screen.getByText(
      "Clever ways to invest in product to organize your portfolio",
    );

    expect(firstSlideTitle).toBeInTheDocument();
  });

  test("renders with dark theme styles when darkTheme is true", () => {
    renderSlider(true);

    const slideTitle = screen.getByText(
      "Clever ways to invest in product to organize your portfolio",
    );
    expect(slideTitle).toHaveClass("text-gray-300");
  });
});
