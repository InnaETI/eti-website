import { execFileSync } from 'child_process';
import { getStorageBackendInfo } from './content-store';

export type PublishCommit = {
  shortSha: string;
  author: string;
  date: string;
  subject: string;
};

export type PublishDiffSummary = {
  available: boolean;
  summary?: string;
  files: string[];
  error?: string;
};

function runGit(args: string[]) {
  return execFileSync('git', args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

export function getRecentPublishCommits(limit = 8): PublishCommit[] {
  try {
    const output = runGit([
      'log',
      '--pretty=format:%h%x1f%an%x1f%ad%x1f%s',
      '--date=short',
      `-n${limit}`,
      '--',
      'content',
      'public/uploads',
    ]);

    if (!output) return [];
    return output.split('\n').map((line) => {
      const [shortSha, author, date, subject] = line.split('\x1f');
      return { shortSha, author, date, subject };
    });
  } catch {
    return [];
  }
}

export function getPublishDiffSummary(): PublishDiffSummary {
  const backend = getStorageBackendInfo();
  const sourceBranch = backend.branch || 'staging';
  const targetBranch = backend.productionBranch || 'main';

  try {
    const summary = runGit([
      'diff',
      '--shortstat',
      `${targetBranch}...${sourceBranch}`,
      '--',
      'content',
      'public/uploads',
    ]);
    const filesOutput = runGit([
      'diff',
      '--name-only',
      `${targetBranch}...${sourceBranch}`,
      '--',
      'content',
      'public/uploads',
    ]);

    return {
      available: true,
      summary: summary || 'No content differences detected between staging and production branches.',
      files: filesOutput ? filesOutput.split('\n').filter(Boolean).slice(0, 20) : [],
    };
  } catch (error) {
    return {
      available: false,
      files: [],
      error: error instanceof Error ? error.message : 'Could not compare branches.',
    };
  }
}
