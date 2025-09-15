import { getRequestConfig } from 'next-intl/server';
import en from './messages/en.json';
import ro from './messages/ro.json';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: locale === 'ro' ? ro : en,
    locale: locale
  };
});

