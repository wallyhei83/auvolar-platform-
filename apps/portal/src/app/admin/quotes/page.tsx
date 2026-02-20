import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminQuotesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: { select: { name: true, email: true, companyName: true } } },
    take: 50,
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: 'bg-gray-100 text-gray-800',
      SENT: 'bg-blue-100 text-blue-800',
      VIEWED: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      EXPIRED: 'bg-gray-100 text-gray-500',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600">Manage all customer quotes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold">{quotes.length}</p>
          <p className="text-sm text-gray-600">Total Quotes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-blue-600">{quotes.filter(q => q.status === 'SENT').length}</p>
          <p className="text-sm text-gray-600">Sent</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'ACCEPTED').length}</p>
          <p className="text-sm text-gray-600">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-yellow-600">{quotes.filter(q => q.status === 'DRAFT').length}</p>
          <p className="text-sm text-gray-600">Drafts</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {quotes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No quotes yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium">{quote.customer.name || quote.customer.email}</p>
                      <p className="text-xs text-gray-500">{quote.customer.companyName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">${quote.totalAmount?.toFixed(2) || '0.00'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
