'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
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
type LinkDialogState = {
  open: boolean;
  href: string;
  error: string;
};

const TOOLBAR = [
  { label: 'Bold', command: 'bold' },
  { label: 'Italic', command: 'italic' },
  { label: 'Link', command: 'link' },
  { label: 'Heading', command: 'heading' },
  { label: 'Bulleted list', command: 'bullet' },
  { label: 'Numbered list', command: 'numbered' },
] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineMarkdownToHtml(value: string) {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const content = line.replace(/^#{1,6}\s+/, '');
      blocks.push(`<h${level}>${inlineMarkdownToHtml(content)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(`<li><p>${inlineMarkdownToHtml(lines[index].trim().replace(/^-\s+/, ''))}</p></li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(`<li><p>${inlineMarkdownToHtml(lines[index].trim().replace(/^\d+\.\s+/, ''))}</p></li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(`<blockquote><p>${inlineMarkdownToHtml(quoteLines.join(' '))}</p></blockquote>`);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,6}\s+/.test(lines[index].trim()) &&
      !/^-\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !/^>\s?/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${inlineMarkdownToHtml(paragraphLines.join(' '))}</p>`);
  }

  return blocks.join('');
}

function normalizeWhitespace(value: string) {
  return value.replace(/\u00a0/g, ' ').replace(/[ \t]+\n/g, '\n');
}

function inlineNodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  const content = Array.from(element.childNodes).map(inlineNodeToMarkdown).join('');

  if (tag === 'strong' || tag === 'b') return `**${content}**`;
  if (tag === 'em' || tag === 'i') return `*${content}*`;
  if (tag === 'a') {
    const href = element.getAttribute('href') || '#';
    return `[${content || href}](${href})`;
  }
  if (tag === 'br') return '\n';

  return content;
}

function blockNodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || '').trim();
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();

  if (/^h[1-6]$/.test(tag)) {
    const level = Number(tag[1]);
    return `${'#'.repeat(level)} ${Array.from(element.childNodes).map(inlineNodeToMarkdown).join('').trim()}`;
  }

  if (tag === 'p') {
    return Array.from(element.childNodes).map(inlineNodeToMarkdown).join('').trim();
  }

  if (tag === 'blockquote') {
    const text = Array.from(element.childNodes)
      .map((child) => blockNodeToMarkdown(child))
      .filter(Boolean)
      .join('\n');
    return text
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');
  }

  if (tag === 'ul') {
    return Array.from(element.children)
      .map((child) => `- ${Array.from(child.childNodes).map(inlineNodeToMarkdown).join('').trim()}`)
      .join('\n');
  }

  if (tag === 'ol') {
    return Array.from(element.children)
      .map((child, index) => `${index + 1}. ${Array.from(child.childNodes).map(inlineNodeToMarkdown).join('').trim()}`)
      .join('\n');
  }

  if (tag === 'div' || tag === 'section' || tag === 'article') {
    const childBlocks = Array.from(element.childNodes)
      .map((child) => blockNodeToMarkdown(child))
      .filter(Boolean);
    return childBlocks.length ? childBlocks.join('\n\n') : Array.from(element.childNodes).map(inlineNodeToMarkdown).join('').trim();
  }

  if (tag === 'li') {
    return Array.from(element.childNodes).map(inlineNodeToMarkdown).join('').trim();
  }

  return Array.from(element.childNodes).map(inlineNodeToMarkdown).join('').trim();
}

function htmlToMarkdown(html: string) {
  if (typeof window === 'undefined') return '';
  const container = document.createElement('div');
  container.innerHTML = html;
  const blocks = Array.from(container.childNodes)
    .map((node) => blockNodeToMarkdown(node))
    .filter(Boolean);

  return normalizeWhitespace(blocks.join('\n\n').replace(/\n{3,}/g, '\n\n')).trim();
}

function normalizeLinkHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  if (trimmed.startsWith('www.')) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function MarkdownEditor({
  label,
  value,
  onChange,
  help,
  placeholder = 'Start typing…',
  rows = 14,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<EditorMode>('write');
  const [linkDialog, setLinkDialog] = useState<LinkDialogState>({ open: false, href: '', error: '' });
  const linkInputRef = useRef<HTMLInputElement>(null);
  const editorHeight = `${Math.max(rows, 12) * 24}px`;
  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [value]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
        blockquote: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: markdownToHtml(value || ''),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-full px-4 py-4 text-zinc-800 outline-none [&_.ProseMirror-focused]:outline-none [&_a]:text-[#1f5fbf] [&_a]:underline [&_a]:decoration-[#1f5fbf]/40 [&_a:hover]:decoration-[#1f5fbf] [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-950 [&_li>p]:my-1 [&_ol]:pl-5 [&_ul]:pl-5',
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange(htmlToMarkdown(currentEditor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) return;
    const nextHtml = markdownToHtml(value || '');
    if (editor.getHTML() !== nextHtml) {
      editor.commands.setContent(nextHtml, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!linkDialog.open) return;
    const id = window.setTimeout(() => {
      linkInputRef.current?.focus();
      linkInputRef.current?.select();
    }, 0);
    return () => window.clearTimeout(id);
  }, [linkDialog.open]);

  function closeLinkDialog() {
    setLinkDialog({ open: false, href: '', error: '' });
  }

  function openLinkDialog() {
    if (!editor) return;
    const selectedText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, ' ');
    if (!selectedText.trim() && !editor.isActive('link')) {
      setLinkDialog({
        open: true,
        href: '',
        error: 'Select the text you want to turn into a link first.',
      });
      return;
    }
    setLinkDialog({
      open: true,
      href: editor.getAttributes('link').href || '',
      error: '',
    });
  }

  function applyLink() {
    if (!editor) return;
    const href = normalizeLinkHref(linkDialog.href);
    if (!href) {
      setLinkDialog((current) => ({
        ...current,
        error: 'Enter a page path like /strategy/ or a full URL like https://example.com.',
      }));
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    closeLinkDialog();
  }

  function runCommand(command: (typeof TOOLBAR)[number]['command']) {
    if (!editor) return;

    if (command === 'link') {
      openLinkDialog();
      return;
    }
    if (command === 'heading') {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      return;
    }
    if (command === 'bullet') {
      editor.chain().focus().toggleBulletList().run();
      return;
    }
    if (command === 'numbered') {
      editor.chain().focus().toggleOrderedList().run();
      return;
    }
    if (command === 'bold') {
      editor.chain().focus().toggleBold().run();
      return;
    }
    if (command === 'italic') {
      editor.chain().focus().toggleItalic().run();
    }
  }

  const isReady = Boolean(editor);
  function isCommandActive(command: (typeof TOOLBAR)[number]['command']) {
    if (!editor) return false;
    if (command === 'bold') return editor.isActive('bold');
    if (command === 'italic') return editor.isActive('italic');
    if (command === 'link') return editor.isActive('link');
    if (command === 'heading') return editor.isActive('heading', { level: 2 });
    if (command === 'bullet') return editor.isActive('bulletList');
    if (command === 'numbered') return editor.isActive('orderedList');
    return false;
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-zinc-700">{label}</label>
        <span className="text-xs text-zinc-500">{wordCount} words</span>
      </div>
      {help ? <p className="mb-3 text-xs text-zinc-500">{help}</p> : null}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/80 px-3 py-2">
          <div className="flex flex-wrap gap-2">
            {TOOLBAR.map((item) => (
              <button
                key={item.command}
                type="button"
                onClick={() => runCommand(item.command)}
                disabled={!isReady}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isCommandActive(item.command)
                    ? 'border-[#1f3b68] bg-[#1f3b68] text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950'
                }`}
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
          <div style={{ minHeight: editorHeight }}>
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div className="bg-zinc-50 px-4 py-4" style={{ minHeight: editorHeight }}>
            <MarkdownPreview
              source={value}
              emptyMessage="Body is empty. Use the editor to add headings, links, bulleted lists, and emphasis."
            />
          </div>
        )}
      </div>

      {linkDialog.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-950">Add link</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                For another page on this site, enter a path like <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">/strategy/</code> or{' '}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">/contact-us/</code>. For an outside website, enter the full address, like{' '}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">https://example.com</code>.
              </p>
            </div>

            <label className="block text-sm font-medium text-zinc-800">
              Link address
              <input
                ref={linkInputRef}
                type="text"
                value={linkDialog.href}
                onChange={(event) =>
                  setLinkDialog((current) => ({
                    ...current,
                    href: event.target.value,
                    error: '',
                  }))
                }
                placeholder="/strategy/ or https://example.com"
                className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#1f3b68] focus:ring-2 focus:ring-[#1f3b68]/15"
              />
            </label>

            {linkDialog.error ? <p className="mt-3 text-sm text-amber-700">{linkDialog.error}</p> : null}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeLinkDialog}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#163155]"
              >
                Apply link
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
