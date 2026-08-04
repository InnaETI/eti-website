import { AdminPageHeader } from '../components/AdminPageHeader';
import { AdminPanel } from '../components/AdminPanel';
import { getStorageBackendInfo } from '@/lib/content-store';
import { PublishingActions } from '../components/PublishingActions';
import { getPublishDiffSummary, getRecentPublishCommits } from '@/lib/admin-publishing';

export default function AdminPublishingPage() {
  const backend = getStorageBackendInfo();
  const diff = getPublishDiffSummary();
  const commits = getRecentPublishCommits();

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
          {backend.mode === 'local' ? (
            <AdminPanel title="To switch on GitHub-backed staging mode">
              <ul className="space-y-3 text-sm leading-6 text-zinc-600">
                <li>Set <span className="font-mono text-zinc-950">CONTENT_BACKEND=github</span>.</li>
                <li>Add <span className="font-mono text-zinc-950">GITHUB_TOKEN</span>, <span className="font-mono text-zinc-950">GITHUB_REPO_OWNER</span>, and <span className="font-mono text-zinc-950">GITHUB_REPO_NAME</span>.</li>
                <li>Optionally set <span className="font-mono text-zinc-950">GITHUB_STAGING_BRANCH</span> and <span className="font-mono text-zinc-950">GITHUB_PRODUCTION_BRANCH</span>.</li>
                <li>Set public links with <span className="font-mono text-zinc-950">NEXT_PUBLIC_STAGING_SITE_URL</span> and <span className="font-mono text-zinc-950">NEXT_PUBLIC_PRODUCTION_SITE_URL</span>.</li>
              </ul>
            </AdminPanel>
          ) : null}

          <AdminPanel title="What staging would promote right now">
            {diff.available ? (
              <div className="space-y-4 text-sm text-zinc-600">
                <p className="font-medium text-zinc-950">{diff.summary}</p>
                {diff.files.length ? (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Changed content files
                    </p>
                    <ul className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-4 font-mono text-xs text-zinc-700">
                      {diff.files.map((file) => (
                        <li key={file}>{file}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm leading-6 text-zinc-600">
                {diff.error || 'Branch diff is not available in this environment.'}
              </p>
            )}
          </AdminPanel>

          <AdminPanel title="Recent content revisions">
            {commits.length ? (
              <div className="space-y-3">
                {commits.map((commit) => (
                  <div key={`${commit.shortSha}-${commit.subject}`} className="rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      <span>{commit.shortSha}</span>
                      <span>•</span>
                      <span>{commit.date}</span>
                      <span>•</span>
                      <span>{commit.author}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-zinc-950">{commit.subject}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-zinc-600">
                No content revision history is available yet in this environment.
              </p>
            )}
          </AdminPanel>

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
