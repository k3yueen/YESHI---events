import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Debug: log the locale parameter
  console.log('next-intl request config - locale:', locale);

  // If locale is undefined, use default locale
  if (!locale) {
    locale = 'en';
  }

  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'ro'].includes(locale)) {
    console.error(`Invalid locale: ${locale}, falling back to 'en'`);
    locale = 'en';
  }

  // Import messages for the current locale
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    locale
  };
});
