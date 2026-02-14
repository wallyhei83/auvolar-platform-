import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { FileText, Clock, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default async function QuotesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) return null

  const quotes = await db.quote.findMany({
    where: { customerId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const statusBadge = (status: string) => {
    const classes: Record<string, string> = {
      DRAFT: 'badge-gray',
      SENT: 'badge-yellow',
      ACCEPTED: 'badge-green',
      EXPIRED: 'badge-red',
      CANCELLED: 'badge-gray',
    }
    return classes[status] || 'badge-gray'
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Quotes</h1>
        <p className="mt-1 text-gray-600">View and manage your quotes</p>
      </div>

      {quotes.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />
          <p className="text-gray-500 mt-4 mb-4">You don&apos;t have any quotes yet.</p>
          <Link href="/tools/rfq" className="btn-primary btn-md">
            Request a Quote
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {quotes.map((q) => {
            const isExpired = new Date(q.validUntil) < new Date() && q.status === 'SENT'
            const daysUntilExpiry = Math.ceil(
              (new Date(q.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )

            return (
              <Link
                key={q.id}
                href={`/portal/quotes/${q.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {q.status === 'ACCEPTED' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{q.quoteNumber}</p>
                      {q.version > 1 && (
                        <span className="text-xs text-gray-500">v{q.version}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {isExpired ? (
                        <span className="text-red-600">Expired</span>
                      ) : q.status === 'SENT' ? (
                        `Valid for ${daysUntilExpiry} days`
                      ) : (
                        `Created ${new Date(q.createdAt).toLocaleDateString()}`
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(Number(q.totalAmount))}
                  </p>
                  <span className={statusBadge(isExpired ? 'EXPIRED' : q.status)}>
                    {isExpired ? 'EXPIRED' : q.status}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
