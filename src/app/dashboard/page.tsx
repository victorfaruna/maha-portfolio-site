import Link from 'next/link';
import { Plus, FileText, BookOpen } from 'lucide-react';
import { createAnonServerClient } from '@/lib/supabase/server';
import { DashboardTable, type ColumnDef, type RowDef } from './_components/DashboardTable';
import { deletePublication } from '@/app/actions/publications';
import { deleteBook } from '@/app/actions/books';
import type { Publication, Book } from '@/lib/supabase/types';

async function getData() {
  const supabase = createAnonServerClient();

  const [pubRes, bookRes] = await Promise.all([
    supabase.from('publications').select('*').order('year', { ascending: false }),
    supabase.from('books').select('*').order('published_year', { ascending: false }),
  ]);

  return {
    publications: (pubRes.data ?? []) as Publication[],
    books: (bookRes.data ?? []) as Book[],
  };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; flash?: string }>;
}) {
  const { section: activeSection = 'publications', flash } = await searchParams;
  const { publications, books } = await getData();

  const pubColumns: ColumnDef[] = [
    { header: 'Title', className: 'max-w-xs' },
    { header: 'Category' },
    { header: 'Source' },
    { header: 'Year' },
  ];
  const pubRows: RowDef[] = publications.map((p) => ({
    id: p.id,
    cells: [
      <span key="title" className="font-medium line-clamp-1">{p.title}</span>,
      p.category,
      p.source_label ?? '—',
      p.year,
    ],
  }));

  const bookColumns: ColumnDef[] = [
    { header: 'English Title' },
    { header: 'Arabic Title' },
    { header: 'Year' },
  ];
  const bookRows: RowDef[] = books.map((b) => ({
    id: b.id,
    cells: [
      <span key="en" className="font-medium">{b.title_english}</span>,
      <span key="ar" dir="rtl" lang="ar">{b.title_arabic}</span>,
      b.published_year,
    ],
  }));

  const sections = [
    { key: 'publications', label: 'Publications', icon: <FileText className="w-4 h-4" />, count: publications.length },
    { key: 'books', label: 'Books', icon: <BookOpen className="w-4 h-4" />, count: books.length },
  ];

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Content Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your Research &amp; Publications content.
        </p>
      </div>

      {/* Flash message */}
      {flash && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-sm text-green-700">
          {flash === 'created' ? '✓ Entry created successfully.' : '✓ Entry updated successfully.'}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sections.map((s) => (
          <div
            key={s.key}
            className="bg-white border border-gray-100 shadow-sm px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-4"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0B1F4D]/5 flex items-center justify-center text-[#0B1F4D] shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{s.count}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-0 mb-0 border-b border-gray-200 overflow-x-auto">
        {sections.map((s) => (
          <Link
            key={s.key}
            href={`/dashboard?section=${s.key}`}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
              activeSection === s.key
                ? 'border-[#0B1F4D] text-[#0B1F4D]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {s.icon}
            {s.label}
          </Link>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-white border border-gray-100 shadow-sm">
        {/* Section toolbar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-700 truncate">
            {activeSection === 'publications' && `${publications.length} publications`}
            {activeSection === 'books' && `${books.length} books`}
          </p>
          <Link
            href={`/dashboard/${activeSection}/new`}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#0B1F4D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0B1F4D]/90 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Add New</span>
            <span className="xs:hidden">Add</span>
          </Link>
        </div>

        {/* Table */}
        <div className="p-0">
          {activeSection === 'publications' && (
            <DashboardTable
              columns={pubColumns}
              rows={pubRows}
              editBasePath="/dashboard/publications"
              onDelete={deletePublication}
              emptyMessage="No publications yet. Click 'Add New' to create one."
            />
          )}
          {activeSection === 'books' && (
            <DashboardTable
              columns={bookColumns}
              rows={bookRows}
              editBasePath="/dashboard/books"
              onDelete={deleteBook}
              emptyMessage="No books yet. Click 'Add New' to add one."
            />
          )}
        </div>
      </div>
    </main>
  );
}
