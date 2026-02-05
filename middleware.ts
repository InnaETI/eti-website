import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION = 'admin_session';

function isAdminPath(pathname: string): boolean {
  const p = pathname.replace(/\/$/, '') || '/';
  return p === '/admin' || p.startsWith('/admin/');
}

function isLoginPath(pathname: string): boolean {
  const p = pathname.replace(/\/$/, '') || '/';
  return p === '/admin/login';
}

async function verifyAdminCookieEdge(cookieValue: string, secret: string): Promise<boolean> {
  if (!cookieValue || !secret) return false;
  const parts = cookieValue.split('.');
  const encoded = parts[0];
  const sig = parts[1];
  if (!encoded || !sig) return false;
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(encoded)
    );
    const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    if (sig !== sigBase64) return false;
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    if (Date.now() - payload.t > payload.maxAge) return false;
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!isAdminPath(pathname)) return NextResponse.next();
  if (isLoginPath(pathname)) return NextResponse.next();

  const raw = process.env.ADMIN_PASSWORD ?? '';
  const secret = raw.trim();
  if (!secret || secret.length < 8) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ADMIN_SESSION)?.value;
  const valid = await verifyAdminCookieEdge(cookieValue ?? '', secret);
  if (valid) return NextResponse.next();

  const from = encodeURIComponent(pathname || '/admin');
  const loginUrl = new URL(`/admin/login/?from=${from}`, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
