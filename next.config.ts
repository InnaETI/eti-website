import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.emergingti.com', pathname: '/**' }],
  },
};

export default nextConfig;
