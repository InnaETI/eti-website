import fs from 'fs';
import path from 'path';
import { listKnownPages, WORDPRESS_PAGES_DIR } from '@/lib/wordpress-pages';

const BACKUP_ROOT = path.join(process.cwd(), 'content-backups', 'wordpress-pages');

function normalizeRelativePath(input: string): string {
  const cleaned = input.replace(/\\/g, '/').replace(/^\/+/, '');
  const normalized = path.posix.normalize(cleaned);
  if (!normalized || normalized === '.' || normalized.startsWith('..') || path.isAbsolute(normalized)) {
    throw new Error('Invalid path');
  }
  return normalized;
}

function resolveWordpressPath(input: string): { relativePath: string; absolutePath: string } {
  const relativePath = normalizeRelativePath(input);
  const absolutePath = path.join(WORDPRESS_PAGES_DIR, relativePath);
  if (!absolutePath.startsWith(WORDPRESS_PAGES_DIR)) {
    throw new Error('Invalid path');
  }
  return { relativePath, absolutePath };
}

function timestamp(): string {
  const now = new Date();
  const pad = (value: number) => `${value}`.padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(
    now.getHours()
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

export function listWordpressPages(): Array<{ label: string; path: string; slug: string }> {
  return listKnownPages();
}

export function readWordpressPage(inputPath: string): { relativePath: string; html: string } {
  const { relativePath, absolutePath } = resolveWordpressPath(inputPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error('Page not found');
  }
  const html = fs.readFileSync(absolutePath, 'utf-8');
  return { relativePath, html };
}

export function writeWordpressPage(
  inputPath: string,
  html: string
): { relativePath: string; backupPath: string | null } {
  const { relativePath, absolutePath } = resolveWordpressPath(inputPath);
  let backupPath: string | null = null;
  if (fs.existsSync(absolutePath)) {
    const baseName = path.basename(relativePath, path.extname(relativePath));
    const dirName = path.dirname(relativePath);
    const backupDir = path.join(BACKUP_ROOT, dirName);
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    const backupFileName = `${baseName}-${timestamp()}.html`;
    backupPath = path.join(backupDir, backupFileName);
    fs.copyFileSync(absolutePath, backupPath);
  }
  const outputDir = path.dirname(absolutePath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(absolutePath, html, 'utf-8');
  return { relativePath, backupPath };
}

export function listWordpressBackups(inputPath: string): Array<{ name: string; path: string }> {
  const { relativePath } = resolveWordpressPath(inputPath);
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const dirName = path.dirname(relativePath);
  const backupDir = path.join(BACKUP_ROOT, dirName);
  if (!fs.existsSync(backupDir)) return [];
  const matches = fs
    .readdirSync(backupDir)
    .filter((file) => file.startsWith(`${baseName}-`) && file.endsWith('.html'))
    .sort()
    .reverse();
  return matches.map((file) => ({
    name: file,
    path: path.join(dirName, file),
  }));
}

export function restoreWordpressBackup(
  inputPath: string,
  backupRelativePath: string
): { relativePath: string } {
  const { relativePath, absolutePath } = resolveWordpressPath(inputPath);
  const backupRel = normalizeRelativePath(backupRelativePath);
  const backupAbs = path.join(BACKUP_ROOT, backupRel);
  if (!backupAbs.startsWith(BACKUP_ROOT) || !fs.existsSync(backupAbs)) {
    throw new Error('Backup not found');
  }
  const outputDir = path.dirname(absolutePath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.copyFileSync(backupAbs, absolutePath);
  return { relativePath };
}
