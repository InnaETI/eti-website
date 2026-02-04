import { NextResponse } from 'next/server';
import { listWordpressPages } from '@/lib/admin';

export async function GET() {
  return NextResponse.json({ pages: listWordpressPages() });
}
