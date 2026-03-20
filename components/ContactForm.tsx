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
      className="flex flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_30px_80px_rgba(17,39,77,0.12)] backdrop-blur sm:p-8"
      noValidate
      aria-label="Contact form"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
          Contact ETI
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
          Tell us what needs to move.
        </h2>
        <p className="text-sm leading-6 text-[var(--color-ink-muted)]">
          Use the form to outline your current situation, the pressure points, and what you need next.
        </p>
      </div>
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
          className="mt-1 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-2 focus:ring-[rgba(226,121,66,0.16)]"
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
          className="mt-1 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-2 focus:ring-[rgba(226,121,66,0.16)]"
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
          className="mt-1 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-2 focus:ring-[rgba(226,121,66,0.16)]"
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
          className="mt-1 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-brand-orange)] focus:outline-none focus:ring-2 focus:ring-[rgba(226,121,66,0.16)]"
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
      <p className="text-xs leading-5 text-[var(--color-ink-muted)]">
        Current build note: this form is still wired as a UI flow only. Delivery can be connected to your preferred mailbox or CRM next.
      </p>
      <PrimaryButton
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="self-start"
      >
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
      </PrimaryButton>
    </form>
  );
}
