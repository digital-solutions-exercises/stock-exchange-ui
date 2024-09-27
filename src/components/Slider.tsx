import { useContext, useEffect, useState, FC } from "react";
import ThemeContext from "../context/ThemeContext";
import { Slide, slides } from "../constants/blogData";
import { useTranslation } from "react-i18next";
import Card from "./Card";

const Slider: FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { darkTheme } = useContext(ThemeContext)!;
  const language = sessionStorage.getItem("language");
  const [translatedSlides, setTranslatedSlides] = useState(
    slides(language ? JSON.parse(language).code : "en"),
  )!;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? translatedSlides.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === translatedSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    setTranslatedSlides(slides(language ? JSON.parse(language).code : "en"));
  }, [language, setTranslatedSlides]);

  return (
    <Card>
      <div className="overflow-hidden">
        <div
          className="w-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {translatedSlides.map((slide: Slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className="relative">
                <div className="flex justify-center flex-col text-center">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="rounded-2xl w-full max-h-96 object-cover p-5"
                  />
                  <h3
                    className={`text-2xl ${darkTheme ? "text-gray-300" : "text-gray-900"} font-medium leading-8 mb-4`}
                  >
                    {slide.title}
                  </h3>
                  <p className="text-gray-500 leading-6 mb-8">
                    {slide.description &&
                      slide.description.substring(0, 140) + "..."}
                  </p>
                </div>
                <a href="#" className="text-indigo-700 font-semibold">
                  {t("components.Slider.readMore")}
                </a>
                <div className="flex justify-center space-x-10">
                  <button
                    data-testid={`previous-button-id-${slide.id}`}
                    onClick={prevSlide}
                    className="border border-solid border-indigo-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-indigo-600 group-hover:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19L8 12L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    data-testid={`next-button-id-${slide.id}`}
                    onClick={nextSlide}
                    className="border border-solid border-indigo-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-indigo-600 group-hover:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L16 12L9 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Slider;
