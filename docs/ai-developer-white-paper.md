# ETI Website — White Paper for AI Developer Copilots

**Purpose:** Describe what the **eti-website** project is, how it is built, and how to work on it safely. Use this document as context when pairing with an AI coding assistant.

**Staging example:** [eti-website.vercel.app/team/](https://eti-website.vercel.app/team/) — public marketing site for **Emerging Technologies, Inc. (ETI)**.

---

## 1. What the website is (business & audience)

**Emerging Technologies, Inc. (ETI)** is an executive IT and AI advisory / consulting firm. The site is a **marketing and lead-generation presence**, not a SaaS product.

**Primary goals:**

- Explain **who ETI is** and **what services** it offers (strategy, delivery, healthcare, agile, etc.).
- Showcase **clients** and **team / leadership** (e.g. Team page with bios).
- Drive **contact** and **“Get started” / RFP** style actions.
- Host a **blog** for thought leadership.
- Present a **professional, trustworthy brand** (healthcare / enterprise tone).

**Typical visitors:** Prospects, partners, candidates (careers), and existing clients looking for company information.

---

## 2. Technical stack (high level)

| Layer | Technology |
|--------|------------|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript** |
| Styling | **Tailwind CSS** + design tokens in `app/globals.css` |
| Content (marketing pages) | **JSON files** under `content/` (not a headless CMS API) |
| Blog | **Markdown** (or MDX-style content) under `content/blog/` |
| Forms | **Contact form** with server-side email (e.g. **Nodemailer**); env-based config |
| SEO | Next.js **Metadata API**, **next-sitemap** (post-build) |
| Deploy | **Vercel** (staging/production), optionally **Railway** / Node `server.js` for other hosts |

**Important:** This repo is **not** a live WordPress runtime. Historical WordPress HTML exports may exist in `wordpress-pages/` for migration reference; the **live app routes are React pages** driven by `content/*.json` and shared components.

---

## 3. Information architecture (main routes)

Public routes are largely **file-based Next.js pages** plus a **dynamic segment** for static marketing pages.

| Path | Role |
|------|------|
| `/` | Home — hero, pillars, services teaser, clients, CTAs, news links; driven by `content/home.json` + `getHomeContent()` |
| `/about-us`, `/services`, `/clients`, `/team`, `/careers`, `/contact-us`, `/privacy-policy`, etc. | **Dynamic:** `app/[slug]/page.tsx` loads `content/pages/{slug}.json` (with slug aliases, e.g. `career` → `careers`) |
| `/blog`, `/blog/[slug]` | Blog listing and posts from `content/blog/` |
| `/admin/*` | Password-protected **content admin** (edits JSON + blog files on disk) |
| `/api/admin/*` | Admin auth, content read/write, uploads |

Navigation labels and order are aligned with `lib/nav.ts` and `content/global.json` (nav can be overridden in global content).

**Team page (`/team`):** Renders leadership copy and team member blocks from **`content/pages/team.json`** (or equivalent slug). Staging: [eti-website.vercel.app/team/](https://eti-website.vercel.app/team/).

---

## 4. Content model (for copilots)

**Global:** `content/global.json` — site name, tagline, contact info, social links, nav, footer links, logo URLs.

**Home:** `content/home.json` — hero, metrics, pillars, services grid copy, clients intro, CTA blocks, optional `sections` for `ContentBlocks`.

**Static pages:** `content/pages/<slug>.json` — at minimum `title`, often `subheading`, `bannerImage`, `body` (rich text / markdown string), plus **page-type-specific** fields (e.g. `services[]`, `testimonials[]`, `mission`, `cta` for services/about-style pages).

**Blog:** Files under `content/blog/` with frontmatter or structured fields consumed by `lib/blog.ts`.

**Images:** Often referenced as paths under `public/` (e.g. `public/uploads/` after admin upload).

**Admin scope:** `/admin` edits **only** the JSON/blog files the React app reads — it does **not** edit legacy WordPress HTML.

---

## 5. Key UI components

- **`Header` / `Footer`** — global chrome; driven by global content + `lib/nav.ts`.
- **`PageHero`** — page title area + optional banner.
- **`RichText`** — renders markdown/HTML strings from JSON.
- **`ContentBlocks`** — reusable section blocks from JSON `sections` arrays.
- **`ContactForm`** — contact page; requires correct API/env for email delivery in production.
- **`HeroOverlayClassic` / `HeroCarousel`** — optional Swiper-based hero patterns (if used on home or injected flows); colors specified in product briefs (e.g. orange `#f57c2a`, blue overlay `rgba(14,44,90,0.85)`, CTA `#111`).

Do **not** change global typography or header/footer behavior unless explicitly requested.

---

## 6. Environment & deployment notes

**Common env vars:**

- `ADMIN_PASSWORD` — admin login (min length per app rules).
- `SITE_URL` / `NEXT_PUBLIC_SITE_URL` — canonical base URL for sitemap and OG URLs.
- Email-related vars for Nodemailer (e.g. SMTP or provider credentials) for contact forms.

**Build:** `npm run build` then `npm start`. Sitemap runs via `postbuild` (`next-sitemap`).

**`server.js`:** Custom Node entry for hosts that expect a single startup file (e.g. legacy cPanel); uses `next` programmatically and `process.env.PORT`.

---

## 7. Constraints for AI-assisted changes

1. **Prefer editing `content/*.json`** for copy and structure when the page already supports those fields.
2. **Preserve accessibility:** semantic headings, focus states, `prefers-reduced-motion` where animations exist.
3. **SEO:** keep `generateMetadata` / canonical URLs coherent when adding routes.
4. **Do not** remove or bypass `AdminGuard` / admin API auth without explicit approval.
5. **Do not** assume WordPress PHP or theme files — this is a **Next.js** app.
6. When adding pages, extend **`generateStaticParams`** / page list patterns used in `app/[slug]/page.tsx`.

---

## 8. Quick “where to change what”

| Goal | Where to look |
|------|----------------|
| Team page copy / bios | `content/pages/team.json` + `app/[slug]/page.tsx` render logic for team fields |
| Nav labels | `lib/nav.ts`, `content/global.json` |
| Home hero / sections | `content/home.json`, `app/page.tsx` |
| Footer / legal | `content/global.json`, `components/Footer.tsx` |
| Blog post | `content/blog/*`, `app/blog/*` |
| Styles / tokens | `app/globals.css`, `tailwind.config.ts` |

---

## 9. One-line summary for copilots

> **eti-website** is a **Next.js 15 + React + Tailwind** marketing site for **ETI**, with **JSON-driven static pages** (`app/[slug]/page.tsx`), a **JSON/MD home and blog**, a **password-protected admin** that edits those files, **contact email via API**, and **Vercel-oriented** deploys; treat **`content/`** as the source of truth for public marketing copy.

---

*Document version: generated for internal / AI context. Update when architecture or deploy targets change.*
