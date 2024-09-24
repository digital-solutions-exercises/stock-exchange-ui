import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import ContactUsPage from "./pages/ContactUsPage";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";

export type ActiveLinkType = "/" | "/details" | "/contact-us";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/details",
        element: <DetailsPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
]);

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <RouterProvider router={router} />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
