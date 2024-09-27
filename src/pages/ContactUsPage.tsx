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
      title: "",
      content: "pages.ContactUsPage.description.1",
    },
    {
      id: 2,
      title: "",
      content: "pages.ContactUsPage.description.2",
    },
    {
      id: 3,
      title: "",
      content: "pages.ContactUsPage.description.3",
    },
    {
      id: 4,
      title: "",
      content: "pages.ContactUsPage.description.4",
    },
    {
      id: 5,
      title: "",
      content: "pages.ContactUsPage.description.5",
    },
    {
      id: 6,
      title: "",
      content: "pages.ContactUsPage.description.6",
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
      className={`h-full min-h-[calc(100vh-80px)] grid grid-cols-[1fr_2fr_1fr] grid-rows-[300px_auto_auto] sm:grid-rows-[300px_200px_auto] ${darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
      data-testid="contact-us-page-id"
    >
      <div className="col-span-3 xl:col-start-2 xl:col-end-3 row-start-1 p-4 flex justify-center flex-col text-center">
        <h2
          className={`text-4xl md:text-5xl font-bold ${darkTheme ? "text-gray-300" : "text-gray-900"} leading-[3.25rem] mb-5 sm:mb-10`}
        >
          {t("pages.ContactUsPage.majorHeader")}
        </h2>
        <p className="text-gray-500">{t("pages.ContactUsPage.minorHeader")}</p>
      </div>

      <div className="col-span-3 xl:col-start-2 xl:col-end-3 row-start-2 p-4 text-center">
        <Card>
          <div className="relative flex items-center justify-center space-x-10 h-full">
            {/* Left Button */}
            <button
              className="absolute left-0 font-bold text-4xl text-indigo-600"
              onClick={handlePrev}
            >
              &lt;
            </button>

            {/* Content */}
            {detailsPageContent[currentSlide].id === 1 && (
              <p className="text-gray-500 pr-10">
                <Trans i18nKey="pages.ContactUsPage.description.1">
                  <a
                    href="https://www.etoro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-300 hover:text-indigo-500"
                  >
                    Etoro
                  </a>
                </Trans>
              </p>
            )}
            {detailsPageContent[currentSlide].id != 1 && (
              <p className="text-gray-500 pr-10">
                {t(detailsPageContent[currentSlide].content)}
              </p>
            )}

            {/* Right Button */}
            <button
              className="absolute right-0 font-bold text-4xl text-indigo-600"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </Card>
      </div>

      <div className="col-span-3 xl:col-start-2 xl:col-end-3 row-start-3 p-4">
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
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
            <label htmlFor="email" className="block mb-2 font-medium">
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
            <label htmlFor="subject" className="block mb-2 font-medium">
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
            <label htmlFor="message" className="block mb-2 font-medium">
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`ounded-lg w-full p-2.5 border-2 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
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
      </div>
    </div>
  );
};

export default ContactUsPage;
