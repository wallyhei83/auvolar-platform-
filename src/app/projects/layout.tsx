import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Lighting Projects & Case Studies | Auvolar',
  description: 'See real-world commercial LED lighting projects by Auvolar. Warehouse retrofits, parking lot upgrades, and industrial installations with energy savings data.',
  alternates: { canonical: 'https://www.auvolar.com/projects' },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
