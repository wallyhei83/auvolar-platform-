import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Auvolar',
  description: 'Auvolar privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.',
  alternates: { canonical: 'https://www.auvolar.com/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
