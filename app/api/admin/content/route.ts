import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';
import {
  getGlobalContent,
  getHomeContent,
  getPageContent,
  getAllPageSlugs,
  getBlogPostContent,
  getBlogPostSlugs,
  writeGlobalContent,
  writeHomeContent,
  writePageContent,
  writeBlogPost,
} from '@/lib/content';
import type { GlobalContent } from '@/lib/content';

async function requireAuth(): Promise<boolean> {
  return verifyAdminCookie();
}

export async function GET(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  const slug = searchParams.get('slug') ?? undefined;

  if (type === 'global') {
    const data = getGlobalContent();
    return NextResponse.json(data ?? {});
  }
  if (type === 'home') {
    const data = getHomeContent();
    return NextResponse.json(data ?? {});
  }
  if (type === 'page' && slug) {
    const data = getPageContent(slug);
    return NextResponse.json(data ?? {});
  }
  if (type === 'pages') {
    const slugs = getAllPageSlugs();
    return NextResponse.json({ slugs });
  }
  if (type === 'blog' && slug) {
    const data = getBlogPostContent(slug);
    return NextResponse.json(data ?? {});
  }
  if (type === 'blog') {
    const slugs = getBlogPostSlugs();
    return NextResponse.json({ slugs });
  }

  return NextResponse.json({ error: 'Invalid type or missing slug' }, { status: 400 });
}

export async function PUT(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { type, slug, data } = body as { type: string; slug?: string; data: unknown };

  if (!type || data === undefined) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
  }

  if (type === 'global') {
    writeGlobalContent(data as GlobalContent);
    return NextResponse.json({ ok: true });
  }
  if (type === 'home') {
    writeHomeContent(data as Record<string, unknown>);
    return NextResponse.json({ ok: true });
  }
  if (type === 'page' && typeof slug === 'string') {
    writePageContent(slug, data as { title: string; [key: string]: unknown });
    return NextResponse.json({ ok: true });
  }
  if (type === 'blog' && typeof slug === 'string') {
    writeBlogPost(slug, data as { slug: string; title: string; date: string; excerpt: string; body: string; image?: string });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Invalid type or missing slug' }, { status: 400 });
}
