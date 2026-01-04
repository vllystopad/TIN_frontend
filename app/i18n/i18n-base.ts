import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const;

const i18nbase = i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18nbase;
