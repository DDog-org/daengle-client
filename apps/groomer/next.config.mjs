/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@daengle/services'],
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'date-fns': 'date-fns/esm',
    };
    return config;
  },
};

export default nextConfig;
