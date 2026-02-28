import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Auvolar',
  description: 'The page you are looking for could not be found. Browse our commercial LED lighting products or contact our team for assistance.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          <p className="text-6xl font-bold text-brand">404</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="mt-4 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
