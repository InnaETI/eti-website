# Content file structure

All editable content lives in the repo under `content/`. Images can be swapped via paths (e.g. `/wp-content/...` or `/uploads/...`).

## Global

- **`content/global.json`** — Site-wide: site name, tagline, nav, footer links, logo URLs, contact, social, copyright. All image URLs here (e.g. `logoUrl`, `footerLogoUrl`) are swappable.

## Homepage

- **`content/home.json`** — Hero banner image, pillars (Strategy/Methodology/Execution with title, image, copy, link), services intro + items (icon + title), clients intro, CTA, about blurb, join-team, news sections. Every `image` and `icon` path can be swapped.

## Pages (one JSON per route)

- **`content/pages/<slug>.json`** — One file per page. Slugs match routes: `about-us`, `services`, `clients`, `team`, `careers`, `contact-us`, `privacy-policy`, `strategy`, `methodology`, `execution`, `rfp-wizard`. Each has at least:
  - `title`, optional `subheading`, `bannerImage` (swappable), optional `body` / `intro`
  - Page-specific fields (e.g. services list with `iconUrl`, testimonials with `image`, CTA, etc.)

All page banner and inline image fields use paths so they can be swapped in the admin.

## Blog

- **`content/blog/`** — Posts as `.mdx` (frontmatter: `title`, `excerpt`, `date`, optional `image`, `author`) or `.json`. Body in MDX or `body` in JSON. Image in frontmatter is swappable.

## Images

- Existing assets: `public/wp-content/uploads/...` (from reference site).
- New uploads: `public/uploads/...` (admin uploads). Content files store paths like `/wp-content/...` or `/uploads/...` so the admin can swap any image.

## Summary

| Area        | File(s)                    | Swappable images                          |
|------------|----------------------------|-------------------------------------------|
| Global     | `global.json`              | `logoUrl`, `footerLogoUrl`                 |
| Home       | `home.json`                | `heroBanner`, pillars[].image, services.items[].icon |
| Pages      | `pages/<slug>.json`        | `bannerImage`, any nested `image`/`iconUrl` |
| Blog       | `blog/*.mdx` or `*.json`   | frontmatter `image`, or `image` in JSON   |
