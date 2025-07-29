import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import tl from "./locales/tl/translation.json";
import es from "./locales/es/translation.json";
import zh from "./locales/zh/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tl: { translation: tl },
      es: { translation: es },
      zh: { translation: zh },
      ja: { translation: ja },
      ko: { translation: ko }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
