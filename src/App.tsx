import { useState } from "react";
import ThemeContext from "./context/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import StockContext from "./context/StockContext";

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
