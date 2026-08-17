'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

// ── Constants ────────────────────────────────────────────────────────────────
const COOKIE_NAME = 'admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours
const SCRYPT_KEYLEN = 64;

const scryptAsync = promisify(scrypt);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the JWT secret as a Uint8Array for jose. Throws if missing. */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET env var is missing or too short (min 32 chars).');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Verifies a password against a stored scrypt hash.
 * Hash format: "<salt_hex>:<hash_hex>"  — no special characters.
 * Uses Node.js crypto.timingSafeEqual to prevent timing attacks.
 */
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [saltHex, hashHex] = parts;

  try {
    const salt = Buffer.from(saltHex, 'hex');
    const storedHashBuf = Buffer.from(hashHex, 'hex');
    const derivedBuf = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer;
    // timingSafeEqual prevents timing-based attacks
    return timingSafeEqual(derivedBuf, storedHashBuf);
  } catch {
    return false;
  }
}

/**
 * Constant-time string comparison to avoid timing-based email enumeration.
 * Pads shorter string to prevent length-based timing leaks.
 */
function safeStringEqual(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  const bufA = Buffer.alloc(maxLen);
  const bufB = Buffer.alloc(maxLen);
  bufA.write(a);
  bufB.write(b);
  return timingSafeEqual(bufA, bufB);
}

// ── Actions ───────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  // 1. Basic input validation
  const email    = (formData.get('email')    as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null)         ?? '';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // 2. Read credentials from env (never from client-controlled input)
  const adminEmail = process.env.ADMIN_EMAIL         ?? '';
  const adminHash  = process.env.ADMIN_PASSWORD_HASH ?? '';

  if (!adminEmail || !adminHash) {
    console.error('[Auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH env vars are not set.');
    return { error: 'Server configuration error. Contact the site administrator.' };
  }

  // 3. Verify email (constant-time) AND password (scrypt + timingSafeEqual).
  //    Both checks always run to prevent timing-based enumeration.
  const emailMatch    = safeStringEqual(email.toLowerCase(), adminEmail.toLowerCase());
  const passwordMatch = await verifyPassword(password, adminHash);

  if (!emailMatch || !passwordMatch) {
    // Generic message — never reveal which field failed
    return { error: 'Invalid email or password.' };
  }

  // 4. Sign a short-lived HS256 JWT
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

  // 5. Persist token in a secure HTTP-only cookie scoped to /dashboard
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,                                     // not accessible to JS
    secure:   process.env.NODE_ENV === 'production',    // HTTPS only in prod
    sameSite: 'lax',                                    // CSRF protection
    path:     '/dashboard',                             // scoped to dashboard
    maxAge:   SESSION_DURATION_SECONDS,
  });

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  // Overwrite with empty value + zero maxAge to immediately expire
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/dashboard',
    maxAge:   0,
  });

  redirect('/dashboard/login');
}
