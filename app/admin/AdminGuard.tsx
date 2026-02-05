'use client';

/**
 * Admin auth is enforced by middleware (redirect to /admin/login/ when no valid cookie).
 * This guard just renders children; no client-side fetch.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
