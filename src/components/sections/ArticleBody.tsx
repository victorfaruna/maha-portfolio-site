'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';

export function ArticleBody({ content }: { content: any }) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-brand-pink underline hover:text-brand-navy transition-colors font-medium',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'my-8 shadow-lg max-w-full h-auto mx-auto border border-border',
        },
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'article-body-content text-foreground/80 font-sans text-lg leading-relaxed focus:outline-none space-y-6',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="article-body-wrapper">
      <EditorContent editor={editor} />
    </div>
  );
}
