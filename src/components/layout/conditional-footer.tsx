"use client"

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on signup and login pages
  const hideFooter = pathname?.includes('/signup') || pathname?.includes('/login');

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}
