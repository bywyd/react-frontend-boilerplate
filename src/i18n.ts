import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "tr"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      cacheUserLanguage: true,
    },
  });

export default i18n;
