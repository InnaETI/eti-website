import fs from 'fs';
import path from 'path';

const ADMIN_PUBLIC_DIR = path.join(process.cwd(), 'public', 'admin');

function contentType(filePath: string): string {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.html':
      return 'text/html; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const segments = (await params).path ?? [];
  const relativePath = segments.join('/').replace(/\\/g, '/');
  if (!relativePath || relativePath.includes('..')) {
    return new Response('Invalid path', { status: 400 });
  }
  const filePath = path.join(ADMIN_PUBLIC_DIR, relativePath);
  if (!filePath.startsWith(ADMIN_PUBLIC_DIR) || !fs.existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }
  const file = fs.readFileSync(filePath);
  return new Response(file, {
    headers: { 'Content-Type': contentType(filePath) },
  });
}
