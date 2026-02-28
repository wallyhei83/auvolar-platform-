import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Auvolar',
  description: 'Auvolar terms of service. Read our terms and conditions for using our website, placing orders, and purchasing LED lighting products.',
  alternates: { canonical: 'https://www.auvolar.com/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
