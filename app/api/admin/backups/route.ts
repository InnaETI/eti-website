import { NextResponse } from 'next/server';
import { listWordpressBackups, restoreWordpressBackup } from '@/lib/admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get('path');
  if (!pathParam) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }
  try {
    const backups = listWordpressBackups(pathParam);
    return NextResponse.json({ backups });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get('path');
  if (!pathParam) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body.backupPath !== 'string') {
    return NextResponse.json({ error: 'backupPath is required' }, { status: 400 });
  }
  try {
    const result = restoreWordpressBackup(pathParam, body.backupPath);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
