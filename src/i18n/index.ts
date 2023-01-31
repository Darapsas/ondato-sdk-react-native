import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import { Locales } from './constants';

import ltDictionary from './dictionaries/lt.json';
import enDictionary from './dictionaries/en.json';
import deDictionary from './dictionaries/de.json';
import eeDictionary from './dictionaries/ee.json';
import lvDictionary from './dictionaries/lv.json';
import ruDictionary from './dictionaries/ru.json';
import sqDictionary from './dictionaries/sq.json';

const resources = {
  [Locales.lt]: ltDictionary,
  [Locales.en]: enDictionary,
  [Locales.de]: deDictionary,
  [Locales.ee]: eeDictionary,
  [Locales.lv]: lvDictionary,
  [Locales.ru]: ruDictionary,
  [Locales.sq]: sqDictionary,
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: (callback) => {
    const deviceLocale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    const formattedDeviceLocale = deviceLocale.split('_')[0].toUpperCase();
    callback(formattedDeviceLocale);
  },
  cacheUserLanguage: () => {},
};

export const setupTranslations = () => {
  i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
      resources,
      lng: Locales.en,
      defaultNS: 'app',
      interpolation: { escapeValue: false },
      compatibilityJSON: 'v3',
    });
};
