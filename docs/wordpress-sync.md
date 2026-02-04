# WordPress pixel-identical sync

The site serves **full HTML** fetched from the live WordPress site (https://www.emergingti.com) so that the output is pixel-identical. No React layout or extraction is applied.

## How it works

1. **Fetch script** (`npm run fetch-wordpress`)  
   - Requests each page URL from the live site (public URLs, no admin auth).  
   - Extracts all asset URLs (CSS, JS, images) from the HTML.  
   - Downloads assets to `public/wp-content/` (and `public/wp-includes/` if any).  
   - Rewrites HTML: `https://www.emergingti.com/` → `/`, `https://www.emergingti.com/wp-content/` → `/wp-content/`.  
   - Saves rewritten HTML into `wordpress-pages/` (e.g. `index.html`, `about-us.html`).

2. **Serving**  
   - Next.js route handler `app/[[...path]]/route.ts` serves the saved HTML for each path.  
   - Static assets under `public/wp-content/` are served by Next as usual.  
   - The response is the raw WordPress HTML document; no layout or React wrapper.

## Re-sync from WordPress

From the project root:

```bash
npm run fetch-wordpress
```

If you see TLS/certificate errors (e.g. in CI or locked-down networks), run:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run fetch-wordpress
```

Then rebuild/restart:

```bash
npm run build && npm run start
```

## Pages included

The script fetches: `/`, `/about-us/`, `/services/`, `/clients/`, `/team/`, `/careers/`, `/blog/`, `/contact-us/`, `/privacy-policy/`, `/rfp-wizard/`, `/strategy/`, `/methodology/`, `/execution/`, `/career/`.  
After fetching `blog.html`, it discovers all blog post links (e.g. `/2024/02/24/slug/`) and fetches each, saving to `wordpress-pages/YYYY/MM/DD/slug.html`. The route handler serves these by path (e.g. `/2024/02/24/slug/` → `wordpress-pages/2024/02/24/slug.html`).

## Trailing slashes

`next.config.ts` has `trailingSlash: true` so WordPress-style links (`/about-us/`, `/blog/`) work. Internal links in the HTML use trailing slashes; the route handler normalizes path segments and serves the correct file.

## Credentials

Admin credentials (wp-admin) are **not** used by the fetch script. Only public page URLs are requested. To export or manage content from wp-admin, use the WordPress UI; the script only mirrors the public front-end HTML and assets.
