import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spec Package Builder | Auvolar Tools',
  description: 'Build a complete specification package with cut sheets, IES files, and DLC certificates for your project.',
  alternates: { canonical: 'https://www.auvolar.com/tools/spec-package' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
