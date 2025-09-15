'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

// Password validation function
function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('• At least 8 characters');
  }
  if (password.length > 12) {
    errors.push('• Maximum 12 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('• At least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('• At least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('• At least one number');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('• At least one special character');
  }

  return errors;
}

// Check individual password requirements
function checkPasswordRequirements(password: string) {
  return {
    length: password.length >= 8 && password.length <= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };
}

export function SignupForm() {
  const t = useTranslations('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const email = formData.get('email') as string;
      const confirmEmail = formData.get('confirmEmail') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // Basic validation
      if (email !== confirmEmail) {
        alert('Emails do not match');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Password strength validation
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        alert('Password requirements:\n' + passwordErrors.join('\n'));
        return;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully! You can now login.');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        const errorMessage = data.details ? `${data.error}: ${data.details}` : data.error || 'Signup failed';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder={t('firstName')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
          />
        </div>
        <div>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder={t('lastName')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t('email')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)' }}
        />
      </div>

      {/* Confirm Email Field */}
      <div>
        <input
          id="confirmEmail"
          name="confirmEmail"
          type="email"
          required
          autoComplete="email"
          placeholder={t('confirmEmail')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
          style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)' }}
        />
      </div>

      {/* Password Field */}
      <div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {/* Password requirements */}
        {password && (
          <div className="mt-2 text-xs">
            <p className="font-medium mb-1 text-gray-700">Password requirements:</p>
            <ul className="space-y-1">
              <li className={`flex items-center ${checkPasswordRequirements(password).length ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-2">{checkPasswordRequirements(password).length ? '✓' : '•'}</span>
                8-12 characters
              </li>
              <li className={`flex items-center ${checkPasswordRequirements(password).uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-2">{checkPasswordRequirements(password).uppercase ? '✓' : '•'}</span>
                At least one uppercase letter
              </li>
              <li className={`flex items-center ${checkPasswordRequirements(password).lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-2">{checkPasswordRequirements(password).lowercase ? '✓' : '•'}</span>
                At least one lowercase letter
              </li>
              <li className={`flex items-center ${checkPasswordRequirements(password).number ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-2">{checkPasswordRequirements(password).number ? '✓' : '•'}</span>
                At least one number
              </li>
              <li className={`flex items-center ${checkPasswordRequirements(password).special ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-2">{checkPasswordRequirements(password).special ? '✓' : '•'}</span>
                At least one special character
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Password Confirmation Field */}
      <div>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            placeholder={t('passwordConfirmation')}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('signingUp') : 'SIGN UP'}
      </button>


      {/* Login Link */}
      <div className="text-center">
        <span className="text-gray-600">{t('alreadyHaveAccount')} </span>
        <Link
          href="/login"
          className="text-black hover:text-gray-800 font-medium hover:underline transition-colors"
        >
          {t('logIn')}
        </Link>
      </div>

    </form>
  );
}