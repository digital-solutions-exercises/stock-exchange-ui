import { fireEvent, render, screen } from "@testing-library/react";
import DetailsPage from "../DetailsPage";
import ThemeContext from "../../context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

jest.mock("../../components/Slider", () => () => <div>Mocked Slider</div>);

describe("DetailsPage.tsx", () => {
  const renderDetailsPage = (darkTheme = false) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
          <DetailsPage />
        </ThemeContext.Provider>
        ,
      </I18nextProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DetailsPage correctly with light theme", () => {
    renderDetailsPage(false);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.why.title").trim()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.title")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.content")),
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Slider")).toBeInTheDocument();

    const container = screen.getByTestId("details-page-id");
    expect(container).toHaveClass("bg-neutral-100");
  });

  it("renders the DetailsPage correctly with dark theme", () => {
    renderDetailsPage(true);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.why.title").trim()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.title")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.content")),
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Slider")).toBeInTheDocument();

    const container = screen.getByTestId("details-page-id");
    expect(container).toHaveClass("bg-gray-900 text-gray-300");
  });

  it("changes slide content on 'Next' and 'Prev' button clicks", () => {
    renderDetailsPage(false);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.title")),
    ).toBeInTheDocument();

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.keys.title")),
    ).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.how.title")),
    ).toBeInTheDocument();

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.keys.title")),
    ).toBeInTheDocument();
  });

  it("loops to the first slide after the last slide on 'Next'", () => {
    renderDetailsPage(false);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.start.title")),
    ).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.title")),
    ).toBeInTheDocument();
  });

  it("loops to the last slide after the first slide on 'Prev'", () => {
    renderDetailsPage(false);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.benefits.title")),
    ).toBeInTheDocument();

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(
      screen.getByText(i18n.t("pages.DetailsPage.blocks.start.title")),
    ).toBeInTheDocument();
  });
});
