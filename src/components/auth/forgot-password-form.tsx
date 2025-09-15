'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Mail } from 'lucide-react';

export function ForgotPasswordForm() {
  const t = useTranslations('forgotPassword');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      let data: { error?: string; message?: string } | null = null;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        console.error('Non-JSON response from forgot-password:', text);
        throw new Error('Server returned invalid response');
      }

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('checkEmail')}</h2>
          <p className="text-gray-600">
            {t('checkEmailMessage')}
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-black hover:underline font-medium"
        >
          {t('tryAnotherEmail')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('sending') : t('sendResetLink')}
      </button>
    </form>
  );
}
