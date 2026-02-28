import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Replacement Finder | Auvolar Tools',
  description: 'Find the right LED replacement for your existing HID or fluorescent fixture.',
  alternates: { canonical: 'https://www.auvolar.com/tools/replacement-finder' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
