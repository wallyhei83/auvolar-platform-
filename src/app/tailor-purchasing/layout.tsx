import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tailor Purchasing | Custom LED Lighting Orders | Auvolar',
  description: 'Submit custom LED lighting orders and OEM requests. Auvolar offers tailored purchasing solutions for contractors, distributors, and facility managers.',
  alternates: { canonical: 'https://www.auvolar.com/tailor-purchasing' },
}

export default function TailorPurchasingLayout({ children }: { children: React.ReactNode }) {
  return children
}
