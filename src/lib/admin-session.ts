import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

// Use the existing dashboard session; never accept an admin flag from a form.
export async function isAdminSession(): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return false;
  const token = (await cookies()).get('admin_session')?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
    });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function requireAdminSession(): Promise<void> {
  if (!(await isAdminSession())) redirect('/dashboard/login');
}
