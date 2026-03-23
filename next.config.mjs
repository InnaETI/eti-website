import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
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

export default nextConfig;
