import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Lazily create client inside handler after env validation

export async function POST(request: NextRequest) {
  try {
    // Guard: ensure required envs exist to avoid framework HTML error pages
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Forgot-password ENV missing', {
        hasUrl: !!supabaseUrl,
        hasAnon: !!supabaseAnonKey,
      });
      return NextResponse.json(
        { error: 'Server is not configured for email. Missing Supabase env.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Use Supabase's built-in password reset
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
      console.error('Password reset error:', error);
      return NextResponse.json(
        { error: 'Failed to send reset email.', details: error.message },
        { status: 500 }
      );
    }

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      { message: 'If an account with that email exists, we\'ve sent a password reset link.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password unhandled error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error.', details: (error as Error)?.message ?? 'unknown' },
      { status: 500 }
    );
  }
}
