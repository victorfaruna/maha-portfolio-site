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

/**
 * Server-side Supabase client.
 * Uses the SERVICE ROLE KEY — bypasses RLS for admin mutations.
 * NEVER import this in client components or expose to the browser.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Anon server-side client — for reading public data (SELECT only, respects RLS).
 * Safe to use in server components that only read data.
 */
export function createAnonServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
