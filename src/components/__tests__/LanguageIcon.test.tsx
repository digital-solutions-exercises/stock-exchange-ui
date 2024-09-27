import { render, screen, fireEvent } from "@testing-library/react";
import LanguageIcon from "../LanguageIcon";
import { languages } from "../../config/languages";
import i18n from "../../i18n";

jest.mock("../../i18n", () => ({
  changeLanguage: jest.fn(),
}));

describe("LanguageIcon.tsx", () => {
  const renderLanguageIcon = () => {
    render(<LanguageIcon />);
  };

  test("renders the language button with the correct flag", () => {
    const selectedLanguage = languages[0];
    renderLanguageIcon();

    const flagImage = screen.getByAltText(`${selectedLanguage.name} flag`);
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", selectedLanguage.flag);
  });

  test("toggles the dropdown when the button is clicked", () => {
    renderLanguageIcon();

    const button = screen.getByRole("button", {
      name: "Toggle language dropdown",
    });
    fireEvent.click(button);

    const dropdown = screen.getByRole("list");
    expect(dropdown).toBeInTheDocument();
  });

  test("closes the dropdown when a language is selected", () => {
    renderLanguageIcon();

    const button = screen.getByRole("button", {
      name: "Toggle language dropdown",
    });
    fireEvent.click(button);
    const dropdown = screen.getByRole("list");
    expect(dropdown).toBeInTheDocument();

    const languageOption = screen.getAllByRole("listitem")[1];
    fireEvent.click(languageOption);

    expect(i18n.changeLanguage).toHaveBeenCalledWith(languages[1].code);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("displays the correct number of language options", () => {
    renderLanguageIcon();

    const button = screen.getByRole("button", {
      name: "Toggle language dropdown",
    });
    fireEvent.click(button);

    const languageOptions = screen.getAllByRole("listitem");
    expect(languageOptions.length).toBe(languages.length);
  });
});
