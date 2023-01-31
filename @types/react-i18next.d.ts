import 'react-i18next';
import en from '../src/i18n/dictionaries/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'app';
    resources: typeof en;
  }
}
