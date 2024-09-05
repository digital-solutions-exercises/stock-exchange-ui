import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import ThemeIcon from "../ThemeIcon";
import ThemeContext from "../../context/ThemeContext";

describe("ThemeIcon.tsx", () => {
  const renderThemeIconWithTheme = (initialTheme: boolean) => {
    const Wrapper = () => {
      const [darkTheme, setDarkTheme] = useState(initialTheme);
      return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
          <ThemeIcon />
        </ThemeContext.Provider>
      );
    };

    render(<Wrapper />);
  };

  test("renders MoonIcon correctly", () => {
    renderThemeIconWithTheme(false);
    const icon = screen.getByRole("button", { name: "Toggle theme" });
    expect(icon).toBeInTheDocument();
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderThemeIconWithTheme(true);

    const buttonElement = screen.getByRole("button", { name: "Toggle theme" });
    expect(buttonElement).toHaveClass("shadow-gray-100");

    const iconElement = screen.getByTestId("theme-icon-id");
    expect(iconElement).toHaveClass("fill-yellow-400 stroke-yellow-400");
  });

  test("applies light theme styles when darkTheme is false", () => {
    renderThemeIconWithTheme(false);

    const buttonElement = screen.getByRole("button", { name: "Toggle theme" });
    expect(buttonElement).not.toHaveClass("shadow-gray-100");

    const iconElement = screen.getByTestId("theme-icon-id");
    expect(iconElement).toHaveClass("fill-none stroke-neutral-400");
  });

  test("toggles darkTheme state when clicked", () => {
    renderThemeIconWithTheme(false);

    const buttonElement = screen.getByRole("button", { name: "Toggle theme" });

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveClass("shadow-gray-100");

    fireEvent.click(buttonElement);
    expect(buttonElement).not.toHaveClass("shadow-gray-100");
  });
});
