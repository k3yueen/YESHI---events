import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { password, confirmPassword } = await request.json();

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Password and confirmation are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordErrors },
        { status: 400 }
      );
    }

    // Get the user from the session (Supabase handles the token verification)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session. Please request a new password reset link.' },
        { status: 401 }
      );
    }

    // Update password using Supabase auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      console.error('Password update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      );
    }

    // Also update the password in our custom User table
    const client = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      await client.query(
        'UPDATE "User" SET password = $1, "updatedAt" = NOW() WHERE email = $2',
        [hashedPassword, user.email]
      );
    } finally {
      client.release();
    }

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

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
