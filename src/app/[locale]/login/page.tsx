import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/auth/logo';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'ro' ? 'Conectare - YESHI' : 'Sign In - YESHI',
    description: locale === 'ro'
      ? 'Conectează-te la contul tău YESHI pentru a descoperi locuri noi în orașul tău'
      : 'Sign in to your YESHI account to discover new places in your city',
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const t = await getTranslations('login');

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

      {/* Main login card */}
      <div className="flex items-center justify-center w-full h-full" style={{ pointerEvents: 'auto' }}>
        <div
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            position: 'relative',
            zIndex: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomLeftRadius: '4.25px',
            borderBottomRightRadius: '4.25px',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0px',
            borderImageOutset: '0',
            borderImageRepeat: 'stretch',
            borderImageSlice: '100%',
            borderImageSource: 'none',
            borderImageWidth: '1',
            borderLeftColor: 'rgba(0, 0, 0, 0.1)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '0px',
            borderRightColor: 'rgba(0, 0, 0, 0.1)',
            borderRightStyle: 'solid',
            borderRightWidth: '0px',
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '4.25px',
            borderTopRightRadius: '4.25px',
            borderTopStyle: 'solid',
            borderTopWidth: '0px',
            boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
            boxSizing: 'border-box',
            color: 'rgb(28, 28, 28)',
            colorScheme: 'light',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
            fontFeatureSettings: 'normal',
            fontVariationSettings: 'normal',
            fontWeight: '500',
            height: '580px',
            lineHeight: '25.5px',
            marginBottom: '0px',
            marginInlineEnd: '253.506px',
            marginInlineStart: '253.506px',
            marginLeft: '253.506px',
            marginRight: '253.506px',
            marginTop: '0px',
            maxWidth: '612px',
            outlineColor: 'rgb(28, 28, 28)',
            paddingBottom: '34px',
            paddingLeft: '34px',
            paddingRight: '34px',
            paddingTop: '34px',
            tabSize: '4',
            textSizeAdjust: '100%',
            unicodeBidi: 'isolate',
            width: '611.992px',
            WebkitFontSmoothing: 'antialiased',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-black mb-2" tabIndex={-1}>
              LOG IN
            </h1>
            <p className="text-gray-600 text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
