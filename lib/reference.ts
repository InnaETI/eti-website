import { readFileSync } from 'fs';
import path from 'path';

const CONTENT_START = '<div id="content" class="post-content">';
const HEADER_START = '<!--Header Section Start-->';
const HEADER_END = '<!--Header Section End-->';
const FOOTER_START = '<!--Footer Section Start-->';
const FOOTER_END = '<!--Footer Section End-->';

const INTERNAL_PATHS = [
  '/',
  '/about-us/',
  '/services/',
  '/clients/',
  '/team/',
  '/careers/',
  '/blog/',
  '/contact-us/',
  '/privacy-policy/',
  '/rfp-wizard/',
  '/strategy/',
  '/methodology/',
  '/execution/',
  '/career/',
  '/distributed-workforce-solutions',
];

function rewriteReferenceLinks(html: string): string {
  let output = html.replaceAll('https://www.emergingti.com/wp-content/', '/wp-content/');

  for (const pathName of INTERNAL_PATHS) {
    output = output.replaceAll(`https://www.emergingti.com${pathName}`, pathName);
  }

  return output;
}

export function getReferenceContent(pageSlug: string): string {
  const filePath = path.join(process.cwd(), 'reference', `${pageSlug}.html`);
  const raw = readFileSync(filePath, 'utf-8');

  const startIndex = raw.indexOf(CONTENT_START);
  const footerIndex = raw.indexOf(FOOTER_START);

  if (startIndex === -1 || footerIndex === -1 || footerIndex <= startIndex) {
    throw new Error(`Reference content markers not found for ${pageSlug}.html`);
  }

  const start = startIndex + CONTENT_START.length;
  let content = raw.slice(start, footerIndex);
  content = content.replace(/\s*<\/div>\s*$/i, '');

  content = rewriteReferenceLinks(content);

  return content;
}

export function getReferenceHeader(): string {
  const filePath = path.join(process.cwd(), 'reference', 'home.html');
  const raw = readFileSync(filePath, 'utf-8');

  const startIndex = raw.indexOf(HEADER_START);
  const endIndex = raw.indexOf(HEADER_END);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('Reference header markers not found in home.html');
  }

  let header = raw.slice(startIndex + HEADER_START.length, endIndex);
  header = rewriteReferenceLinks(header);

  return header;
}

export function getReferenceFooter(): string {
  const filePath = path.join(process.cwd(), 'reference', 'home.html');
  const raw = readFileSync(filePath, 'utf-8');

  const startIndex = raw.indexOf(FOOTER_START);
  const endIndex = raw.indexOf(FOOTER_END);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('Reference footer markers not found in home.html');
  }

  let footer = raw.slice(startIndex + FOOTER_START.length, endIndex);
  footer = rewriteReferenceLinks(footer);

  return footer;
}
