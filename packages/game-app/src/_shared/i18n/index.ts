import I18n from "i18n-js";
import enTranslations from "@assets/i18n/en";
import { reducer, actions, name } from "./slice";
import { useTranslate } from "./useTranslate";

export function initializeI18n() {
  const defaultLocale = "en-EN";

  I18n.defaultLocale = defaultLocale;
  I18n.locale = defaultLocale;

  I18n.translations[defaultLocale] = enTranslations;
}

export { reducer, actions, name, useTranslate };
