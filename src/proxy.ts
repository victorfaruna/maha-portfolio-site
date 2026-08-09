import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Route guard for /dashboard routes.
 *
 * Next.js 16: middleware is renamed to "proxy".
 * This file must export a function named `proxy` (not `middleware`).
 *
 * Auth strategy:
 * - Supabase writes a session cookie named "sb-{project-ref}-auth-token"
 *   after a successful signInWithPassword() call.
 * - We check for ANY cookie that starts with "sb-" and ends with "-auth-token"
 *   as a lightweight gate. The actual session is validated server-side in
 *   each dashboard page/action using the service role client.
 *
 * Public routes within /dashboard that skip the guard:
 * - /dashboard/login
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Allow login page through unconditionally
  if (pathname === '/dashboard/login') {
    return NextResponse.next();
  }

  // Check for any Supabase auth session cookie
  const cookies = request.cookies.getAll();
  const hasSession = cookies.some(
    (c) =>
      (c.name.startsWith('sb-') && c.name.endsWith('-auth-token')) ||
      c.name === 'sb-access-token'
  );

  if (!hasSession) {
    const loginUrl = new URL('/dashboard/login', request.url);
    // Pass the attempted URL so we can redirect back after login
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
