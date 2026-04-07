import { NextResponse } from 'next/server';
import { lookup } from 'node:dns/promises';
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function getMailerConfig() {
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = Number((process.env.SMTP_PORT || '587').trim());
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();

  if (!user || !pass) {
    return null;
  }

  let resolvedHost = host;

  try {
    const result = await lookup(host, { family: 4 });
    resolvedHost = result.address;
  } catch (error) {
    console.warn(`Failed to resolve ${host} to IPv4, falling back to hostname`, error);
  }

  return {
    host: resolvedHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    auth: {
      user,
      pass,
    },
    tls: resolvedHost === host ? undefined : { servername: host },
  };
}

function getFromAddress() {
  return (process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || '').trim();
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const organization = (payload.organization || '').trim();
  const message = (payload.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  const mailerConfig = await getMailerConfig();
  const to = (process.env.CONTACT_TO_EMAIL || 'info@emergingti.com').trim();
  const from = getFromAddress();

  if (!mailerConfig || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact form email captured locally (SMTP not configured):', {
        to,
        from: from || 'missing CONTACT_FROM_EMAIL',
        replyTo: email,
        name,
        organization,
        message,
      });
      return NextResponse.json({ ok: true, mode: 'local-capture' });
    }

    return NextResponse.json(
      {
        error: 'Contact email is not configured yet. Add SMTP_USER, SMTP_PASS, and CONTACT_FROM_EMAIL.',
      },
      { status: 503 }
    );
  }

  const subject = `New ETI website inquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const html = `
    <h2>New ETI website inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br />')}</p>
  `;

  try {
    const transporter = nodemailer.createTransport(mailerConfig);
    const result = await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true, id: result.messageId || null });
  } catch (error) {
    console.error('Contact email failed', error);
    if (typeof error === 'object' && error && 'code' in error && error.code === 'EAUTH') {
      return NextResponse.json(
        {
          error:
            'Email delivery is temporarily misconfigured. Please email info@emergingti.com directly while we finish fixing the website mail settings.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          'Unable to send your message right now. Please email info@emergingti.com directly and we will respond as soon as possible.',
      },
      { status: 500 }
    );
  }
}
