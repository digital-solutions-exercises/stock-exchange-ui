import { render, screen } from "@testing-library/react";
import Details from "../Details";
import ThemeContext from "../../context/ThemeContext";
import {
  mockYahooQuoteCompanyDetails,
  mockYahooQuote,
} from "../../mocks/yahooMockData.mocks";

jest.mock("../Card", () => ({ children }: any) => <div>{children}</div>);
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Details.tsx", () => {
  const renderDetails = (
    darkTheme: boolean,
    details: any = {
      ...mockYahooQuote,
      industry: mockYahooQuoteCompanyDetails.assetProfile.industry,
    },
  ) => {
    render(
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme: jest.fn() }}>
        <Details details={details} />
      </ThemeContext.Provider>,
    );
  };

  test("renders all details with correct labels", () => {
    renderDetails(false);

    const expectedLabels = [
      "components.Details.detailList.longName",
      "components.Details.detailList.region",
      "components.Details.detailList.currency",
      "components.Details.detailList.exchange",
      "components.Details.detailList.firstTradeDateMilliseconds",
      "components.Details.detailList.marketCap",
      "components.Details.detailList.industry",
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders correct formatted values", () => {
    renderDetails(false);

    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("NMS")).toBeInTheDocument();
    expect(screen.getByText("12. 12. 1980")).toBeInTheDocument();
    expect(screen.getByText("3493.75B")).toBeInTheDocument();
    expect(screen.getByText("Consumer Electronics")).toBeInTheDocument();
  });

  test("applies dark theme styles when darkTheme is true", () => {
    renderDetails(true);

    const ulElement = screen.getByRole("list");
    expect(ulElement).toHaveClass("divide-gray-800");
  });

  test("handles missing or undefined details", () => {
    const incompleteDetails = {
      longName: undefined,
      region: "United States",
      marketCap: undefined,
    };

    renderDetails(false, incompleteDetails);

    const dashes = screen.getAllByText("-");

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(dashes).toHaveLength(6);
    dashes.forEach((dash) => {
      expect(dash).toBeInTheDocument();
    });
  });
});
