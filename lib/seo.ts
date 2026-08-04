import type { Metadata } from 'next';
import type { GlobalContent } from '@/lib/content';
import { SITE, canonicalUrl } from '@/lib/site';

type StaticSeoConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  canonicalPath?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  author?: string;
  image?: string;
};

const DEFAULT_KEYWORDS = [
  'healthcare IT consulting',
  'healthcare technology consulting',
  'healthcare operations consulting',
  'healthcare implementation support',
  'healthcare interoperability consulting',
  'healthcare AI strategy',
  'healthcare data and analytics consulting',
  'enterprise modernization for healthcare',
  'private equity healthcare technology diligence',
];

export const STATIC_SEO: Record<string, StaticSeoConfig> = {
  '/': {
    title: 'Healthcare Technology Consulting, IT Execution, and AI Advisory',
    description:
      'ETI helps healthcare organizations and growth-focused companies align technology strategy, modernization, AI, and execution with measurable business outcomes.',
    path: '/',
    image: '/images/advancing-healthcare-it-hero.jpg',
  },
  '/about-us': {
    title: 'About ETI | Healthcare Technology Consulting Leadership',
    description:
      'Learn how ETI combines executive technology leadership, healthcare delivery experience, and hands-on execution support to improve operations and enterprise value.',
    path: '/about-us',
    image: '/wp-content/uploads/2020/05/shutterstock_1047275755-banner.jpg',
  },
  '/about': {
    title: 'About ETI | Healthcare Technology Consulting Leadership',
    description:
      'Learn how ETI combines executive technology leadership, healthcare delivery experience, and hands-on execution support to improve operations and enterprise value.',
    path: '/about',
    canonicalPath: '/about-us',
    image: '/wp-content/uploads/2020/05/shutterstock_1047275755-banner.jpg',
    noindex: true,
  },
  '/services': {
    title: 'Healthcare Technology Consulting Services | Strategy, Execution, AI',
    description:
      'Explore ETI services for healthcare technology strategy, implementation support, modernization, AI initiatives, interoperability, and operating model execution.',
    path: '/services',
    image: '/wp-content/uploads/2017/08/methodology-2.jpg',
  },
  '/clients': {
    title: 'Client Results | Healthcare Technology Consulting and Execution',
    description:
      'See how ETI supports healthcare and growth-stage organizations with modernization, platform execution, operational improvement, and enterprise value creation.',
    path: '/clients',
    image: '/wp-content/uploads/2015/11/contactus_135280127.jpg',
  },
  '/clients-lab': {
    title: 'Client Results | Healthcare Technology Consulting and Execution',
    description:
      'See how ETI supports healthcare and growth-stage organizations with modernization, platform execution, operational improvement, and enterprise value creation.',
    path: '/clients-lab',
    canonicalPath: '/clients',
    image: '/wp-content/uploads/2015/11/contactus_135280127.jpg',
    noindex: true,
  },
  '/team': {
    title: 'Leadership Team | Healthcare Technology Consulting and Delivery',
    description:
      'Meet the ETI leadership team bringing executive technology, healthcare, and delivery experience to complex modernization and implementation initiatives.',
    path: '/team',
    image: '/wp-content/uploads/2017/08/smile-1.jpg',
  },
  '/blog': {
    title: 'Insights | Healthcare IT Consulting, AI Strategy, and Operations',
    description:
      'Read ETI insights on healthcare IT consulting, AI strategy, interoperability, modernization, operations, and the realities of implementation work.',
    path: '/blog',
    image: '/images/insights-hero.jpg',
  },
  '/contact-us': {
    title: 'Contact ETI | Healthcare Technology Consulting and Execution',
    description:
      'Contact ETI to discuss healthcare technology consulting, implementation support, AI strategy, interoperability, modernization, and operating model execution.',
    path: '/contact-us',
    image: '/images/contact-us.jpg',
  },
  '/advancing-healthcare-it': {
    title: 'Advancing Healthcare IT | Healthcare Technology Consulting',
    description:
      'ETI provides enterprise technology leadership for healthcare organizations navigating modernization, implementation, operations, and execution complexity.',
    path: '/advancing-healthcare-it',
    image: '/images/advancing-healthcare-it-hero.jpg',
  },
  '/distributed-workforce-solutions': {
    title: 'Distributed Workforce Solutions | Technology and Operations Consulting',
    description:
      'ETI helps organizations design distributed workforce models with better execution visibility, workflow discipline, reporting, and operating support.',
    path: '/distributed-workforce-solutions',
    image: '/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg',
  },
  '/strategy': {
    title: 'Technology Strategy Consulting | Healthcare and Enterprise Modernization',
    description:
      'ETI helps leadership teams set technology strategy, prioritize modernization work, and align business goals, budget, and execution in complex environments.',
    path: '/strategy',
    image: '/wp-content/uploads/2017/12/shutterstock_378755452.jpg',
  },
  '/methodology': {
    title: 'Implementation Methodology | Healthcare Technology Consulting',
    description:
      'ETI applies agile, business-focused implementation methodology to help healthcare and enterprise teams improve delivery, compliance, scalability, and execution.',
    path: '/methodology',
    image: '/wp-content/uploads/2017/12/MethodologyBannerImage1-002.jpg',
  },
  '/execution': {
    title: 'Execution Support | Healthcare IT Implementation and Delivery',
    description:
      'ETI supports execution, implementation, and delivery leadership so healthcare and enterprise initiatives move from strategy into measurable outcomes.',
    path: '/execution',
    image: '/wp-content/uploads/2017/12/ExecutionBanner.jpg',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Review the ETI website privacy policy and data handling terms.',
    path: '/privacy-policy',
    noindex: true,
  },
};

function sanitizeForJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function jsonLd(value: unknown): { __html: string } {
  return { __html: sanitizeForJsonLd(value) };
}

export function absoluteUrl(path?: string): string {
  if (!path) return canonicalUrl('/');
  if (/^https?:\/\//i.test(path)) return path;
  return canonicalUrl(path);
}

export function buildPageMetadata(config: StaticSeoConfig): Metadata {
  const canonicalPath = config.canonicalPath ?? config.path;
  const image = absoluteUrl(config.image || SITE.ogImage);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords ?? DEFAULT_KEYWORDS,
    alternates: {
      canonical: canonicalUrl(canonicalPath),
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl(canonicalPath),
      siteName: SITE.legalName,
      locale: 'en_US',
      type: config.type ?? 'website',
      publishedTime: config.publishedTime,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [image],
    },
    robots: config.noindex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : undefined,
  };
}

export function getStaticSeo(path: string): StaticSeoConfig | undefined {
  return STATIC_SEO[path];
}

export function buildOrganizationSchema(globalContent?: GlobalContent) {
  const sameAs = Object.values(globalContent?.social ?? {}).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}#organization`,
    name: globalContent?.legalName || SITE.legalName,
    alternateName: globalContent?.shortName || SITE.shortName,
    url: SITE.url,
    logo: absoluteUrl('/logo.png'),
    email: globalContent?.contactEmail,
    telephone: globalContent?.contactPhone,
    sameAs,
  };
}

export function buildWebsiteSchema(globalContent?: GlobalContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: globalContent?.siteName || SITE.name,
    description: globalContent?.description || SITE.description,
    publisher: {
      '@id': `${SITE.url}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.publishedTime,
    author: input.author
      ? {
          '@type': 'Person',
          name: input.author,
        }
      : {
          '@type': 'Organization',
          name: SITE.legalName,
        },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}#organization`,
      name: SITE.legalName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    image: absoluteUrl(input.image || SITE.ogImage),
  };
}
