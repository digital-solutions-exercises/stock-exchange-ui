import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { Trans, useTranslation } from "react-i18next";
import Card from "../components/Card";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  const [currentSlide, setCurrentSlide] = useState(0);

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
      className={`relative h-full min-h-[calc(100vh-80px)] grid grid-cols-[1fr_1fr_1fr] grid-rows-[300px_auto] sm:grid-rows-[300px_auto]`}
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

      <div className="relative z-10 col-span-3 row-start-1 p-4 flex justify-center flex-col text-center">
        <h2
          className={`text-4xl md:text-5xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5 sm:mb-10`}
        >
          {t("pages.ContactUsPage.majorHeader")}
        </h2>
        <p className={`${darkTheme ? "text-gray-300" : "text-gray-600"}`}>
          {t("pages.ContactUsPage.minorHeader")}
        </p>
      </div>

      <div className="relative z-10 col-span-3 md:col-start-1 md:col-end-2 md:row-start-2 p-4 text-center">
        {/* Dots navigation */}
        <div className="relative flex flex-col items-center justify-center h-60 sm:h-full sm:leading-[3rem] font-bold">
          {detailsPageContent[currentSlide].id === 1 && (
            <p
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"} mb-2`}
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
              className={`${darkTheme ? "text-gray-300" : "text-gray-600"} mb-2`}
            >
              {t(detailsPageContent[currentSlide].content)}
            </p>
          )}

          {/* Dots navigation */}
          <div className="absolute bottom-4 flex justify-center space-x-2">
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

      <div className="relative z-10 col-span-3 md:col-start-2 md:col-end-4 xl:col-end-3 md:row-start-2 p-4">
        <Card>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              >
                Your email
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
                Your email
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
                Your email
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
                htmlFor="subject"
                className={`block mb-2 font-medium ${darkTheme ? "text-gray-300" : "text-gray-600"}`}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className={`rounded-lg w-full p-3 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
                placeholder="Let us know how we can help you"
                required
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
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className={`py-3 px-5 font-medium text-white text-center rounded-lg bg-indigo-600 transition duration-300 hover:ring-2 ring-indigo-400`}
            >
              {t("pages.ContactUsPage.sendButton")}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactUsPage;
