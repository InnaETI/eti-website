import { AdminPageHeader } from '../components/AdminPageHeader';
import { AdminPanel } from '../components/AdminPanel';
import { getStorageBackendInfo } from '@/lib/content-store';
import { PublishingActions } from '../components/PublishingActions';

export default function AdminPublishingPage() {
  const backend = getStorageBackendInfo();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Publishing"
        title="Publishing center"
        description="Review where content changes are going, open the current staging and production environments, and promote approved staging content when GitHub-backed mode is configured."
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <AdminPanel
          title="Current publishing target"
          description="The admin should save to staging by default. Production promotion is a separate, explicit step."
        >
          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-zinc-950">{backend.label}</span>
                {backend.repo && backend.branch ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
                    {backend.repo} → {backend.branch}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{backend.message}</p>
            </div>

            <PublishingActions
              mode={backend.mode}
              stagingUrl={backend.stagingUrl}
              productionUrl={backend.productionUrl}
              branch={backend.branch}
              productionBranch={backend.productionBranch}
            />
          </div>
        </AdminPanel>

        <div className="space-y-6">
          <AdminPanel title="Recommended workflow">
            <ol className="space-y-3 text-sm leading-6 text-zinc-600">
              <li>1. Edit content and save to the staging branch.</li>
              <li>2. Open staging and review the exact pages you changed.</li>
              <li>3. Only after approval, promote staging to production.</li>
            </ol>
          </AdminPanel>

          <AdminPanel title="Coverage notes">
            <ul className="space-y-3 text-sm leading-6 text-zinc-600">
              <li>Pages, blog posts, global settings, and homepage content are covered by the current content pipeline.</li>
              <li>Some sections still remain code-managed, especially in About and Clients. The page editors now call that out explicitly.</li>
              <li>Uploads can follow the same backend path, but a full media library and revision history are still future work.</li>
            </ul>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}
