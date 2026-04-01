import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';
import {
  getAllBlogPostSummariesFromStore,
  getAllPageSlugsFromStore,
  getAllPageSummariesFromStore,
  getBlogPostContentFromStore,
  getBlogPostSlugsFromStore,
  getGlobalContentFromStore,
  getHomeContentFromStore,
  getPageContentFromStore,
  getStorageBackendInfo,
  writeBlogPostToStore,
  writeGlobalContentToStore,
  writeHomeContentToStore,
  writePageContentToStore,
} from '@/lib/content-store';
import type { GlobalContent } from '@/lib/content';

async function requireAuth(): Promise<boolean> {
  return verifyAdminCookie();
}

export async function GET(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type');
    const slug = searchParams.get('slug') ?? undefined;

    if (type === 'global') {
      const data = await getGlobalContentFromStore();
      return NextResponse.json(data ?? {});
    }
    if (type === 'home') {
      const data = await getHomeContentFromStore();
      return NextResponse.json(data ?? {});
    }
    if (type === 'page' && slug) {
      const data = await getPageContentFromStore(slug);
      return NextResponse.json(data ?? {});
    }
    if (type === 'pages') {
      const slugs = await getAllPageSlugsFromStore();
      const entries = await getAllPageSummariesFromStore();
      return NextResponse.json({ slugs, entries });
    }
    if (type === 'blog' && slug) {
      const data = await getBlogPostContentFromStore(slug);
      return NextResponse.json(data ?? {});
    }
    if (type === 'blog' && !slug) {
      const slugs = await getBlogPostSlugsFromStore();
      const entries = await getAllBlogPostSummariesFromStore();
      return NextResponse.json({ slugs, entries });
    }

    return NextResponse.json({ error: 'Invalid type or missing slug' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not load content.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { type, slug, data } = body as { type: string; slug?: string; data: unknown };

    if (!type || data === undefined) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    if (type === 'global') {
      await writeGlobalContentToStore(data as GlobalContent);
      return NextResponse.json({ ok: true, backend: getStorageBackendInfo() });
    }
    if (type === 'home') {
      await writeHomeContentToStore(data as Record<string, unknown>);
      return NextResponse.json({ ok: true, backend: getStorageBackendInfo() });
    }
    if (type === 'page' && typeof slug === 'string') {
      await writePageContentToStore(slug, data as { title: string; [key: string]: unknown });
      return NextResponse.json({ ok: true, backend: getStorageBackendInfo() });
    }
    if (type === 'blog' && typeof slug === 'string') {
      await writeBlogPostToStore(
        slug,
        data as { slug: string; title: string; date: string; excerpt: string; body: string; image?: string }
      );
      return NextResponse.json({ ok: true, backend: getStorageBackendInfo() });
    }

    return NextResponse.json({ error: 'Invalid type or missing slug' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save content.' },
      { status: 500 }
    );
  }
}
