import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import App from "../App";
import reportWebVitals from "../reportWebVitals";

jest.mock("../reportWebVitals");

describe("index.tsx", () => {
  let rootElement: HTMLDivElement;
  let mockRender: jest.Mock;
  let mockUnmount: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    mockRender = jest.fn();
    mockUnmount = jest.fn();

    jest.spyOn(ReactDOM, "createRoot").mockImplementation(
      () =>
        ({
          render: mockRender,
          unmount: mockUnmount,
        }) as unknown as Root,
    );
  });

  afterEach(() => {
    document.body.removeChild(rootElement);
  });

  test("renders App component using ReactDOM.createRoot", () => {
    require("../index");

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    expect(reportWebVitals).toBeDefined();
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
