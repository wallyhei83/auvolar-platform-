import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop LED Lighting | Wholesale Prices | Auvolar',
  description: 'Shop commercial LED lighting at wholesale prices. DLC-certified high bays, wall packs, area lights, and more. Free shipping on orders over $500. Ships from California.',
  alternates: { canonical: 'https://www.auvolar.com/shop' },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
