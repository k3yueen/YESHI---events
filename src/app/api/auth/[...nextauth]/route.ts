// Temporarily disabled NextAuth
// import NextAuth from 'next-auth';
// import { authOptions } from '@/lib/auth';

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'NextAuth temporarily disabled' });
}

export async function POST() {
  return NextResponse.json({ message: 'NextAuth temporarily disabled' });
}
