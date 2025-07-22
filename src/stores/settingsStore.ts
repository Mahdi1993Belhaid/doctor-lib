import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<'light' | 'dark'>('light');
  const language = ref<'ar' | 'en'>('ar');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
    document.documentElement.setAttribute('data-theme', theme.value);
  };

  const setLanguage = (lang: 'ar' | 'en') => {
    language.value = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  const loadSettings = () => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedLanguage = localStorage.getItem('language') as 'ar' | 'en';
    if (savedTheme) {
      theme.value = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (savedLanguage) {
      language.value = savedLanguage;
      document.documentElement.setAttribute('lang', savedLanguage);
    }
  };

  return {
    theme,
    language,
    toggleTheme,
    setLanguage,
    loadSettings,
  };
});