import { NextResponse } from 'next/server';
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

function getMailerConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: {
      user,
      pass,
    },
  };
}

function getFromAddress() {
  return process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || '';
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

  const mailerConfig = getMailerConfig();
  const to = process.env.CONTACT_TO_EMAIL || 'info@emergingti.com';
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
    return NextResponse.json({ error: 'Unable to send your message right now.' }, { status: 500 });
  }
}
