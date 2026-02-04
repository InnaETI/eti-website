import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PAGE_FILES, WORDPRESS_PAGES_DIR, WP_BASE } from '@/lib/wordpress-pages';

const LAZYLOAD_FALLBACK =
  '<script>(function(){function l(){document.querySelectorAll(".lazyload[data-src]").forEach(function(e){e.src=e.getAttribute("data-src")||"";e.removeAttribute("data-src")});document.querySelectorAll(".lazyload[data-srcset]").forEach(function(e){e.srcset=e.getAttribute("data-srcset")||"";e.removeAttribute("data-srcset")})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",l);else l();setTimeout(l,500);setTimeout(l,1500);})();</script>';
const CONTACT_FORM_SCRIPT = `<script>(function(){function u(t){return(t||"").trim()}function s(f,m,e){var o=f.querySelector(".wpcf7-response-output");if(!o)return;o.textContent=m;o.style.display="block";o.setAttribute("aria-hidden","false");o.classList.toggle("wpcf7-validation-errors",!!e);o.classList.toggle("wpcf7-mail-sent-ok",!e)}function h(form){if(form.dataset.etiContact==="1")return;form.dataset.etiContact="1";form.addEventListener("submit",async function(ev){ev.preventDefault();if(form.dataset.etiSubmitting==="1")return;form.dataset.etiSubmitting="1";s(form,"Sending...",false);var data={name:u(form.querySelector("[name=\"your-name\"]")?.value),email:u(form.querySelector("[name=\"your-email\"]")?.value),phone:u(form.querySelector("[name=\"tel-201\"]")?.value),message:u(form.querySelector("[name=\"your-message\"]")?.value),source:window.location.href};try{var res=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});if(res.ok){s(form,"Thank you. We'll be in touch shortly.",false);form.reset()}else{s(form,"Something went wrong. Please try again.",true)}}catch(e){s(form,"Something went wrong. Please try again.",true)}finally{form.dataset.etiSubmitting="0"}})}function i(){document.querySelectorAll("form.wpcf7-form").forEach(h)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",i);else i()})();</script>`;

function rewriteWpHtml(html: string): string {
  let out = html
    .replaceAll('https://www.emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('https://www.emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('https://www.emergingti.com/', '/')
    .replaceAll('http://www.emergingti.com/', '/');
  out = out.replace(/action="[^"]*#wpcf7-[^"]+"/g, 'action="/api/contact"');
  out = out.replace(/action="\/wp-comments-post\.php"/g, 'action="#"');
  if (out.includes('class="') && out.includes('lazyload') && !out.includes('data-src to src')) {
    out = out.replace('</body>', LAZYLOAD_FALLBACK + '\n</body>');
  }
  if (out.includes('wpcf7-form')) {
    out = out.replace('</body>', CONTACT_FORM_SCRIPT + '\n</body>');
  }
  return out;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  let pathSegments = (await params).path ?? [];
  pathSegments = pathSegments.filter((p) => p !== '');
  const pathKey = pathSegments.join('/');
  const searchQuery = request.nextUrl.searchParams.get('s');

  // Don't serve WordPress HTML for asset-like or reserved paths
  if (
    pathSegments[0] === '_next' ||
    pathSegments[0] === 'api' ||
    pathSegments[0] === 'admin' ||
    pathSegments[0] === 'wp-content'
  ) {
    return new Response(null, { status: 404 });
  }

  // Search: fetch WordPress search results and serve rewritten HTML
  if (pathKey === '' && searchQuery != null && searchQuery.trim() !== '') {
    try {
      const wpSearchUrl = `${WP_BASE}/?s=${encodeURIComponent(searchQuery.trim())}`;
      const res = await fetch(wpSearchUrl, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ETI/1.0)' },
      });
      if (res.ok) {
        const html = await res.text();
        return new Response(rewriteWpHtml(html), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
    } catch {
      // fall through to index
    }
  }

  const fileName = PAGE_FILES[pathKey] ?? (pathKey ? `${pathKey}.html` : 'index.html');
  const toTry = path.join(WORDPRESS_PAGES_DIR, fileName);

  if (!fs.existsSync(toTry)) {
    return new Response(null, { status: 404 });
  }

  let html = fs.readFileSync(toTry, 'utf-8');
  html = rewriteWpHtml(html);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
