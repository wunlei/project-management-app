import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './resources/en.json';
import translationRU from './resources/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
  },
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
