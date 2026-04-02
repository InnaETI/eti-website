import { NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';
import { getStorageBackendInfo, promoteStagingToProduction } from '@/lib/content-store';

export async function POST() {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const backend = getStorageBackendInfo();
  if (backend.mode !== 'github') {
    return NextResponse.json(
      { error: 'Publishing to production is only available when GitHub-backed mode is configured.' },
      { status: 400 }
    );
  }

  try {
    const result = await promoteStagingToProduction();
    return NextResponse.json({
      ok: true,
      backend,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not promote staging to production.' },
      { status: 500 }
    );
  }
}
