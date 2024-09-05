import { render, screen } from "@testing-library/react";
import Root from "../Root";

jest.mock("../../components/Header", () => () => <div>Mocked Header</div>);
jest.mock("react-router-dom", () => ({
  Outlet: () => <div>Mocked Outlet</div>,
}));

describe("Root.tsx", () => {
  it("renders the Root component with Header and Outlet", () => {
    render(<Root />);

    expect(screen.getByText("Mocked Header")).toBeInTheDocument();

    expect(screen.getByText("Mocked Outlet")).toBeInTheDocument();

    const rootDiv = screen.getByTestId("root-div-id");
    expect(rootDiv).toHaveClass("font-quicksand");
  });
});
