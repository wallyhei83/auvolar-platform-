import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 图片优化增强
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn11.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.auvolar.com',
      },
      {
        protocol: 'https',
        hostname: 'auvolar.com',
      },
    ],
  },

  // 压缩优化
  compress: true,

  // 实验性功能
  experimental: {
    optimizeCss: true,
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // SEO 安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // 输出配置
  output: 'standalone',
}

export default nextConfig

