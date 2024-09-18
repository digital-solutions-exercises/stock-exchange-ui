import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Slider from "../components/Slider";
import { useTranslation } from "react-i18next";

const DetailsPage = () => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <div
      className={`h-full lg:h-[calc(100vh-80px)] grid grid-cols-3 lg:grid-rows-8 lg:auto-rows-fr gap-3 sm:gap-6 p-6 sm:p-10 ${
        darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
      data-testid="details-page-id"
    >
      <div className="col-span-3 lg:col-span-1 lg:row-span-4">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.why.title")}
          <span className="text-indigo-600">
            {t("pages.DetailsPage.blocks.why.titleSuffix")}
          </span>
        </h2>
        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
          {t("pages.DetailsPage.blocks.why.content")}
        </p>
      </div>

      <div className="col-span-3 lg:col-span-1 lg:row-span-4">
        <Slider />
      </div>

      <div className="col-span-3 lg:col-span-1 lg:row-span-3">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.benefits.title")}
        </h2>
        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
          {t("pages.DetailsPage.blocks.benefits.content")}
        </p>
      </div>

      <div className="col-span-3 lg:col-span-1 lg:row-span-2">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.keys.title")}
        </h2>
        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
          {t("pages.DetailsPage.blocks.keys.content")}
        </p>
      </div>

      <div className="col-span-3 lg:col-span-1 lg:row-span-4">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.how.title")}
        </h2>
        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
          {t("pages.DetailsPage.blocks.how.content")}
        </p>
      </div>

      <div className="col-span-3 lg:col-span-2 lg:row-span-2 lg:row-start-7 lg:col-start-2">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.start.title")}
        </h2>
        <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
          {t("pages.DetailsPage.blocks.start.content")}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
