'use client';

import { usePathname } from 'next/navigation';
import { DashboardSidebar } from './_components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <DashboardSidebar />
      {/* On mobile, add top padding for the fixed mobile bar */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
        {children}
      </div>
    </div>
  );
}
