import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './resources/en.json';
import translationRU from './resources/ru.json';
import validationRU from './resources/validationRu.json';
import validationEN from './resources/validationEn.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
      validation: validationEN,
    },
    ru: {
      translation: translationRU,
      validation: validationRU,
    },
  },
  fallbackLng: 'en',
  ns: ['translation', 'validation'],
  defaultNS: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
