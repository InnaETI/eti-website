# Acceptance Criteria – Status Report

**Report date:** February 4, 2026  
**Scope:** “More clear website content” acceptance criteria

---

## Summary

| # | Criterion | Status | Notes |
|---|-----------|--------|--------|
| 1 | Clients list – no website URL | **FAIL** | URLs still shown on Clients page and individual client pages |
| 2 | IPG – no URL below name | **FAIL** | `https://www.ipg.com/` displayed on Clients page and on `/client/ipg/` |
| 3 | Healthcare Payment Specialists – no URL below name | **FAIL** | `www.healthcarepayment.com` on Clients page and `/client/health-payment-systems/` |
| 4 | Trainerly – no URL below name | **FAIL** | `http://www.trainer.ly/` on Clients page and `/client/trainerly/` |
| 5 | StratusVue – no URL below name | **FAIL** | `https://www.stratusvue.com/` on Clients page and `/client/stratusvue-com/` |
| 6 | Clients page & client pages – no Categories/Technologies sidebar | **FAIL** | Sidebar still present on Clients and individual client pages |
| 7 | Contact Us – no map, address, phone, email below form | **FAIL** | Map, map-info-right (address, phone, email) still in `contact-us.html` |
| 8 | Home page – client diamonds link to client pages | **FAIL** | Project images (diamonds) have no `<a href="/client/...">` wrappers |
| 9 | Blog page – RSS wording has no hyperlink | **FAIL** (static) / **PASS** (React) | Static `blog.html` has RSS links in body; React `/blog` has no RSS |
| 10 | Privacy Policy – “PRIVACY POLICY” header + banner image | **FAIL** | No “PRIVACY POLICY” heading; no banner; empty `h1` in current HTML |

---

## Detail by criterion

### 1. Clients list – no website URL for clients  
**Status: FAIL**  
- **Clients page** (`wordpress-pages/clients.html`): Client list entries still show client website URLs (e.g. IPG `https://www.ipg.com/`, Healthcare Payment Specialists `www.healthcarepayment.com`, Trainerly, StratusVue `https://www.stratusvue.com/`) in `<span>` elements below client names.  
- **Action:** Remove or hide the spans/elements that output these URLs on the Clients listing and on individual client pages.

### 2. IPG – no URL below name  
**Status: FAIL**  
- **Clients page:** IPG row shows `https://www.ipg.com/` in a span.  
- **Individual page** (`wordpress-pages/client/ipg.html`): Heading block has `<span>https://www.ipg.com/</span>` below the client name.  
- **Action:** Remove that span from both Clients list and `/client/ipg/` content.

### 3. Healthcare Payment Specialists – no URL below name  
**Status: FAIL**  
- **Clients page:** Shows `www.healthcarepayment.com` below the name.  
- **Individual page** (`wordpress-pages/client/health-payment-systems.html`): Has `<span>www.healthcarepayment.com</span>` below the h1.  
- **Action:** Remove that span from both locations.

### 4. Trainerly – no URL below name  
**Status: FAIL**  
- **Clients page:** Trainerly row includes URL in body copy.  
- **Individual page** (`wordpress-pages/client/trainerly.html`): Has `<span>http://www.trainer.ly/</span>` below the h1.  
- **Action:** Remove the span below the name on both; optionally remove or reword URL from body copy if it should not be visible.

### 5. StratusVue – no URL below name  
**Status: FAIL**  
- **Clients page:** StratusVue row shows `https://www.stratusvue.com/`.  
- **Individual page** (`wordpress-pages/client/stratusvue-com.html`): Has `<span>https://www.stratusvue.com/</span>` below the heading.  
- **Action:** Remove that span from both Clients list and `/client/stratusvue-com/` content.

### 6. Clients page and individual client pages – no Categories/Technologies sidebar  
**Status: FAIL**  
- **Clients page** (`wordpress-pages/clients.html`): Contains `technologies-tags` / `blog-sidebar-section` with “Categories” and “Technologies” (with tag links).  
- **Individual client pages** (e.g. `client/ipg.html`, `client/health-payment-systems.html`, `client/trainerly.html`, `client/stratusvue-com.html`): Each has a similar `technologies-tags` sidebar with Categories and Technologies.  
- **Action:** Remove or hide the sidebar blocks (e.g. `col-md-4 pull-right technologies-tags` and its content) on the Clients page and on each client detail page.

### 7. Contact Us – no map, address, phone, email below form  
**Status: FAIL**  
- **Contact Us page** (`wordpress-pages/contact-us.html`): Still includes:
  - Map section: `map-wrap`, `map-contact`, `#custom_map`
  - `map-info-right` with address, phone, email (e.g. `icon-pointer`, `icon-call-out`, `icon-envelope-open`)
  - Google Maps script load.  
- **Action:** Remove the map block, the address/phone/email block below the form, and the maps script (or leave script but remove map container and contact block).

### 8. Home page – client diamonds link to client pages  
**Status: FAIL**  
- **Home page** (`wordpress-pages/index.html`): The “diamonds” (project images: IPG, Oak Street Health, HPS, ExplORer Surgical, Trainerly, StratusVue) are inside `<figure>` with no wrapping `<a href="...">`.  
- **Action:** Wrap each client’s project block (or the clickable image/area) in `<a href="/client/{slug}/">` so each diamond links to the correct ETI client page (e.g. `/client/ipg/`, `/client/oak-street-health/`, `/client/health-payment-systems/`, `/client/explorer-surgical/`, `/client/trainerly/`, `/client/stratusvue-com/`).

### 9. Blog page – RSS wording has no hyperlink  
**Status: FAIL (static) / PASS (React)**  
- **Static blog** (`wordpress-pages/blog.html`): In the body content there are still paragraphs that say “add our RSS Feed to your RSS client” and “add the following URL to your RSS client” with `<a href="/category/.../feed/">` links. So the RSS wording still has hyperlinks on the static blog.  
- **React blog** (`/blog`): No RSS links in the visible content.  
- **Action:** In `wordpress-pages/blog.html`, remove the `<a href="...">` from the RSS sentences (or replace with plain text) so “RSS” / “RSS client” is not a link. If the site uses only the React blog for `/blog`, the static file may still be used in other environments (e.g. fallback or pre-render); fixing the static file is recommended.

### 10. Privacy Policy – “PRIVACY POLICY” header and banner image  
**Status: FAIL**  
- **Privacy Policy page** (`wordpress-pages/privacy-policy.html`):  
  - Main content has an empty `<h1 class="h1">` and empty `<span>` in the heading area; there is no visible “PRIVACY POLICY” heading.  
  - There is no banner image above that heading (no `banner-blog-sidebar` or similar section at the top of the content).  
- **Action:**  
  1. Set the main heading text to “PRIVACY POLICY” (e.g. in the existing `h1` or equivalent).  
  2. Add a banner image section above the heading (reuse an existing site image or one in the style of the rest of the site, e.g. from `wp-content/uploads` or reference assets).

---

## Next steps (recommended)

1. **Client URLs:** Remove or hide all client website URL spans on the Clients list and on IPG, Healthcare Payment Specialists, Trainerly, and StratusVue pages.  
2. **Sidebars:** Remove Categories/Technologies sidebar from `clients.html` and from each client HTML file under `wordpress-pages/client/`.  
3. **Contact Us:** Remove map, address, phone, and email blocks (and map script if unused) from `contact-us.html`.  
4. **Home diamonds:** Add `<a href="/client/{slug}/">` around each client project/diamond on `index.html`.  
5. **Blog RSS:** In `blog.html`, remove hyperlinks from the RSS wording (plain text only).  
6. **Privacy Policy:** Add “PRIVACY POLICY” as the visible header and a banner image above it in `privacy-policy.html`.

After these edits, re-test each criterion and update this report to **PASS** where applicable.
