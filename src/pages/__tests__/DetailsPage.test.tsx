import { render, screen } from "@testing-library/react";
import DetailsPage from "../DetailsPage";
import ThemeContext from "../../context/ThemeContext";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../components/Slider", () => () => <div>Mocked Slider</div>);

describe("DetailsPage.tsx", () => {
  const renderDetailsPage = (darkTheme = false) => {
    return render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <DetailsPage />
      </ThemeContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DetailsPage correctly with light theme", () => {
    renderDetailsPage(false);

    expect(
      screen.getByText("pages.DetailsPage.blocks.why.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.benefits.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.keys.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.how.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.start.title"),
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Slider")).toBeInTheDocument();

    const container = screen.getByTestId("details-page-id");
    expect(container).toHaveClass("bg-neutral-100");
  });

  it("renders the DetailsPage correctly with dark theme", () => {
    renderDetailsPage(true);

    expect(
      screen.getByText("pages.DetailsPage.blocks.why.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.benefits.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.keys.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.how.title"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.DetailsPage.blocks.start.title"),
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Slider")).toBeInTheDocument();

    const container = screen.getByTestId("details-page-id");
    expect(container).toHaveClass("bg-gray-900 text-gray-300");
  });
});
