import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/components/providers/session-provider';
import ConditionalHeader from '@/components/layout/conditional-header';
import Footer from '@/components/layout/footer';
import ConditionalFooter from '@/components/layout/conditional-footer';
import '../globals.css';

// Space Grotesk font configuration
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YESHI - Discover New Places in Romania',
  description: 'Find the best restaurants, cafés, bars, and social spots in Bucharest, Constanța, and beyond. Explore new places with YESHI.',
  keywords: 'restaurants, cafes, bars, Romania, Bucharest, Constanta, social spots, discovery',
  authors: [{ name: 'YESHI Team' }],
  openGraph: {
    title: 'YESHI - Discover New Places in Romania',
    description: 'Find the best restaurants, cafés, bars, and social spots in Romania',
    url: 'https://yeshi.app',
    siteName: 'YESHI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YESHI - Discover New Places in Romania',
    description: 'Find the best restaurants, cafés, bars, and social spots in Romania',
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'ro'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-background">
                <ConditionalHeader />
                <main className="flex-1">
                  {children}
                </main>
                <ConditionalFooter />
              </div>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ro' }];
}
