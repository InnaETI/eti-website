import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { getUploadsDir } from '@/lib/content';

function sanitizeFileName(name: string): string {
  const base = path.basename(name).replace(/\s+/g, '-');
  return base.replace(/[^a-zA-Z0-9._-]/g, '');
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }
  const safeName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${safeName || 'upload'}`;
  const uploadDir = getUploadsDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, fileName), buffer);
  return NextResponse.json({ ok: true, url: `/uploads/${fileName}` });
}
