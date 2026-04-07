'use client';

import { useEffect, useRef, useState } from 'react';

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (path: string) => void;
  help?: string;
  recommendedSize?: string;
};

export function ImageField({ label, value, onChange, help, recommendedSize }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dimensions, setDimensions] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    if (!value) {
      setDimensions('');
      return;
    }

    const image = new window.Image();
    image.onload = () => {
      if (!cancelled) {
        setDimensions(`${image.naturalWidth} × ${image.naturalHeight}px`);
      }
    };
    image.onerror = () => {
      if (!cancelled) {
        setDimensions('');
      }
    };
    image.src = value;

    return () => {
      cancelled = true;
    };
  }, [value]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Upload failed');
        return;
      }
      if (typeof data.path === 'string') onChange(data.path);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function handleSetUrl() {
    const v = urlInput.trim();
    if (v) {
      onChange(v);
      setUrlInput('');
      setShowUrl(false);
    }
  }

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-zinc-700">{label}</label>
      ) : null}
      <div className="flex flex-wrap items-start gap-3">
        {value ? (
          <div className="flex flex-col items-start gap-1">
            <img
              src={value}
              alt=""
              className="h-24 w-auto max-w-[220px] rounded-xl border border-zinc-200 bg-zinc-50 object-contain p-2"
              onError={() => setError('Image failed to load')}
            />
            <div className="space-y-1">
              <span className="block max-w-[360px] break-all font-mono text-xs text-zinc-500" title={value}>
                {value}
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                {dimensions ? <span>Preview size: {dimensions}</span> : null}
                {recommendedSize ? <span>Recommended: {recommendedSize}</span> : null}
              </div>
            </div>
            <div className="flex gap-2 mt-1">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : 'Replace'}
              </button>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Open
              </a>
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            <button
              type="button"
              onClick={() => setShowUrl(!showUrl)}
              className="text-sm text-zinc-500 hover:underline"
            >
              {showUrl ? 'Cancel' : 'Or set from URL'}
            </button>
            {showUrl ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="/wp-content/... or /uploads/..."
                  className="flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={handleSetUrl}
                  className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm"
                >
                  Set
                </button>
              </div>
            ) : null}
            {recommendedSize ? <p className="text-xs text-zinc-500">Recommended: {recommendedSize}</p> : null}
          </div>
        )}
      </div>
      {help ? <p className="text-xs text-zinc-500">{help}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
