import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Lighting Services | Design, Installation Support | Auvolar',
  description: 'Auvolar offers photometric design, lighting layout, energy audits, rebate assistance, and technical support for commercial LED lighting projects.',
  alternates: { canonical: 'https://www.auvolar.com/services' },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
