import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ee from '../locales/ee.json';
import ru from '../locales/ru.json';

const availLang = ['en', 'ee', 'ru'];
let lang;

const urlParams = new URLSearchParams(window.location.search);
const getWordpressLang = urlParams.get('trp-form-language') || urlParams.get('lang'); // Default translatepress param for form and custom param added for links

const persistedLang = sessionStorage.getItem('persist:root') && JSON.parse(sessionStorage.getItem('persist:root')).language;

if (!!getWordpressLang) {
  if (availLang.includes(getWordpressLang)) {
    lang = getWordpressLang;
  } else {
    lang = 'ee';
  }
} else if (persistedLang) {
  lang = JSON.parse(persistedLang).lang;
} else {
  lang = 'ee';
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ee,
      en,
      ru,
    },
    lng: 'en',
    //debug: true,
    ns: ['common'],
    // defaultNS: 'modal',
    fallbackLng: lang, // use fi if detected lng is not available
    react: {
      wait: false
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
