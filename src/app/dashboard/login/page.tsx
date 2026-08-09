'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Loader2 } from 'lucide-react';

type State = { error?: string } | undefined;

export default function LoginPage() {
  const [state, action, isPending] = useActionState<State, FormData>(
    loginAction,
    undefined,
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / Brand Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[#EC4899] font-bold mb-2">
            Admin Access
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-[#0B1F4D]">
            Maha Jouini
          </h1>
          <p className="text-sm text-[#4A5568] mt-2">
            Content Management Dashboard
          </p>
        </div>

        {/* Card with Soft Pink Accent Treatment */}
        <div className="bg-[#FFF5F8] border border-[#EC4899]/25 shadow-xl p-8 rounded-none">
          <h2 className="text-lg font-serif font-medium text-[#0B1F4D] mb-6 border-b border-[#EC4899]/15 pb-3">
            Sign In
          </h2>

          <form action={action} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-[#0B1F4D]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="hello@mahajouini.net"
                className="w-full px-3.5 py-2.5 text-sm border border-[#E2E8F0] bg-white text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/25 focus:border-[#EC4899] placeholder:text-gray-400 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-[#0B1F4D]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm border border-[#E2E8F0] bg-white text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/25 focus:border-[#EC4899] placeholder:text-gray-400 transition-colors"
              />
            </div>

            {/* Error */}
            {Boolean(state?.error) && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-700">
                {typeof state?.error === 'string' && state.error !== '{}'
                  ? state.error
                  : typeof (state?.error as any)?.message === 'string'
                  ? (state?.error as any).message
                  : 'Invalid email or password.'}
              </div>
            )}

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#4A5568]/60 mt-6">
          This is a private admin area. Access is restricted.
        </p>
      </div>
    </div>
  );
}
