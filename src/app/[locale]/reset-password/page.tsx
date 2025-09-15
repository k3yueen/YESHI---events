import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Logo } from '@/components/auth/logo';

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResetPasswordPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'ro' ? 'Schimbă parola - YESHI' : 'Change Password - YESHI',
    description: locale === 'ro'
      ? 'Schimbă parola contului tău YESHI'
      : 'Change your YESHI account password',
  };
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { locale } = await params;
  const t = await getTranslations('resetPassword');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Logo in top left */}
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      {/* Main reset password card */}
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
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-black mb-2" tabIndex={-1}>
              {t('title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Reset Password Form */}
          <ResetPasswordForm />

        </div>
      </div>
    </div>
  );
}
