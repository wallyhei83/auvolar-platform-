import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/lib/cart-context'
import { ChatWidgetV2 } from '@/components/chat/chat-widget'
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/json-ld'
import Script from 'next/script'
import { HubSpotIdentify } from '@/components/hubspot-identify'
import { Suspense } from 'react'
import { ReferralTracker } from '@/components/ReferralTracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Auvolar - Commercial & Industrial LED Lighting | Wholesale Pricing',
    template: '%s | Auvolar LED Lighting',
  },
  description: 'Auvolar is a B2B LED lighting manufacturer in California. 125+ DLC-certified commercial fixtures: high bays, wall packs, area lights, troffers, LED tubes. Wholesale pricing for contractors. Ships in 24h.',
  keywords: [
    'LED lighting', 'commercial LED lighting', 'industrial LED lighting',
    'high bay lights', 'LED high bay', 'UFO high bay',
    'wall pack lights', 'LED wall pack',
    'area lights', 'shoebox lights', 'parking lot lights',
    'flood lights', 'LED flood light',
    'LED troffer', 'LED panel', 'flat panel LED',
    'LED tube T8', 'LED tube T5',
    'vapor tight light', 'strip light', 'wrap light',
    'LED downlight', 'canopy light', 'garage light',
    'bollard light', 'post top light', 'barn light',
    'solar street light', 'solar wall pack',
    'DLC certified lighting', 'contractor pricing', 'wholesale LED',
    'B2B lighting', 'commercial lighting distributor',
    'utility rebates LED', 'energy efficient lighting',
    'warehouse lighting', 'retail lighting', 'office lighting',
  ],
  other: {
    'google-site-verification': 'Qq-Q9kxfMTJRHUHc1Sd0ib6Tmhz55UGxPywxCQ4sI4E',
    'ai-content-declarations': 'none',
    'citation_title': 'Auvolar - Commercial & Industrial LED Lighting Manufacturer',
    'citation_author': 'Auvolar',
    'citation_public_url': 'https://www.auvolar.com',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.auvolar.com',
  },
  openGraph: {
    title: 'Auvolar - Commercial & Industrial LED Lighting | Wholesale Pricing',
    description: 'B2B LED lighting manufacturer. 125+ DLC-certified fixtures for contractors, electricians, and facility managers. Wholesale pricing, ships from California in 24h.',
    type: 'website',
    url: 'https://www.auvolar.com',
    siteName: 'Auvolar',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auvolar - Commercial LED Lighting | Wholesale Pricing',
    description: 'B2B LED lighting manufacturer. 125+ DLC-certified fixtures. Wholesale pricing for contractors.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C9CVHYEC74"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C9CVHYEC74', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'dimension1': 'user_type',
                'dimension2': 'product_category'
              }
            });
          `}
        </Script>
        {/* HubSpot Tracking Code */}
        <Script
          id="hs-script-loader"
          src="//js-na2.hs-scripts.com/245352215.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <SessionProvider>
          <CartProvider>
            <HubSpotIdentify />
            <Suspense fallback={null}><ReferralTracker /></Suspense>
            {children}
            <Toaster />
            <ChatWidgetV2 />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
