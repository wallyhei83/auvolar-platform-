import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Order | Auvolar Tools',
  description: 'Fast ordering for contractors who know exactly what they need. Add products by SKU for rapid checkout.',
  alternates: { canonical: 'https://www.auvolar.com/tools/quick-order' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
