import { getCurrentLanguage } from './slice';
import { useSelector } from 'react-redux';
import { Path } from './utils';
import enTranslations from '@assets/i18n/en';
import I18n from 'i18n-js';

/**
 *
 * Return a translation function,
 * it changes dynamically according to the selected language
 *
 */
export function useTranslate() {
  const currentLanguage = useSelector(getCurrentLanguage);
  return translateFactory(currentLanguage);
}

export function translateFactory(language: string) {
  return function translate(
    key: Path<typeof enTranslations>,
    options?: {
      default?: string;
    },
  ) {
    return I18n.t(key, {
      locale: language,
      defaultValue: options?.default,
    });
  };
}
