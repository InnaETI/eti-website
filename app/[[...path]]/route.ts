import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORDPRESS_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');

const PAGE_FILES: Record<string, string> = {
  '': 'index.html',
  'about-us': 'about-us.html',
  'services': 'services.html',
  'clients': 'clients.html',
  'team': 'team.html',
  'careers': 'careers.html',
  'blog': 'blog.html',
  'contact-us': 'contact-us.html',
  'privacy-policy': 'privacy-policy.html',
  'rfp-wizard': 'rfp-wizard.html',
  'strategy': 'strategy.html',
  'methodology': 'methodology.html',
  'execution': 'execution.html',
  'career': 'career.html',
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const pathSegments = (await params).path ?? [];
  const pathKey = pathSegments.join('/');

  // Don't serve WordPress HTML for asset-like or reserved paths
  if (pathSegments[0] === '_next' || pathSegments[0] === 'api' || pathSegments[0] === 'wp-content') {
    return new Response(null, { status: 404 });
  }

  const fileName = PAGE_FILES[pathKey] ?? (pathKey ? `${pathKey}.html` : 'index.html');
  const toTry = path.join(WORDPRESS_PAGES_DIR, fileName);

  if (!fs.existsSync(toTry)) {
    return new Response(null, { status: 404 });
  }

  let html = fs.readFileSync(toTry, 'utf-8');

  // Homepage: Replace broken Revolution Slider with Swiper (works on Railway) v2
  if (pathKey === '') {
    html = replaceRevolutionSliderWithSwiper(html);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function replaceRevolutionSliderWithSwiper(html: string): string {
  const sliderStartMarker = '<div id="rev_slider_13_1_wrapper"';
  const sliderEndMarker = '</div><!-- END REVOLUTION SLIDER -->';
  const sliderStartIndex = html.indexOf(sliderStartMarker);
  const sliderEndIndex = html.indexOf(sliderEndMarker, sliderStartIndex);

  if (sliderStartIndex === -1 || sliderEndIndex === -1) return html;

  const swiperCarousel = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<div class="swiper-carousel-wrapper eti-hero-carousel" style="width:100%;height:675px;position:relative;">
<div class="swiper"><div class="swiper-wrapper">
<div class="swiper-slide">
<section class="eti-hero"><img src="/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg" alt="Strategy" />
<div class="eti-hero-overlay">
<div class="eti-hero-tag">Strategy</div>
<div class="eti-hero-card"><p>In today's rapidly evolving business landscape, the imperative for strategic transformation is underscored by our commitment to four pivotal pillars of success.</p></div>
<a class="eti-hero-cta" href="/strategy/">Read more</a>
</div>
</section>
</div>
<div class="swiper-slide">
<section class="eti-hero"><img src="/wp-content/uploads/2017/08/methodology-1.jpg" alt="Methodology" />
<div class="eti-hero-overlay">
<div class="eti-hero-tag">Methodology</div>
<div class="eti-hero-card"><p>To leverage technical advantages while maintaining vigilant cost control we collaborate with leadership, management, and technical teams to create strategy and allocate budget for the best technical solutions.</p></div>
<a class="eti-hero-cta" href="/methodology/">Read more</a>
</div>
</section>
</div>
<div class="swiper-slide">
<section class="eti-hero"><img src="/wp-content/uploads/2017/08/execution.jpg" alt="Execution" />
<div class="eti-hero-overlay">
<div class="eti-hero-tag">Execution</div>
<div class="eti-hero-card"><p>Think of ETI as a strategic partner dedicated to helping you achieve your organizational goals. Our approach centers on aligning with your objectives, delivering excellence, and fostering a culture of continuous improvement.</p></div>
<a class="eti-hero-cta" href="/execution/">Read more</a>
</div>
</section>
</div>
</div></div>
<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>
</div></div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>document.addEventListener("DOMContentLoaded",function(){new Swiper(".swiper",{slidesPerView:1,spaceBetween:0,loop:!0,autoplay:{delay:9000,disableOnInteraction:!1},speed:1e3,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})});</script>
<style>
.eti-hero{position:relative;height:675px;width:100%;overflow:hidden}
.eti-hero img{position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:center}
.eti-hero-overlay{position:absolute;left:48px;top:50%;transform:translateY(-50%);width:520px;max-width:calc(100% - 96px);z-index:20}
.eti-hero-tag{display:inline-block;transform:translateX(-20px);border-radius:2px;background:#f57c2a;color:#fff!important;padding:12px 24px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px}
.eti-hero-card{border-radius:2px;background:rgba(14,44,90,0.85);color:#fff!important;padding:24px 28px;margin-top:12px}
.eti-hero-card p{margin:0;font-size:14px;line-height:1.5;color:#fff!important}
.eti-hero-cta{display:inline-block;margin-top:16px;border-radius:2px;background:#111;color:#fff!important;padding:12px 20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none}
.eti-hero-cta:hover{background:#ff6b35!important;color:#fff!important}
.swiper-carousel-wrapper .swiper-button-next,.swiper-carousel-wrapper .swiper-button-prev{color:#fff;background:rgba(0,0,0,.5);width:44px;height:44px;border-radius:50%}
.swiper-carousel-wrapper .swiper-button-next:hover,.swiper-carousel-wrapper .swiper-button-prev:hover{background:rgba(255,107,53,.9)}
.swiper-carousel-wrapper .swiper-button-next::after,.swiper-carousel-wrapper .swiper-button-prev::after{font-size:20px}
@media(max-width:639px){.eti-hero-overlay{left:20px;max-width:calc(100% - 40px)}.eti-hero-card{padding:20px}}
section.service-wrap.businessplus-page-setting-one{margin-top:0!important;padding-top:24px!important}
</style>`;

  return html.substring(0, sliderStartIndex) + swiperCarousel + html.substring(sliderEndIndex + sliderEndMarker.length);
}
