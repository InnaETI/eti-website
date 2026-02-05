import { NextRequest, NextResponse } from 'next/server';
import { setAdminCookie, isAdminAuthConfigured, checkAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD in .env (min 8 characters).' }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
