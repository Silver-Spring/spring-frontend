import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Import TOKEN_NAME directly to avoid importing client-side hooks
const TOKEN_NAME = 'authToken';

const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

const protectedPaths = ['/assessment', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_NAME)?.value;

  // Handle root path - redirect based on auth status
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/assessment', request.url));
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect authenticated users away from public auth pages
  if (token && publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/assessment', request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/assessment/:path*',
    '/admin/:path*',
    '/auth/:path*',
  ],
};
