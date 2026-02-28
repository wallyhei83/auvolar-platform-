import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photometric Simulation | Auvolar Tools',
  description: 'Interactive 3D photometric lighting simulation. Visualize light distribution and foot-candle levels in your space.',
  alternates: { canonical: 'https://www.auvolar.com/tools/photometric-simulation' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
