import { NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';
import { getStorageBackendInfo } from '@/lib/content-store';

export async function GET() {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(getStorageBackendInfo());
}
