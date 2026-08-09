'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for Node 20 server environment to prevent RealtimeClient initialization crashes
if (typeof globalThis.WebSocket === 'undefined') {
  class DummyWebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  }
  (globalThis as any).WebSocket = DummyWebSocket;
}

function createAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables (URL/ANON_KEY) are missing. Please restart your dev server.');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = (formData.get('email') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  let sessionData: any = null;

  try {
    const supabase = createAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const errMsg = typeof error === 'string' ? error : error?.message ? String(error.message) : 'Invalid email or password.';
      return { error: errMsg };
    }

    if (!data?.session) {
      return { error: 'Failed to establish session. Please verify your credentials.' };
    }

    sessionData = data.session;
  } catch (err: any) {
    const rawMsg = typeof err === 'string' ? err : err?.message ? String(err.message) : '';
    if (rawMsg.includes('fetch failed')) {
      return { error: 'Network connection error while connecting to Supabase. Please verify your internet connection or try again in a moment.' };
    }
    return { error: rawMsg || 'An unexpected error occurred.' };
  }

  // Persist session tokens in HTTP-only cookies
  const cookieStore = await cookies();
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: sessionData.expires_in,
  };

  cookieStore.set('sb-access-token', sessionData.access_token, cookieOpts);
  cookieStore.set('sb-refresh-token', sessionData.refresh_token, {
    ...cookieOpts,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  const all = cookieStore.getAll();
  for (const c of all) {
    if (c.name.startsWith('sb-')) {
      cookieStore.delete(c.name);
    }
  }

  redirect('/dashboard/login');
}
