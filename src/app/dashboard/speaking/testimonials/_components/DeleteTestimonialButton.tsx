'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteTestimonial } from '@/app/actions/testimonials';

export function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  return (
    <div>
      <button type="button" disabled={pending} className="inline-flex items-center gap-2 border border-red-200 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
        onClick={() => {
          if (!window.confirm(`Delete the testimonial from ${name}? This cannot be undone.`)) return;
          setError('');
          startTransition(async () => {
            try {
              const result = await deleteTestimonial(id);
              if (result?.error) setError(result.error);
              else router.refresh();
            } catch { setError('Could not delete this testimonial. Please try again.'); }
          });
        }}>
        <Trash2 className="size-3.5" strokeWidth={1.75} aria-hidden="true" /> {pending ? 'Deleting…' : 'Delete'}
      </button>
      {error && <p role="alert" className="mt-2 max-w-sm text-xs text-red-700">{error}</p>}
    </div>
  );
}
