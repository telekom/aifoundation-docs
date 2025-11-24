// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './shared/locales/en.json';
import de from './shared/locales/de.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            de: { translation: de },
        },
        lng: 'en', // default
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
