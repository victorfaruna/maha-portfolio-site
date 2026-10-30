export default function PressArchiveLoading() {
  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8" aria-busy="true">
      <h1 className="mb-6 text-xl sm:text-2xl font-semibold text-gray-900">
        Press &amp; Media Archive
      </h1>
      <p role="status" className="border border-gray-100 bg-white px-6 py-10 text-sm text-gray-500">
        Loading media archive…
      </p>
    </main>
  );
}
