import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { INSSeriesClient } from './ins-series-client'

export const metadata: Metadata = {
  title: 'INS Series LED Stadium Light | 300W-1800W | Auvolar',
  description: 'INS Series industrial grade LED stadium lights. 300W-1800W, 150 lm/W, asymmetric optics, IP67 rated. DLC certified. For professional stadiums, ports, and industrial yards.',
  keywords: ['INS series stadium light', 'industrial LED stadium light', '1800W LED light', 'high mast LED', 'port lighting LED', 'stadium lighting 1000W', 'DLC stadium light', 'asymmetric stadium light'],
  alternates: { canonical: 'https://www.auvolar.com/p/ins-series-led-stadium-light' },
  openGraph: {
    title: 'INS Series LED Stadium Light | 300W-1800W | Auvolar',
    description: 'Industrial grade LED stadium lights. 300W-1800W, 150 lm/W, IP67 rated. DLC certified.',
    type: 'website',
    url: 'https://www.auvolar.com/p/ins-series-led-stadium-light',
  },
}

export default function INSSeriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <INSSeriesClient />
      <Footer />
    </div>
  )
}
