import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

function getEnv(name: string): string | null {
  return process.env[name] ?? null;
}

function requireEnv(keys: string[]): { ok: true } | { ok: false; missing: string[] } {
  const missing = keys.filter((key) => !getEnv(key));
  return missing.length ? { ok: false, missing } : { ok: true };
}

async function parsePayload(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') return {};
    return body as ContactPayload;
  }
  const formData = await request.formData();
  const payload: ContactPayload = {
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    phone: formData.get('phone')?.toString(),
    message: formData.get('message')?.toString(),
    source: formData.get('source')?.toString(),
  };
  const wpName = formData.get('your-name')?.toString();
  const wpEmail = formData.get('your-email')?.toString();
  const wpPhone = formData.get('tel-201')?.toString();
  const wpMessage = formData.get('your-message')?.toString();
  return {
    name: payload.name || wpName,
    email: payload.email || wpEmail,
    phone: payload.phone || wpPhone,
    message: payload.message || wpMessage,
    source: payload.source,
  };
}

export async function POST(request: Request) {
  const envCheck = requireEnv([
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'CONTACT_TO',
    'CONTACT_FROM',
  ]);
  if (!envCheck.ok) {
    return NextResponse.json(
      { error: `Missing env: ${envCheck.missing.join(', ')}` },
      { status: 501 }
    );
  }

  const payload = await parsePayload(request);
  const subject = process.env.CONTACT_SUBJECT || 'New contact request';
  const text = [
    `Name: ${payload.name || '—'}`,
    `Email: ${payload.email || '—'}`,
    `Phone: ${payload.phone || '—'}`,
    `Message: ${payload.message || '—'}`,
    `Source: ${payload.source || '—'}`,
  ].join('\n');

  const port = Number(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM,
    to: process.env.CONTACT_TO,
    replyTo: payload.email || undefined,
    subject,
    text,
  });

  return NextResponse.json({ ok: true });
}
