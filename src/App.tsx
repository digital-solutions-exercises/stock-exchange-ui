import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import ContactUsPage from "./pages/ContactUsPage";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";
import LanguageContext from "./context/LanguageContext";
import { languages } from "./config/languages";
import i18n from "./i18n";

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
  const [language, setLanguage] = useState(languages[0]);

  useEffect(() => {
    i18n.changeLanguage(language.code);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <RouterProvider router={router} />
        </StockContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
