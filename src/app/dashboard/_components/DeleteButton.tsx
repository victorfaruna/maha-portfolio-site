'use client';

import { Trash2 } from 'lucide-react';

export function DeleteButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => Promise<{ error?: string } | void>;
}) {
  const handleClick = async () => {
    if (!window.confirm('Are you sure you want to delete this entry? This cannot be undone.')) return;
    await onDelete(id);
    window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-all duration-200"
    >
      <Trash2 className="w-3 h-3" />
      Delete
    </button>
  );
}
