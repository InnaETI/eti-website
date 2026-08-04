import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';

export async function GET() {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ items: [] });
    }

    const items = fs
      .readdirSync(uploadsDir)
      .filter((name) => /\.(png|jpe?g|gif|webp|svg)$/i.test(name))
      .map((name) => {
        const filePath = path.join(uploadsDir, name);
        const stat = fs.statSync(filePath);
        return {
          name,
          path: `/uploads/${name}`,
          size: stat.size,
          modified: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => b.modified.localeCompare(a.modified));

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not load uploaded assets.' },
      { status: 500 }
    );
  }
}
