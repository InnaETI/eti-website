import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.emergingti.com', pathname: '/**' }],
  },
};

export default nextConfig;
