export function StorageNotice({ message, setupRequired }: { message: string; setupRequired?: boolean }) {
  return (
    <div role="alert" className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
      <p className="mb-1 font-semibold">{setupRequired ? 'One-time database setup needed' : 'Testimonials storage unavailable'}</p>
      <p>{message}</p>
      {setupRequired && <p className="mt-2">The setup file creates the testimonials table and photo bucket without changing existing content. After running it, refresh this page to enable saving.</p>}
    </div>
  );
}
