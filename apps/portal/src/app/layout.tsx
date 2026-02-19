import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/lib/cart-context'
import { ChatWidget } from '@/components/chat/chat-widget'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Auvolar - Light Done Right',
    template: '%s | Auvolar',
  },
  description: 'Commercial LED lighting solutions for contractors and businesses. Quality products, competitive pricing, expert support.',
  keywords: ['LED lighting', 'commercial lighting', 'high bay', 'wall pack', 'contractor pricing', 'B2B lighting'],
  other: {
    'google-site-verification': 'Qq-Q9kxfMTJRHUHc1Sd0ib6Tmhz55UGxPywxCQ4sI4E'
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Auvolar - Commercial LED Lighting Solutions',
    description: 'Quality LED lighting for contractors, electricians, and facility managers. DLC certified, competitive pricing, expert support.',
    type: 'website',
    url: 'https://www.auvolar.com',
  }
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
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
            {children}
            <Toaster />
            <ChatWidget />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
