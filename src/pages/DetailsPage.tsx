import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Slider from "../components/Slider";
import { useTranslation } from "react-i18next";

const DetailsPage = () => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  const [currentSlide, setCurrentSlide] = useState(0);

  const detailsPageContent = [
    {
      id: 1,
      title: "pages.DetailsPage.blocks.benefits.title",
      content: "pages.DetailsPage.blocks.benefits.content",
    },
    {
      id: 2,
      title: "pages.DetailsPage.blocks.keys.title",
      content: "pages.DetailsPage.blocks.keys.content",
    },
    {
      id: 3,
      title: "pages.DetailsPage.blocks.how.title",
      content: "pages.DetailsPage.blocks.how.content",
    },
    {
      id: 4,
      title: "pages.DetailsPage.blocks.start.title",
      content: "pages.DetailsPage.blocks.start.content",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? detailsPageContent.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === detailsPageContent.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div
      className={`h-full md:h-[calc(100vh-80px)] grid grid-cols-[3fr_4fr] md:grid-rows-[2fr_1fr] ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
      data-testid="details-page-id"
    >
      <div className="col-span-2 md:col-span-1 md:row-span-1 px-10 pt-10">
        <h2
          className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
        >
          {t("pages.DetailsPage.blocks.why.title")}
          <span className="text-indigo-600">
            {t("pages.DetailsPage.blocks.why.titleSuffix")}
          </span>
        </h2>
        <p className="text-gray-500">
          {t("pages.DetailsPage.blocks.why.content")}
        </p>
      </div>
      <div className="col-span-2 md:col-span-1 md:row-span-1 px-10 pt-10">
        <Slider />
      </div>

      <div className="col-span-2">
        <div className="flex items-center justify-center px-24">
          {/* Left Button */}
          <button
            className="absolute left-10 font-bold text-4xl text-indigo-600"
            onClick={handlePrev}
          >
            &lt;
          </button>

          {/* Content */}
          <div className="md:p-10">
            <h2
              className={`text-4xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5`}
            >
              {t(detailsPageContent[currentSlide].title)}
            </h2>
            <p className="text-gray-500">
              {t(detailsPageContent[currentSlide].content)}
            </p>
          </div>

          {/* Right Button */}
          <button
            className="absolute right-10 font-bold text-4xl text-indigo-600"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
