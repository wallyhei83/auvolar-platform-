import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart | Auvolar LED Lighting',
  description: 'Review your selected LED lighting products and proceed to checkout. Wholesale pricing for contractors and distributors.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
