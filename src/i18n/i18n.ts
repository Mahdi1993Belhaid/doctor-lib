import { createI18n } from 'vue-i18n';
import ar from './locales/ar.json';
import en from './locales/fr.json';

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'ar', // Default language
  fallbackLocale: 'fr', // Fallback language
  messages: {
    ar,
    en,
  },
});

export default i18n;