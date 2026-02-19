import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.auvolar.com'

  return {
    rules: [
      // Allow all crawlers to access public content
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/products/*',
          '/about',
          '/contact',
          '/services',
          '/resources',
          '/resources/*',
          '/applications',
          '/applications/*',
          '/locations',
          '/locations/*',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
          '/login',
          '/register',
          '/cart',
          '/checkout',
          '/_next',
          '/private',
        ],
      },
      // Special rules for AI crawlers (GPT, Claude, etc.)
      {
        userAgent: [
          'GPTBot',
          'Google-Extended', 
          'Claude-Web',
          'PerplexityBot',
          'ChatGPT-User',
        ],
        allow: [
          '/',
          '/products',
          '/products/*',
          '/about',
          '/resources',
          '/resources/*',
        ],
        disallow: [
          '/admin/*',
          '/api/*',
          '/cart',
          '/checkout',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
