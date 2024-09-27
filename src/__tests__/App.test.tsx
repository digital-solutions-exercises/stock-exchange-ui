import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

jest.mock("../pages/HomePage", () => () => <div>Home Page</div>);
jest.mock("../pages/DetailsPage", () => () => <div>Details Page</div>);

describe("App.tsx", () => {
  test("renders HomePage by default", () => {
    render(<App />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("navigates to DetailsPage when clicking on the /details link", async () => {
    render(<App />);

    const detailsLink = screen.getByRole("link", {
      name: /Invest with Confidence/i,
    });

    fireEvent.click(detailsLink);

    const detailsPage = await screen.findByText(/Details Page/i);
    expect(detailsPage).toBeInTheDocument();
  });

  test("navigates back to HomePage when clicking on the / link", async () => {
    render(<App />);

    const detailsLink = screen.getByRole("link", {
      name: /Invest with Confidence/i,
    });

    fireEvent.click(detailsLink);

    const homeLink = screen.getAllByTestId("dubak-logo-id")[0];

    fireEvent.click(homeLink);

    const homePage = await screen.findByText("Home Page");
    expect(homePage).toBeInTheDocument();
  });
});
