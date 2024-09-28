import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { Trans, useTranslation } from "react-i18next";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  const [currentSlide, setCurrentSlide] = useState(0);

  const [rangeValue, setRangeValue] = useState("0");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(event.target.value);
  };

  const detailsPageContent = [
    {
      id: 1,
      content: "pages.ContactUsPage.description.1",
    },
    {
      id: 2,
      content: "pages.ContactUsPage.description.2",
    },
    {
      id: 3,
      content: "pages.ContactUsPage.description.3",
    },
    {
      id: 4,
      content: "pages.ContactUsPage.description.4",
    },
    {
      id: 5,
      content: "pages.ContactUsPage.description.5",
    },
    {
      id: 6,
      content: "pages.ContactUsPage.description.6",
    },
  ];

  return (
    <div
      className={`relative h-full lg:h-[calc(100vh-80px)] grid grid-cols-[1fr_1fr_1fr] grid-rows-[300px_auto]`}
      data-testid="contact-us-page-id"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/contact-us-background.webp')",
        }}
      />

      <div
        className={`absolute inset-0 ${darkTheme ? "bg-gray-900/80" : "bg-neutral-100/80"} z-0`}
      />

      <div className="relative z-10 col-span-3 row-start-1 p-6 sm:px-10 flex justify-center flex-col text-center">
        <h2
          className={`text-4xl md:text-5xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5 sm:mb-10`}
        >
          {t("pages.ContactUsPage.majorHeader")}
        </h2>
        <p className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
          {t("pages.ContactUsPage.minorHeader")}
        </p>
      </div>

      <div className="relative z-10 col-span-3 xl:col-start-1 xl:col-end-2 p-6 sm:px-10 text-center">
        <div className="relative flex flex-col items-center justify-center h-60 sm:h-full sm:leading-[3rem] font-bold space-y-10">
          <div className="relative flex flex-row items-center">
            <AcademicCapIcon
              className={`absolute h-14 w-14 stroke-2 ${darkTheme ? "fill-none stroke-gray-300" : "fill-none stroke-gray-600"}`}
            />
            {detailsPageContent[currentSlide].id === 1 && (
              <p
                className={`ml-16 ${darkTheme ? "text-gray-300" : "text-gray-600"} mb-2`}
              >
                <Trans i18nKey="pages.ContactUsPage.description.1">
                  <a
                    href="https://www.etoro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${darkTheme ? "text-indigo-300 hover:text-indigo-600" : "text-indigo-600 hover:text-indigo-300"}`}
                  >
                    Etoro
                  </a>
                </Trans>
              </p>
            )}
            {detailsPageContent[currentSlide].id !== 1 && (
              <p
                className={`ml-16 ${darkTheme ? "text-gray-300" : "text-gray-600"} mb-2`}
              >
                {t(detailsPageContent[currentSlide].content)}
              </p>
            )}
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2">
            {detailsPageContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full ${
                  currentSlide === index ? "bg-indigo-600" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 col-span-3 xl:col-start-2 xl:col-end-3 xl:overflow-y-auto p-6 sm:px-10 border-2 m-6 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
      >
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Name and Surname
            </label>
            <input
              type="text"
              id="name"
              className={`rounded-lg w-full p-2.5 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
              placeholder="John Doe"
              required
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`rounded-lg w-full p-2.5 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
              placeholder="name@flowbite.com"
              required
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`rounded-lg w-full p-2.5 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
              placeholder="+421 911 522 108"
              required
            ></input>
          </div>
          <div>
            <label
              htmlFor="subject"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Reserve Your Appointment
            </label>
            <input
              type="datetime-local"
              id="date"
              className={`rounded-lg w-full p-3 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
              required
            ></input>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="subject"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              What is your investment strategy?
            </label>
            <label
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleRadioChange}
                className={`m-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              />
              Invest Periodically
              <span className="relative group">
                <span className="ml-2 text-indigo-600 font-bold cursor-pointer">
                  ?
                </span>
                <div className="absolute left-0 hidden w-40 p-2 mt-1 text-sm text-white bg-black rounded-lg shadow-lg group-hover:block z-10">
                  Investing a fixed amount of money at regular intervals (e.g.,
                  monthly or quarterly), regardless of market conditions. This
                  helps reduce the impact of market volatility over time.
                </div>
              </span>
            </label>
            <label
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleRadioChange}
                className={`m-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              />
              Daily Trading
              <span className="relative group">
                <span className="ml-2 text-indigo-600 font-bold cursor-pointer">
                  ?
                </span>
                <div className="absolute left-0 hidden w-40 p-2 mt-1 text-sm text-white bg-black rounded-lg shadow-lg group-hover:block z-10">
                  Day trading involves buying and selling securities on the same
                  day to capitalize on short-term price movements.
                </div>
              </span>
            </label>
            <label
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleRadioChange}
                className={`m-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              />
              Opportunistic Investing
              <span className="relative group">
                <span className="ml-2 text-indigo-600 font-bold cursor-pointer">
                  ?
                </span>
                <div className="absolute left-0 hidden w-40 p-2 mt-1 text-sm text-white bg-black rounded-lg shadow-lg group-hover:block z-10">
                  Waiting for favorable market conditions or price corrections
                  before investing. Investors using this strategy seek to enter
                  markets at more attractive price levels.
                </div>
              </span>
            </label>
            <label
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              <input
                type="radio"
                value="option4"
                checked={selectedOption === "option4"}
                onChange={handleRadioChange}
                className={`m-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              />
              Buy and Hold
              <span className="relative group">
                <span className="ml-2 text-indigo-600 font-bold cursor-pointer">
                  ?
                </span>
                <div className="absolute left-0 hidden w-40 p-2 mt-1 text-sm text-white bg-black rounded-lg shadow-lg group-hover:block z-10">
                  Investing in assets with the intention of holding them for a
                  long period, regardless of market fluctuations. This strategy
                  is based on the belief that markets will grow over time.
                </div>
              </span>
            </label>
            <label
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              <input
                type="radio"
                value="option5"
                checked={selectedOption === "option5"}
                onChange={handleRadioChange}
                className={`m-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              />
              Other
            </label>
          </div>

          <div>
            <label
              htmlFor="experience"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              How many years of experience do you have in investing?{" "}
              <span className="font-bold text-indigo-600">{rangeValue}</span>
            </label>
            <input
              type="range"
              id="experience"
              min="0"
              max="10"
              value={rangeValue}
              onChange={handleRangeChange}
              className={`rounded-lg w-full p-3 border-2 accent-indigo-600 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
            ></input>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`rounded-lg w-full p-2.5 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
              placeholder="Mention anything that comes into your mind..."
            ></textarea>
          </div>
          <button
            type="submit"
            className={`py-3 px-5 font-medium text-white text-center rounded-lg bg-indigo-600 transition duration-300 hover:ring-2 ring-indigo-400`}
          >
            {t("pages.ContactUsPage.sendButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
