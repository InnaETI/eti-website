import { cookies } from 'next/headers';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const COOKIE_NAME = 'admin_session';
const MAX_AGE_DAYS = 7;

function readEnvLocal(): string {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return '';
    const content = fs.readFileSync(envPath, 'utf-8');
    const line = content.split('\n').find((l) => l.startsWith('ADMIN_PASSWORD='));
    if (!line) return '';
    const raw = line.slice('ADMIN_PASSWORD='.length).trim();
    const value = raw.startsWith('"') && raw.endsWith('"')
      ? raw.slice(1, -1).replace(/\\"/g, '"')
      : raw.startsWith("'") && raw.endsWith("'")
        ? raw.slice(1, -1).replace(/\\'/g, "'")
        : raw;
    return value.replace(/\r$/, '').trim();
  } catch {
    return '';
  }
}

function getSecret(): string {
  let raw = process.env.ADMIN_PASSWORD ?? '';
  if (!raw || raw.trim().length < 8) {
    raw = readEnvLocal();
  }
  const secret = raw.trim().replace(/\r/g, '');
  if (secret.length < 8) return '';
  return secret;
}

export function checkAdminPassword(password: string): boolean {
  const p = password.trim();
  return p !== '' && p === getSecret();
}

function sign(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

export function createAdminCookie(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload = JSON.stringify({ t: Date.now(), maxAge: MAX_AGE_DAYS * 24 * 60 * 60 * 1000 });
  const encoded = Buffer.from(payload, 'utf-8').toString('base64url');
  const sig = sign(encoded, secret);
  return `${encoded}.${sig}`;
}

export async function verifyAdminCookie(): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const [encoded, sig] = raw.split('.');
  if (!encoded || !sig || sig !== sign(encoded, secret)) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
    if (Date.now() - payload.t > payload.maxAge) return false;
    return true;
  } catch {
    return false;
  }
}

export async function setAdminCookie(): Promise<void> {
  const value = createAdminCookie();
  if (!value) return;
  const store = await cookies();
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE_DAYS * 24 * 60 * 60,
    path: '/',
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function isAdminAuthConfigured(): boolean {
  return !!getSecret();
}

export { COOKIE_NAME };
