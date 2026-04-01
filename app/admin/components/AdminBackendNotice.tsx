'use client';

import { useEffect, useState } from 'react';

type BackendInfo = {
  mode: 'local' | 'github';
  label: string;
  repo?: string;
  branch?: string;
  message: string;
};

type AdminBackendNoticeProps = {
  className?: string;
  codeManagedNote?: string;
};

export function AdminBackendNotice({ className = '', codeManagedNote }: AdminBackendNoticeProps) {
  const [backend, setBackend] = useState<BackendInfo | null>(null);

  useEffect(() => {
    fetch('/api/admin/status')
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => setBackend(json))
      .catch(() => setBackend(null));
  }, []);

  if (!backend && !codeManagedNote) return null;

  return (
    <div className={`mb-5 space-y-3 ${className}`.trim()}>
      {backend ? (
        <div className="rounded-2xl border border-zinc-200 bg-white/85 px-4 py-3 text-sm text-zinc-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-zinc-950">Publishing target</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700">
              {backend.label}
            </span>
            {backend.repo && backend.branch ? (
              <span className="text-xs text-zinc-500">
                {backend.repo} → {backend.branch}
              </span>
            ) : null}
          </div>
          <p className="mt-2 leading-6">{backend.message}</p>
        </div>
      ) : null}
      {codeManagedNote ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          <span className="font-semibold">Coverage note:</span> {codeManagedNote}
        </div>
      ) : null}
    </div>
  );
}
