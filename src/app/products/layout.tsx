import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial LED Lighting Products | DLC Certified | Auvolar',
  description: 'Browse 125+ DLC-certified commercial LED fixtures: high bays, wall packs, area lights, flood lights, troffers, LED tubes, and more. Wholesale pricing for contractors.',
  alternates: { canonical: 'https://www.auvolar.com/products' },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    }>
      {children}
    </Suspense>
  )
}
