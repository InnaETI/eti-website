import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

function getFromAddress() {
  return process.env.CONTACT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || '';
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

  const resend = getResendClient();
  const to = process.env.CONTACT_TO_EMAIL || 'info@emergingti.com';
  const from = getFromAddress();

  if (!resend || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact form email captured locally (Resend not configured):', {
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
        error:
          'Contact email is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to enable delivery.',
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
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error('Contact email failed', result.error);
      return NextResponse.json({ error: 'Unable to send your message right now.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: result.data?.id || null });
  } catch (error) {
    console.error('Contact email failed', error);
    return NextResponse.json({ error: 'Unable to send your message right now.' }, { status: 500 });
  }
}
