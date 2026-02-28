import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Product Design | Auvolar Tools',
  description: 'Request custom LED fixture modifications for specialized projects. Custom wattages, CCT, mounting, and form factors.',
  alternates: { canonical: 'https://www.auvolar.com/tools/product-design' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
