'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const t = useTranslations('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // Redirect to home page or dashboard
        window.location.href = '/';
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t('email')}
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder={t('password')}
            autoComplete="current-password"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div style={{ textAlign: 'right' }}>
          <Link
            href="/forgot-password"
            style={{
              borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
              borderTopStyle: 'solid',
              borderTopWidth: '0px',
              boxSizing: 'border-box',
              color: 'rgb(28, 28, 28)',
              cursor: 'pointer',
              display: 'inline',
              fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
              fontSize: '14.875px',
              fontWeight: '500',
              height: 'auto',
              lineHeight: '21.25px',
              marginBottom: '0px',
              marginLeft: '0px',
              marginRight: '0px',
              marginTop: '0px',
              outlineColor: 'rgb(28, 28, 28)',
              paddingBottom: '0px',
              paddingLeft: '0px',
              paddingRight: '0px',
              paddingTop: '0px',
              textAlign: 'right',
              textDecorationColor: 'rgb(28, 28, 28)',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationThickness: 'auto',
              width: 'auto',
              WebkitFontSmoothing: 'antialiased',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
            }}
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('signingIn') : 'SIGN IN'}
      </button>


      {/* Create Account Link */}
      <div className="text-center">
        <span className="text-gray-600">{t('noAccount')} </span>
        <Link
          href="/signup"
          className="text-black hover:text-gray-800 font-medium hover:underline transition-colors"
        >
          {t('createAccount')}
        </Link>
      </div>
    </form>
  );
}
