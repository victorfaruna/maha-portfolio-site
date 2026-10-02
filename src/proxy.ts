import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Route guard and holding mode controller.
 *
 * Next.js 16: middleware is named to "proxy".
 *
 * HOLDING_MODE: Set to false once payment is settled to re-enable direct access to all public sub-pages.
 */
const HOLDING_MODE = true;
const COOKIE_NAME = 'admin_session';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET env var is missing or too short.');
  }
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If holding mode is active, direct all non-dashboard public requests to the holding page at '/'
  if (
    HOLDING_MODE &&
    pathname !== '/' &&
    !pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/api')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Only guard /dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Allow login page through unconditionally
  if (pathname === '/dashboard/login') {
    return NextResponse.next();
  }

  // Retrieve session cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return redirectToLogin(request, pathname);
  }

  // Verify JWT signature + expiry
  try {
    await jwtVerify(token, getJwtSecret(), {
      algorithms: ['HS256'],
    });
    // Valid token — allow request through
    return NextResponse.next();
  } catch {
    // Token is expired, tampered, or invalid — force re-login
    return redirectToLogin(request, pathname);
  }
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/dashboard/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  const response = NextResponse.redirect(loginUrl);
  // Clear any stale/invalid cookie
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/dashboard',
    maxAge: 0,
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images directory)
     * - static file extensions (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|images|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|docx)$).*)',
  ],
};
