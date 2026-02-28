import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Order | Auvolar LED Lighting',
  description: 'Track your Auvolar LED lighting order status and shipping information. Enter your order number to get real-time updates.',
  alternates: { canonical: 'https://www.auvolar.com/track-order' },
}

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return children
}
