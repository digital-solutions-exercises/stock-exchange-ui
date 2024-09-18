import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Trans, useTranslation } from "react-i18next";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <div
      className={`h-full lg:h-[calc(100vh-80px)] grid grid-cols-2 lg:grid-rows-8 lg:auto-rows-fr gap-3 sm:gap-6 p-6 sm:px-10 ${
        darkTheme ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
      data-testid="contact-us-page-id"
    >
      <div className="col-span-2 md:row-span-1 flex justify-center items-center">
        <h2 className="text-4xl font-bold tracking-tight">
          {t("pages.ContactUsPage.majorHeader")}
        </h2>
      </div>
      <div
        className={`py-8 lg:px-20 xl:px-40 col-span-2 md:col-span-1 md:row-span-7 overflow-y-scroll custom-scrollbar ${darkTheme ? "custom-scrollbar-dark" : ""}`}
      >
        <ul className={`w-full h-full flex flex-col justify-between`}>
          <li key={"1"} className="py-2">
            <span>{t("pages.ContactUsPage.description.1")}</span>
          </li>
          <li key={"2"} className="py-2">
            <span>
              <Trans i18nKey="pages.ContactUsPage.description.2">
                <a
                  href="https://www.etoro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-300 hover:text-indigo-500"
                >
                  Etoro
                </a>
              </Trans>
            </span>
          </li>
          <li key={"3"} className="py-2">
            <span>{t("pages.ContactUsPage.description.3")}</span>
          </li>
          <li key={"4"} className="py-2">
            <span>{t("pages.ContactUsPage.description.4")}</span>
          </li>
          <li key={"5"} className="py-2">
            <span>{t("pages.ContactUsPage.description.5")}</span>
          </li>
          <li key={"6"} className="py-2">
            <span>{t("pages.ContactUsPage.description.6")}</span>
          </li>
          <li key={"7"} className="py-2">
            <span>{t("pages.ContactUsPage.description.7")}</span>
          </li>
        </ul>
      </div>
      <div className="py-8 px-4 col-span-2 md:col-span-1 md:row-span-6">
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
