import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English ships with the page; other languages download only when selected.
import en from "./locales/en/translation.json";

export const LANGUAGES = [
  { code: "en", label: "🇺🇸 English" },
  { code: "tl", label: "🇵🇭 Filipino" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "ja", label: "🇯🇵 日本語" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "ko", label: "🇰🇷 한국어" },
];

const lazyLocales = {
  type: "backend",
  read(lng, _ns, callback) {
    import(`./locales/${lng}/translation.json`)
      .then((mod) => callback(null, mod.default))
      .catch((err) => callback(err, null));
  },
};

i18n
  .use(LanguageDetector)
  .use(lazyLocales)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true, // "en-US" -> "en", "zh-CN" -> "zh"
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

// Keep <html lang> in sync for screen readers and search engines.
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
