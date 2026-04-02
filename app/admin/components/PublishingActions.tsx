'use client';

import { useState } from 'react';

type PublishingActionsProps = {
  mode: 'local' | 'github';
  stagingUrl?: string;
  productionUrl?: string;
  branch?: string;
  productionBranch?: string;
};

export function PublishingActions({
  mode,
  stagingUrl,
  productionUrl,
  branch,
  productionBranch,
}: PublishingActionsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  async function promote() {
    if (mode !== 'github') return;
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/publish', { method: 'POST' });
      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage({ type: 'error', text: json.error ?? 'Could not promote staging to production.' });
      } else {
        setMessage({
          type: 'ok',
          text: `Promoted ${branch || 'staging'} to ${productionBranch || 'production'}. Review the live site once your deployment finishes.`,
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Could not reach the publish endpoint.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {stagingUrl ? (
          <a
            href={stagingUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
          >
            View staging
          </a>
        ) : null}
        {productionUrl ? (
          <a
            href={productionUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
          >
            View production
          </a>
        ) : null}
        <button
          type="button"
          onClick={promote}
          disabled={submitting || mode !== 'github'}
          className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Promoting…' : 'Promote staging to production'}
        </button>
      </div>
      {message ? (
        <p className={`text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
      ) : null}
    </div>
  );
}
