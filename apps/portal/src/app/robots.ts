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
          '/llms.txt',
          '/llms-full.txt',
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
          '/portal',
          '/portal/*',
        ],
      },
      // Explicitly welcome AI crawlers — give them full public access
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'Googlebot',
          'Claude-Web',
          'Anthropic-AI',
          'PerplexityBot',
          'Bytespider',
          'CCBot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'FacebookBot',
          'YouBot',
          'Applebot-Extended',
        ],
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
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin/*',
          '/api/*',
          '/cart',
          '/checkout',
          '/portal/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
