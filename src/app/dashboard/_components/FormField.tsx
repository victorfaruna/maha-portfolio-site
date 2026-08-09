import React from 'react';

type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Generic wrapper that renders a label + hint + error around any input/select/textarea child.
 * When no children are provided, renders a plain <input />.
 */
export function FormField({
  label,
  name,
  required,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-gray-600"
      >
        {label}
        {required && <span className="text-[#EC4899] ml-1">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

/** Shared class for all form inputs */
export const inputClass =
  'w-full px-3 py-2.5 text-sm border border-gray-200 bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#0B1F4D]/20 focus:border-[#0B1F4D] ' +
  'placeholder:text-gray-400 transition-colors';

export const textareaClass = `${inputClass} resize-y min-h-[100px]`;
