'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapImage from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Youtube from '@tiptap/extension-youtube';

import { FontSize } from './extensions/FontSize';
import { LineHeight } from './extensions/LineHeight';
import { cleanPasteHtml } from './utils/cleanPasteHtml';
import { uploadPublicationImage } from '@/app/actions/publications';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Video,
  Undo,
  Redo,
  Loader2,
  CheckCircle2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Indent,
  Outdent,
  RemoveFormatting,
  ChevronDown,
  Info,
} from 'lucide-react';

type RichTextEditorProps = {
  initialValue?: any;
  onChange: (json: any) => void;
  onAutoSave?: (json: any) => Promise<void>;
  placeholder?: string;
};

// Brand-constrained text colors
const TEXT_COLORS = [
  { label: 'Navy (Default)', value: '#0B1F4D' },
  { label: 'Pink Accent', value: '#EC4899' },
  { label: 'Cyan Accent', value: '#0284C7' },
  { label: 'Slate Gray', value: '#64748B' },
  { label: 'Emerald Green', value: '#059669' },
  { label: 'Warm Amber', value: '#D97706' },
];

// Constrained highlight background colors
const HIGHLIGHT_COLORS = [
  { label: 'Soft Pink', value: '#FCE7F3' },
  { label: 'Soft Blue', value: '#E0F2FE' },
  { label: 'Soft Yellow', value: '#FEF08A' },
  { label: 'Soft Green', value: '#DCFCE7' },
];

export function RichTextEditor({
  initialValue,
  onChange,
  onAutoSave,
  placeholder = 'Write your article body here…',
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

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
          'prose prose-slate max-w-none min-h-[380px] p-4 md:p-6 text-gray-800 text-base leading-relaxed focus:outline-none font-sans',
      },
      transformPastedHTML(html) {
        return cleanPasteHtml(html);
      },
    },
    onUpdate: ({ editor: ed }) => {
      handleEditorUpdate(ed);
    },
  });

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const addVideoEmbed = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter YouTube or video URL:');
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      let imageUrl: string | null = null;

      // 1. Try server action upload first
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await uploadPublicationImage(formData);
        if (res?.url) {
          imageUrl = res.url;
        }
      } catch (serverErr) {
        console.warn('Server upload failed, switching to client FileReader:', serverErr);
      }

      // 2. Client-side fallback via FileReader (reads image directly in browser if server request fails)
      if (!imageUrl) {
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read image file'));
          reader.readAsDataURL(file);
        });
      }

      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (err: any) {
      console.error('Image insertion error:', err);
      alert(err?.message || 'Failed to insert image.');
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

  // Active Heading Value
  const getHeadingValue = () => {
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    return 'p';
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'p') {
      editor.chain().focus().setParagraph().run();
    } else if (val === 'h2') {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (val === 'h3') {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else if (val === 'h4') {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    }
  };

  // Active Font Size Value
  const currentFontSize = editor.getAttributes('textStyle').fontSize || '';

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(val).run();
    }
  };

  // Active Line Height Value
  const currentLineHeight = editor.getAttributes('paragraph').lineHeight || 'normal';

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'normal') {
      editor.chain().focus().unsetLineHeight().run();
    } else {
      editor.chain().focus().setLineHeight(val).run();
    }
  };

  // Handle Indent / Outdent
  const handleIndent = () => {
    if (editor.isActive('taskList')) {
      editor.chain().focus().sinkListItem('taskItem').run();
    } else if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      editor.chain().focus().sinkListItem('listItem').run();
    }
  };

  const handleOutdent = () => {
    if (editor.isActive('taskList')) {
      editor.chain().focus().liftListItem('taskItem').run();
    } else if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      editor.chain().focus().liftListItem('listItem').run();
    }
  };

  return (
    <div className="border border-gray-200 bg-white transition-colors focus-within:border-[#0B1F4D] focus-within:ring-2 focus-within:ring-[#0B1F4D]/10 rounded-sm">
      {/* Hidden image file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Primary Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-gray-50/90 p-2 text-gray-700">
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings Dropdown */}
          <div className="relative">
            <select
              value={getHeadingValue()}
              onChange={handleHeadingChange}
              className="h-8 pl-2 pr-6 text-xs font-semibold bg-white border border-gray-300 rounded shadow-xs focus:outline-none focus:border-[#0B1F4D] cursor-pointer text-gray-800"
              title="Heading Style"
            >
              <option value="p">Paragraph</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
            </select>
          </div>

          {/* Font Size Dropdown */}
          <div className="relative">
            <select
              value={currentFontSize}
              onChange={handleFontSizeChange}
              className="h-8 pl-2 pr-6 text-xs font-semibold bg-white border border-gray-300 rounded shadow-xs focus:outline-none focus:border-[#0B1F4D] cursor-pointer text-gray-800"
              title="Font Size"
            >
              <option value="">Font Size</option>
              <option value="12px">12px (Small)</option>
              <option value="14px">14px (Normal)</option>
              <option value="16px">16px (Medium)</option>
              <option value="18px">18px (Large)</option>
              <option value="20px">20px (XL)</option>
              <option value="24px">24px (2XL)</option>
            </select>
          </div>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Basic Text Formatting: Bold, Italic, Underline */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('bold') ? 'bg-gray-200 text-[#0B1F4D] font-bold' : ''
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('underline') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Text Color Picker Swatches */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
              }}
              className="p-1.5 rounded hover:bg-gray-200/80 transition-colors flex items-center gap-1"
              title="Text Color"
            >
              <Palette className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 z-30 p-2 bg-white border border-gray-200 rounded shadow-lg flex flex-col gap-1 w-44">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Brand Color Palette
                </span>
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(c.value).run();
                      setShowColorPicker(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1 text-xs hover:bg-gray-100 rounded text-left"
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: c.value }} />
                    <span className="text-gray-700 font-medium">{c.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setShowColorPicker(false);
                  }}
                  className="mt-1 pt-1 border-t border-gray-100 text-[11px] text-gray-500 hover:text-gray-900 text-left px-2"
                >
                  Reset Default Color
                </button>
              </div>
            )}
          </div>

          {/* Highlight Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
              }}
              className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors flex items-center gap-1 ${
                editor.isActive('highlight') ? 'bg-gray-200 text-[#0B1F4D]' : ''
              }`}
              title="Highlight Color"
            >
              <Highlighter className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 z-30 p-2 bg-white border border-gray-200 rounded shadow-lg flex flex-col gap-1 w-44">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Highlight Swatches
                </span>
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color: c.value }).run();
                      setShowHighlightPicker(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1 text-xs hover:bg-gray-100 rounded text-left"
                  >
                    <span className="w-3.5 h-3.5 rounded border border-gray-300 shrink-0" style={{ backgroundColor: c.value }} />
                    <span className="text-gray-700 font-medium">{c.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run();
                    setShowHighlightPicker(false);
                  }}
                  className="mt-1 pt-1 border-t border-gray-100 text-[11px] text-gray-500 hover:text-gray-900 text-left px-2"
                >
                  Remove Highlight
                </button>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Text Alignment */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Justify Text"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Line Spacing Dropdown */}
          <div className="relative">
            <select
              value={currentLineHeight}
              onChange={handleLineHeightChange}
              className="h-8 pl-2 pr-6 text-xs font-semibold bg-white border border-gray-300 rounded shadow-xs focus:outline-none focus:border-[#0B1F4D] cursor-pointer text-gray-800"
              title="Line Spacing"
            >
              <option value="normal">Line Spacing</option>
              <option value="1.2">Compact (1.2)</option>
              <option value="1.5">Normal (1.5)</option>
              <option value="1.75">Relaxed (1.75)</option>
              <option value="2.0">Double (2.0)</option>
            </select>
          </div>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Lists: Bullet, Numbered, Checklist */}
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
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-1.5 rounded hover:bg-gray-200/80 transition-colors ${
              editor.isActive('taskList') ? 'bg-gray-200 text-[#0B1F4D]' : ''
            }`}
            title="Checklist / Task List"
          >
            <ListTodo className="w-4 h-4" />
          </button>

          {/* Indent / Outdent Controls */}
          <button
            type="button"
            onClick={handleOutdent}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors text-gray-700"
            title="Decrease Indent / Outdent"
          >
            <Outdent className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleIndent}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors text-gray-700"
            title="Increase Indent"
          >
            <Indent className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Pull Quote, Link, Image, Video Embed */}
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
          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded hover:bg-gray-200/80 transition-colors text-red-600"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          )}
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
          <button
            type="button"
            onClick={addVideoEmbed}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors"
            title="Embed YouTube Video"
          >
            <Video className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-gray-300 mx-1" />

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 rounded hover:bg-gray-200/80 transition-colors text-gray-600 hover:text-red-600"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-gray-300 mx-1" />

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

        {/* Autosave Status Indicator */}
        {onAutoSave && (
          <div className="text-[11px] text-gray-400 font-medium px-2 flex items-center gap-1.5 shrink-0">
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

      {/* Editor Body Area */}
      <EditorContent editor={editor} />

      {/* UX Note for Maha & Word/Docs paste */}
      <div className="bg-blue-50/70 border-t border-blue-100 px-4 py-2 flex items-center gap-2 text-xs text-blue-800">
        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span>
          <strong>Pro-tip:</strong> You can paste directly from Word or Google Docs — formatting like headings, bold, and lists will be preserved automatically.
        </span>
      </div>

      {/* Footer Info / Word Count */}
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
