import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import ar from './locales/ar';

const i18n = new I18n({en, ar});
i18n.fallbacks = true;

const setI18nConfig = async () => {
  const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
  const locales = RNLocalize.getLocales();

  if (savedLanguage === 'English') {
    i18n.locale = 'en';
  } else if (savedLanguage === 'Arabic') {
    i18n.locale = 'ar';
  } else if (Array.isArray(locales) && locales.length > 0) {
    // Auto-detect device language
    i18n.locale = locales[0].languageTag.startsWith('ar') ? 'ar' : 'en';
  } else {
    i18n.locale = 'en'; // default fallback
  }
};

export {i18n, setI18nConfig};
