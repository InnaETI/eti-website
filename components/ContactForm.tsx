'use client';

import { useState } from 'react';
import { PrimaryButton } from '@/components/Button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    // Placeholder: in production, POST to an API or form service
    await new Promise((r) => setTimeout(r, 800));
    setStatus('sent');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      noValidate
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-ink)]">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          className="mt-1 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-orange)]"
          placeholder="Your name"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-ink)]">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-1 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-orange)]"
          placeholder="you@company.com"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--color-ink)]">
          Phone <span className="text-[var(--color-ink-muted)]">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          className="mt-1 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-orange)]"
          placeholder="+1 (555) 000-0000"
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-ink)]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-orange)]"
          placeholder="Tell us about your situation and what you're looking for."
          disabled={status === 'sending' || status === 'sent'}
        />
      </div>
      {status === 'sent' && (
        <p className="text-sm text-[var(--color-brand-orange)]" role="status">
          Thank you. We'll be in touch shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
      <PrimaryButton
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
      >
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
      </PrimaryButton>
    </form>
  );
}
