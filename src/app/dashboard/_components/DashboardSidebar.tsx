'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Mic2,
  Award,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isResearchActive =
    pathname.startsWith('/dashboard/publications') ||
    pathname.startsWith('/dashboard/books') ||
    pathname.startsWith('/dashboard/media');

  const [researchOpen, setResearchOpen] = useState(true);

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-0.5">
            Admin Dashboard
          </p>
          <h1 className="text-lg font-serif font-normal text-white leading-tight">
            Maha Jouini
          </h1>
          <p className="text-xs text-white/40 mt-0.5">Content Management</p>
        </div>
        {/* Close button on mobile */}
        <button
          className="md:hidden p-1 text-white/60 hover:text-white"
          onClick={closeMobile}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {/* 1. Overview */}
        <Link
          href="/dashboard"
          onClick={closeMobile}
          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            pathname === '/dashboard'
              ? 'bg-white/10 text-white border-l-2 border-[#EC4899]'
              : 'text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span>Overview</span>
        </Link>

        {/* 2. AI Solutions (Placeholder) */}
        <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/35 cursor-not-allowed border-l-2 border-transparent select-none">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-white/30 shrink-0" />
            <span>AI Solutions</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-normal shrink-0">
            Soon
          </span>
        </div>

        {/* 3. Research & Publications (Functional Accordion) */}
        <div>
          <button
            type="button"
            onClick={() => setResearchOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isResearchActive
                ? 'bg-white/10 text-white border-l-2 border-[#EC4899]'
                : 'text-white/80 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-4 h-4 text-[#EC4899] shrink-0" />
              <span className="truncate">Research & Publications</span>
            </div>
            {researchOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
            )}
          </button>

          {researchOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-1">
              <Link
                href="/dashboard/publications"
                onClick={closeMobile}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                  pathname.startsWith('/dashboard/publications')
                    ? 'text-[#EC4899] font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>Publications</span>
              </Link>

              <Link
                href="/dashboard/books"
                onClick={closeMobile}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                  pathname.startsWith('/dashboard/books')
                    ? 'text-[#EC4899] font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Books</span>
              </Link>

              <Link
                href="/dashboard/media"
                onClick={closeMobile}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                  pathname.startsWith('/dashboard/media')
                    ? 'text-[#EC4899] font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Media Gallery</span>
              </Link>
            </div>
          )}
        </div>

        {/* 4. Speaking & Media (Placeholder) */}
        <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/35 cursor-not-allowed border-l-2 border-transparent select-none">
          <div className="flex items-center gap-3 min-w-0">
            <Mic2 className="w-4 h-4 text-white/30 shrink-0" />
            <span className="truncate">Speaking & Media</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-normal shrink-0">
            Soon
          </span>
        </div>

        {/* 5. Awards & Fellowships (Placeholder) */}
        <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/35 cursor-not-allowed border-l-2 border-transparent select-none">
          <div className="flex items-center gap-3 min-w-0">
            <Award className="w-4 h-4 text-white/30 shrink-0" />
            <span className="truncate">Awards & Fellowships</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-normal shrink-0">
            Soon
          </span>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-white/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Log Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B1F4D] border-b border-white/10 flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold leading-none">Admin</p>
          <p className="text-sm font-serif text-white leading-tight">Maha Jouini</p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-white/70 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={closeMobile}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 bg-[#0B1F4D] text-white flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[#0B1F4D] text-white flex-col shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
}
