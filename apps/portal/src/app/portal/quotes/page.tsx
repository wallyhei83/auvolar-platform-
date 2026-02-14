import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PortalQuotesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect('/login')
  }

  const quotes = await prisma.quote.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: 'bg-gray-100 text-gray-800',
      SENT: 'bg-blue-100 text-blue-800',
      VIEWED: 'bg-purple-100 text-purple-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      EXPIRED: 'bg-orange-100 text-orange-800',
      CONVERTED: 'bg-teal-100 text-teal-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const isExpired = (expiresAt: Date | null) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quotes</h1>
          <p className="text-gray-600">View and manage your price quotes</p>
        </div>
        <Link
          href="/tools/rfq"
          className="bg-[#FFD60A] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400"
        >
          Request Quote
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold">{quotes.length}</p>
          <p className="text-sm text-gray-600">Total Quotes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-blue-600">
            {quotes.filter(q => q.status === 'SENT' || q.status === 'VIEWED').length}
          </p>
          <p className="text-sm text-gray-600">Pending Review</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-green-600">
            {quotes.filter(q => q.status === 'ACCEPTED').length}
          </p>
          <p className="text-sm text-gray-600">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-gray-600">
            ${quotes.reduce((sum, q) => sum + q.totalAmount.toNumber(), 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Total Value</p>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-4xl mb-4 block">📋</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
            <p className="text-gray-600 mb-4">
              Request a quote to get custom pricing for your projects
            </p>
            <Link
              href="/tools/rfq"
              className="inline-block bg-[#FFD60A] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-400"
            >
              Request Quote
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {quotes.map((quote) => {
                const expired = isExpired(quote.expiresAt)
                return (
                  <tr key={quote.id} className={`hover:bg-gray-50 ${expired && quote.status === 'SENT' ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4">
                      <Link href={`/portal/quotes/${quote.id}`} className="font-medium text-gray-900 hover:text-[#FFD60A]">
                        {quote.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {quote.items.length} item{quote.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${quote.totalAmount.toNumber().toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {quote.expiresAt ? (
                        <span className={expired ? 'text-red-600' : 'text-gray-600'}>
                          {expired ? '⚠️ Expired ' : ''}
                          {new Date(quote.expiresAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
