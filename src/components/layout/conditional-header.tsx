"use client"

import { usePathname } from 'next/navigation';
import Header from './header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideHeader = pathname?.includes('/signup') || pathname?.includes('/login') || pathname?.includes('/forgot-password') || pathname?.includes('/reset-password');

  if (hideHeader) {
    return null;
  }

  return <Header />;
}
