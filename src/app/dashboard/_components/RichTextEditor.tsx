'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapImage from '@tiptap/extension-image';
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { uploadPublicationImage } from '@/app/actions/publications';



type RichTextEditorProps = {
  initialValue?: any;
  onChange: (json: any) => void;
  onAutoSave?: (json: any) => Promise<void>;
  placeholder?: string;
};

export function RichTextEditor({
  initialValue,
  onChange,
  onAutoSave,
  placeholder = 'Write your article body here…',
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditorUpdate = useCallback(
    (editorInstance: any) => {
      const json = editorInstance.getJSON();
      onChange(json);

      if (onAutoSave) {
        setSaveStatus('saving');
        if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

        autoSaveTimerRef.current = setTimeout(async () => {
          try {
            await onAutoSave(json);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
          } catch {
            setSaveStatus('idle');
          }
        }, 12000); // 12 seconds
      }
    },
    [onChange, onAutoSave]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#EC4899] underline hover:text-[#0B1F4D] transition-colors',
        },
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'my-6 rounded-none shadow-md max-w-full h-auto mx-auto border border-gray-100',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialValue || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[320px] p-4 text-gray-800 text-base leading-relaxed focus:outline-none font-sans',
      },
    },
    onUpdate: ({ editor: ed }) => {
      handleEditorUpdate(ed);
    },
  });

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadPublicationImage(formData);

      if (res.url) {
        editor.chain().focus().setImage({ src: res.url }).run();
      } else if (res.error) {
        alert(`Image upload error: ${res.error}`);
      }
    } catch {
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL link:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const characterCount = editor.getText().length;
  const wordCount = editor
    .getText()
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="border border-gray-200 bg-white transition-colors focus-within:border-[#0B1F4D] focus-within:ring-2 focus-within:ring-[#0B1F4D]/10">
      {/* Hidden image file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-gray-200 bg-gray-50/80 p-2 text-gray-700">
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 text-xs font-semibold rounded hover:bg-gray-200/80 transition-colors flex items-center gap-1 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 text-xs font-semibold rounded hover:bg-gray-200/80 transition-colors flex items-center gap-1 ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('bold') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('underline') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Lists & Quotes */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('bulletList') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('orderedList') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('blockquote') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Pull Quote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Links & Images */}
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('link') ? 'bg-gray-200 text-[#EC4899]' : ''
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={addImage}
            disabled={isUploading}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors disabled:opacity-50"
            title="Upload & Embed Image"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0B1F4D]" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors disabled:opacity-30"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors disabled:opacity-30"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Autosave Status */}
        {onAutoSave && (
          <div className="text-[11px] text-gray-400 font-medium px-2 flex items-center gap-1.5">
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-[#0B1F4D]" />
                <span>Saving draft…</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span className="text-green-700">Draft saved</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Editor Body */}
      <EditorContent editor={editor} />

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-2 text-xs text-gray-400">
        <span>Rich text article editor</span>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{characterCount} chars</span>
        </div>
      </div>
    </div>
  );
}
