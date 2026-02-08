import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viTranslation from './vi/translation.json';
import enTranslation from './en/translation.json';

// Get saved language from localStorage or default to 'vi'
const savedLanguage = localStorage.getItem('language') || 'vi';

i18n.use(initReactI18next).init({
	resources: {
		vi: {
			translation: viTranslation,
		},
		en: {
			translation: enTranslation,
		},
	},
	lng: savedLanguage,
	fallbackLng: 'vi',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
