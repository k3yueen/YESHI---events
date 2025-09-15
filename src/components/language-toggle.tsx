"use client"

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ro' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2"
      title={locale === 'en' ? 'Schimbă în română' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline-block">
        {locale === 'en' ? 'RO' : 'EN'}
      </span>
    </Button>
  );
}
