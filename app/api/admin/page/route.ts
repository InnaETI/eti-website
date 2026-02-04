import { NextResponse } from 'next/server';
import { readWordpressPage, writeWordpressPage } from '@/lib/admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get('path');
  if (!pathParam) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }
  try {
    const page = readWordpressPage(pathParam);
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathParam = searchParams.get('path');
  if (!pathParam) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body.html !== 'string') {
    return NextResponse.json({ error: 'html is required' }, { status: 400 });
  }
  try {
    const result = writeWordpressPage(pathParam, body.html);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
