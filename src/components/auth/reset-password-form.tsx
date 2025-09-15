'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function ResetPasswordForm() {
  const t = useTranslations('resetPassword');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      alert(passwordErrors.join('\n'));
      setIsLoading(false);
      return;
    }

    try {
      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error('Password update error:', error);
        alert('Failed to update password. Please try again.');
        return;
      }

      alert('Password changed successfully! You can now sign in with your new password.');
      window.location.href = '/login';

    } catch (error) {
      console.error('Reset password error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder={t('password')}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
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

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            placeholder={t('confirmPassword')}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
            style={{ backgroundColor: 'white', color: 'rgb(17, 24, 39)', fontFamily: 'inherit', fontSize: '16px', fontWeight: '500' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('changing') : t('changePassword')}
      </button>
    </form>
  );
}
