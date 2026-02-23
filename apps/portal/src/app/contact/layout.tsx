import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Auvolar | Get a Quote for LED Lighting',
  description: 'Contact Auvolar for commercial LED lighting quotes, technical support, and product inquiries. Based in City of Industry, CA. Response within 4 business hours.',
  alternates: { canonical: 'https://www.auvolar.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
