import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';
import { getUploadsDir, getUploadsPath } from '@/lib/content';
import path from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

export async function POST(request: NextRequest) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(svg|jpe?g|png|gif|webp)$/i)) {
    return NextResponse.json({ error: 'Invalid file type. Use image files only.' }, { status: 400 });
  }
  const ext = path.extname(file.name).toLowerCase() || '.jpg';
  const base = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const relativePath = base;
  const dest = getUploadsPath(relativePath);
  getUploadsDir();
  const bytes = await file.arrayBuffer();
  const fs = await import('fs');
  fs.writeFileSync(dest, Buffer.from(bytes));
  const publicPath = `/uploads/${relativePath}`;
  return NextResponse.json({ path: publicPath });
}
