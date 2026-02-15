import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/lib/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Auvolar - Light Done Right',
    template: '%s | Auvolar',
  },
  description: 'Commercial LED lighting solutions for contractors and businesses. Quality products, competitive pricing, expert support.',
  keywords: ['LED lighting', 'commercial lighting', 'high bay', 'wall pack', 'contractor pricing', 'B2B lighting'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
