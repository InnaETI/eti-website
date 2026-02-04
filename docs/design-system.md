# ETI Marketing Site — Design System

## Color tokens (matching emergingti.com)

Aligned to the ETI logo and current site: **deep blue** (#1e3a5f) and **reddish-orange** (#d85c3a).

| Token | CSS variable | Usage |
|-------|--------------|--------|
| Brand | `--color-brand` | Nav links, headings, text links (#1e3a5f) |
| Accent | `--color-accent` | CTAs, buttons, focus rings (#d85c3a) |
| Background | `--color-bg` | Page background (light: `#ffffff`) |
| Surface | `--color-surface` | Cards, sections |
| Surface elevated | `--color-surface-elevated` | Raised panels |
| Surface muted | `--color-surface-muted` | Bands, footer |
| Ink | `--color-ink` | Primary text |
| Ink muted | `--color-ink-muted` | Secondary text |
| Border | `--color-border` | Borders |

**Light theme (default):** Matches emergingti.com — white/light gray background, blue links, orange CTAs.  
**Dark mode:** Optional via `.dark` class on `<html>`.

## Typography

- **Body:** Open Sans (Google Font) — `--font-sans`. Matches typical corporate/WordPress feel.
- **Display / headings:** Source Sans 3 (Google Font) — `--font-display`. Clean, professional.

Loaded via `next/font/google` with `display: swap`.  
Scale: large headings (e.g. hero 4xl–6xl), generous line height, max-width for prose (65ch).

## Spacing scale

Tailwind default scale; content width `max-w-content` (75rem) with horizontal padding (px-4 sm:px-6 lg:px-8).  
Section vertical padding: py-16 sm:py-20 lg:py-24.

## Component list

| Component | Purpose |
|-----------|---------|
| **Header** | Sticky nav; logo (ETI); main links; mobile menu with focus states |
| **Footer** | Site name, tagline, nav links, Privacy, copyright |
| **PrimaryButton** | Orange CTA; supports `link` or `button` |
| **SecondaryButton** | Outline/border; supports `link` or `button` |
| **Section** | Wrapper with container-content and vertical padding |
| **SectionTitle** | Title + optional subtitle for section headings |
| **ContactForm** | Name, email, phone (optional), message; placeholder submit (no backend in MVP) |

## Icons

No generic icon library. Clean line icons used sparingly if needed; otherwise typography and layout only.  
Logo: ETI mark (blue + orange) in header; use `/logo.png` (next/image).

## Motion

Minimal animation. Subtle micro-interactions only.  
`prefers-reduced-motion: reduce` respected: animations and transitions reduced to near-instant in `globals.css`.

## Accessibility

- Semantic HTML (header, main, footer, nav, article, section).
- Keyboard navigation and visible focus states (orange ring).
- Contrast: WCAG AA targeted; ink on surface and muted text on background.
- Form labels, ARIA where needed (e.g. mobile menu expanded, form status).
