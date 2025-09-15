import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { SignupForm } from '@/components/auth/signup-form';
import Link from 'next/link';
import { Logo } from '@/components/auth/logo';

interface SignupPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SignupPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'ro' ? 'Înregistrare - YESHI' : 'Sign Up - YESHI',
    description: locale === 'ro'
      ? 'Creează un cont YESHI pentru a descoperi locuri noi în orașul tău'
      : 'Create a YESHI account to discover new places in your city',
  };
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { locale } = await params;
  const t = await getTranslations('signup');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden" style={{ pointerEvents: 'auto' }}>
      {/* Background gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Logo in top left */}
      <div className="absolute top-8 left-8">
        <Logo />
      </div>


      {/* Main signup card - perfectly centered */}
      <div className="flex items-center justify-center w-full h-full" style={{ pointerEvents: 'auto' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '32px',
            width: '612px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
            fontWeight: '500'
          }}
        >
          {/* Back link */}
          <div className="mb-3">
            <Link href="/login" className="text-gray-600 hover:text-gray-800 text-sm font-bold">
              ← Back
            </Link>
          </div>

          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-black text-black" tabIndex={-1}>
              {t('title')}
            </h1>
          </div>


          {/* Signup Form */}
          <SignupForm />

          {/* Footer */}
          <div className="mt-6 mb-4 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}