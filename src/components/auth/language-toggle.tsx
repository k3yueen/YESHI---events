'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ro' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
      aria-label={locale === 'en' ? 'Switch to Romanian' : 'Switch to English'}
    >
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {locale === 'en' ? 'EN' : 'RO'}
      </span>
      <span className="ml-2 text-xs text-gray-500">
        {locale === 'en' ? '→ RO' : '→ EN'}
      </span>
    </button>
  );
}
