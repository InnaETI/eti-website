'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/Button';

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          organization: formData.get('organization'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Unable to send your message right now.');
      }

      form.reset();
      setStatus('sent');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send your message right now.');
    }
  }

  const inputClass =
    'mt-1.5 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-2 focus:ring-[rgba(226,121,66,0.16)]';

  return (
    <form
      onSubmit={handleSubmit}
      className="content-card flex flex-col gap-5 rounded-[2rem] border border-[rgba(255,255,255,0.7)] p-6 sm:p-8 lg:p-9"
      noValidate
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-ink-muted)]">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Your name"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-ink-muted)]">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@company.com"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-organization" className="block text-sm font-medium text-[var(--color-ink-muted)]">
          Organization
        </label>
        <input
          id="contact-organization"
          type="text"
          name="organization"
          autoComplete="organization"
          className={inputClass}
          placeholder="Your organization"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-ink-muted)]">
          How can ETI help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y min-h-[8rem]`}
          placeholder="Tell us about your initiative…"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      {status === 'sent' && (
        <p className="text-sm font-medium text-[var(--color-brand-orange)]" role="status">
          Thank you. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage || 'Something went wrong. Please try again or email us directly.'}
        </p>
      )}
      <PrimaryButton
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="mt-1 w-full justify-center gap-2"
      >
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
        {status !== 'sending' && status !== 'sent' ? <SendIcon className="h-[1.1em] w-[1.1em]" /> : null}
      </PrimaryButton>
      <p className="text-xs leading-5 text-[var(--color-ink-muted)]">
        Messages from this form are sent to info@emergingti.com.
      </p>
    </form>
  );
}
