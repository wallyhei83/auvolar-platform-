import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ISFSeriesClient } from './isf-series-client'

export const metadata: Metadata = {
  title: 'ISF Series LED Stadium Light | 400W-1800W | Auvolar',
  description: 'ISF Series professional LED stadium lights. 400W-1800W, 140+ lm/W, anti-glare optics, 5 beam angle options. DLC certified. 110 IES files available. Sports fields, arenas, large venues.',
  keywords: ['ISF series stadium light', 'LED stadium light', 'sports field LED', 'stadium flood light', '200W stadium light', '600W stadium light', '1200W stadium light', 'anti-glare sports lighting', 'DLC stadium light'],
  alternates: { canonical: 'https://www.auvolar.com/p/isf-series-led-stadium-light' },
  openGraph: {
    title: 'ISF Series LED Stadium Light | 200W-1200W | Auvolar',
    description: 'Professional LED stadium lights. 200W-1200W, 140+ lm/W, anti-glare optics. DLC certified.',
    type: 'website',
    url: 'https://www.auvolar.com/p/isf-series-led-stadium-light',
  },
}

export default function ISFSeriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ISFSeriesClient />
      <Footer />
    </div>
  )
}
