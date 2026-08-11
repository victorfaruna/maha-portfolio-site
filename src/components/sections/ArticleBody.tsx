'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Youtube from '@tiptap/extension-youtube';
import { FontSize } from '@/app/dashboard/_components/extensions/FontSize';
import { LineHeight } from '@/app/dashboard/_components/extensions/LineHeight';

export function ArticleBody({ content }: { content: any }) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      FontSize,
      LineHeight,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
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
