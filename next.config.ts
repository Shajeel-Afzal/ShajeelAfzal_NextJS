import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // Performance optimizations for Core Web Vitals
  images: {
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    // Minimize layout shift by providing explicit sizes
    minimumCacheTTL: 60,
    // Optimize for different device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow external image hosts for course placeholders
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shajeelafzal.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

  // Enable experimental features for performance
  experimental: {
    // Enable optimizePackageImports for better bundle splitting
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Disable optimizeCss temporarily due to critters module issue
    // optimizeCss: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle analyzer configuration for monitoring
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
          },
          magicui: {
            test: /[\\/]node_modules[\\/].*magicui.*[\\/]/,
            name: 'magicui',
            priority: 20,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
