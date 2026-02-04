# Why pages don’t look exactly like the WordPress site – findings and questions

## What we’re doing today

- We **extract** the middle chunk of each reference HTML (between “content” div and footer) and inject it into a Next.js layout.
- Header and footer come from `home.html` only.
- We load a **fixed set** of CSS/JS in the root layout and rewrite asset links.

## Gaps that can cause visual differences

1. **Page-specific CSS/JS**
   - Original **home** uses only `20958.css` and `73c3d.css` in the head; **blog** adds `e9d1e.css` and `cc16b.js`; **rfp-wizard** adds `11259.css` and `fa112.js`.
   - We load all four CSS and all JS on every page. That can override or conflict with page-specific styles and break “exact” match.

2. **Missing inline CSS**
   - Revolution Slider injects critical inline CSS in the head (e.g. `#rs-plugin-settings-inline-css`: `.tp-mask-wrap .tp-caption.business-label`, `.read_more_banner`, etc.). We don’t include that, so the homepage slider layout/spacing can be wrong.

3. **Script load order and context**
   - Slider and other plugins expect scripts in a certain order and sometimes expect to run in the original DOM (e.g. right after the slider markup). We strip `<script>` from injected HTML and run their contents via Next.js `<Script>`; order and timing can differ.

4. **Lazy-loaded images**
   - Reference uses `data-src` + `class="lazyload"` and a placeholder. A lazyload script must run after our content is in the DOM. If that script isn’t the same or doesn’t run at the right time, images may stay placeholders or load in a different order.

5. **Missing banner assets**
   - Some inner-page banners reference files we don’t have under `public/wp-content/uploads/` (e.g. `ExecutionBanner.jpg`, `MethodologyBannerImage1-002.jpg`, `GetStarted.jpg`, `shutterstock_378755452.jpg`). Those images 404 and sections can look broken or empty.

6. **Single header/footer source**
   - Header and footer are taken only from `home.html`. If other pages had different header/footer in WordPress (e.g. different nav state, different footer content), we won’t reflect that.

7. **No “full page” HTML**
   - We never serve the **exact** full HTML of the original page (head + body). So any reliance on exact structure, class order, or inline scripts in head/body can diverge.

---

## Questions for you

1. **“WordPress code I gave you”**  
   Do you mean only the **reference HTML** we downloaded from emergingti.com, or do you also have **WordPress theme files** (PHP templates, original CSS/JS, Revolution Slider config) we should use as the source of truth? If you have theme files, sharing them (or their paths) would help.

2. **Which pages are worst?**  
   Is it mainly the **homepage** (slider, hero, sections), or **inner pages** (e.g. Services, About, Contact), or **all** of them? That will prioritize what we fix first.

3. **Exact match vs “close enough”**  
   Do you need **pixel-identical** (same HTML/CSS/JS structure and load order as WordPress), or is “visually the same on desktop/mobile” acceptable as long as we use the same design and content?

4. **Preferred approach**  
   - **Option A – Full-page HTML:** Each route serves the **entire** reference HTML for that page (head + body), with only URLs rewritten (emergingti.com → our domain, asset paths → local). No extraction; the browser gets the same HTML as the original. Easiest way to get “exactly like the WordPress code.”
   - **Option B – Keep current approach but fix it:** Keep injecting content into a Next layout; add page-specific CSS/JS, include missing inline CSS (e.g. Revolution Slider), fix script order and lazyload, and add missing images. More work and still sensitive to script/timing differences.

---

## Recommendation

To get pages that **look exactly like the WordPress code** you have (reference HTML), the most reliable approach is **Option A: serve the full reference HTML per page** and only rewrite links/asset URLs. I can outline the exact Next.js changes (e.g. route handlers or static HTML export) to do that next.
