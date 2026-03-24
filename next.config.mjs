import path from 'path';
import { fileURLToPath } from 'url';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function nextConfig(phase) {
  return {
    outputFileTracingRoot: __dirname,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    trailingSlash: true,
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'www.emergingti.com', pathname: '/**' }],
    },
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        // Do NOT use a catch-all `/:path*` Cache-Control here: it matches `/_next/*` too and
        // can override the immutable rule (last match wins), forcing re-download of every chunk
        // and making dev/prod feel “frozen” or extremely slow.
      ];
    },
  };
}
