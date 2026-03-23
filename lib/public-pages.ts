const PAGE_ALIASES: Record<string, string> = {};

export function resolvePageSlug(slug: string): string {
  return PAGE_ALIASES[slug] ?? slug;
}

export function getPageAliases(): Array<{ slug: string; source: string }> {
  return Object.entries(PAGE_ALIASES).map(([slug, source]) => ({ slug, source }));
}
