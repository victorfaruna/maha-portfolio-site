'use client';

import { createClient } from '@supabase/supabase-js';

/**
 * Browser-side Supabase client.
 * Uses the ANON key only — safe to expose.
 * Used on the login page for signInWithPassword().
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}
