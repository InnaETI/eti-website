import { NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';

export async function GET() {
  const ok = await verifyAdminCookie();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ ok: true });
}
