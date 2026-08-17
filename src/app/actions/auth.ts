'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

// ── Constants ────────────────────────────────────────────────────────────────
const COOKIE_NAME = 'admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the JWT secret as a Uint8Array for jose. Throws if missing. */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET env var is missing or too short (min 32 chars).');
  }
  return new TextEncoder().encode(secret);
}

/** Constant-time string comparison to avoid timing attacks on email. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// ── Actions ───────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  // 1. Basic input validation
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null) ?? '';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // 2. Read credentials from env (never from client input)
  const adminEmail = process.env.ADMIN_EMAIL ?? '';
  const adminHash  = process.env.ADMIN_PASSWORD_HASH ?? '';

  if (!adminEmail || !adminHash) {
    // Misconfigured server — don't leak details
    console.error('[Auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH env vars are not set.');
    return { error: 'Server configuration error. Contact the site administrator.' };
  }

  // 3. Verify email (constant-time) + password (bcrypt)
  const emailMatch    = safeEqual(email.toLowerCase(), adminEmail.toLowerCase());
  // Always run bcrypt even on email mismatch to prevent timing-based enumeration
  const passwordMatch = await bcrypt.compare(password, adminHash);

  if (!emailMatch || !passwordMatch) {
    return { error: 'Invalid email or password.' };
  }

  // 4. Sign a short-lived JWT
  let token: string;
  try {
    token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
      .setSubject(adminEmail)
      .sign(getJwtSecret());
  } catch (err) {
    console.error('[Auth] JWT signing failed:', err);
    return { error: 'Failed to create session. Please try again.' };
  }

  // 5. Persist token in a secure HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,                                        // not accessible to JS
    secure: process.env.NODE_ENV === 'production',         // HTTPS only in prod
    sameSite: 'lax',                                       // CSRF protection
    path: '/dashboard',                                    // scoped to dashboard
    maxAge: SESSION_DURATION_SECONDS,
  });

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  // Clear the session cookie by setting maxAge to 0
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/dashboard',
    maxAge: 0,
  });

  redirect('/dashboard/login');
}
