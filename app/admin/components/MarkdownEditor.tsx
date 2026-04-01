'use client';

import { useMemo, useRef, useState } from 'react';
import { MarkdownPreview } from './MarkdownPreview';

type MarkdownEditorProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  help?: string;
  placeholder?: string;
  rows?: number;
};

type EditorMode = 'write' | 'preview';

function insertAroundSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  emptyFallback: string
) {
  const selected = value.slice(start, end) || emptyFallback;
  const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
  const selectionStart = start + before.length;
  const selectionEnd = selectionStart + selected.length;
  return { next, selectionStart, selectionEnd };
}

function insertBlock(value: string, start: number, end: number, prefix: string, fallback: string) {
  const selected = value.slice(start, end) || fallback;
  const lines = selected.split('\n').map((line) => `${prefix}${line || fallback}`);
  const replacement = lines.join('\n');
  const next = `${value.slice(0, start)}${replacement}${value.slice(end)}`;
  return {
    next,
    selectionStart: start,
    selectionEnd: start + replacement.length,
  };
}

const TOOLBAR = [
  { label: 'Bold', action: 'bold' },
  { label: 'Italic', action: 'italic' },
  { label: 'Link', action: 'link' },
  { label: 'H2', action: 'h2' },
  { label: 'Bullet', action: 'bullet' },
  { label: 'Numbered', action: 'numbered' },
  { label: 'Quote', action: 'quote' },
] as const;

export function MarkdownEditor({
  label,
  value,
  onChange,
  help,
  placeholder = 'Add content…',
  rows = 14,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<EditorMode>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [value]);

  function applyFormatting(action: (typeof TOOLBAR)[number]['action']) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart ?? value.length;
    const end = textarea.selectionEnd ?? value.length;

    let result: { next: string; selectionStart: number; selectionEnd: number } | null = null;

    if (action === 'bold') {
      result = insertAroundSelection(value, start, end, '**', '**', 'bold text');
    } else if (action === 'italic') {
      result = insertAroundSelection(value, start, end, '*', '*', 'italic text');
    } else if (action === 'link') {
      result = insertAroundSelection(value, start, end, '[', '](https://example.com)', 'link text');
    } else if (action === 'h2') {
      result = insertBlock(value, start, end, '## ', 'Section heading');
    } else if (action === 'bullet') {
      result = insertBlock(value, start, end, '- ', 'List item');
    } else if (action === 'quote') {
      result = insertBlock(value, start, end, '> ', 'Quoted text');
    } else if (action === 'numbered') {
      const selected = value.slice(start, end) || 'List item';
      const replacement = selected
        .split('\n')
        .map((line, index) => `${index + 1}. ${line || 'List item'}`)
        .join('\n');
      result = {
        next: `${value.slice(0, start)}${replacement}${value.slice(end)}`,
        selectionStart: start,
        selectionEnd: start + replacement.length,
      };
    }

    if (!result) return;
    onChange(result.next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-zinc-700">{label}</label>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{wordCount} words</span>
        </div>
      </div>
      {help ? <p className="mb-3 text-xs text-zinc-500">{help}</p> : null}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/80 px-3 py-2">
          <div className="flex flex-wrap gap-2">
            {TOOLBAR.map((item) => (
              <button
                key={item.action}
                type="button"
                onClick={() => applyFormatting(item.action)}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex rounded-full border border-zinc-200 bg-white p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode('write')}
              className={`rounded-full px-3 py-1 font-medium transition ${
                mode === 'write' ? 'bg-[#1f3b68] text-white' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`rounded-full px-3 py-1 font-medium transition ${
                mode === 'preview' ? 'bg-[#1f3b68] text-white' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
        {mode === 'write' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={rows}
            className="w-full resize-y border-0 px-4 py-3 text-sm font-mono text-zinc-800 outline-none"
            placeholder={placeholder}
          />
        ) : (
          <div className="min-h-[320px] bg-zinc-50 px-4 py-4">
            <MarkdownPreview
              source={value}
              emptyMessage="Body is empty. Use the editor toolbar or type directly to start building this section."
            />
          </div>
        )}
      </div>
    </div>
  );
}
