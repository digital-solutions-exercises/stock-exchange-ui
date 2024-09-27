import { render, screen, fireEvent } from "@testing-library/react";
import ContactUsPage from "../ContactUsPage";
import ThemeContext from "../../context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

describe("ContactUsPage.tsx", () => {
  const renderContactUsPage = (darkTheme = false) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
          <ContactUsPage />
        </ThemeContext.Provider>
      </I18nextProvider>,
    );
  };

  it("renders the Contact Us page with the correct text", () => {
    renderContactUsPage();

    expect(
      screen.getByText(i18n.t("pages.ContactUsPage.majorHeader")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.t("pages.ContactUsPage.sendButton")),
    ).toBeInTheDocument();
  });

  it("renders the Etoro link with the correct href", () => {
    renderContactUsPage();

    const etoroLink = screen.getByText("Etoro");
    expect(etoroLink).toBeInTheDocument();
    expect(etoroLink).toHaveAttribute("href", "https://www.etoro.com/");
  });
});
