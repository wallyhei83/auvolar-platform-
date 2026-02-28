import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  // Get user with their cases and quotes
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cases: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      quotes: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  // Calculate stats
  const totalCases = user.cases.length
  const openCases = user.cases.filter(c => c.status !== 'CLOSED' && c.status !== 'COMPLETED').length
  const totalQuotes = user.quotes.length
  const pendingQuotes = user.quotes.filter(q => q.status === 'DRAFT' || q.status === 'SENT').length

  const stats = [
    { label: 'Total Cases', value: totalCases, color: 'bg-blue-500' },
    { label: 'Open Cases', value: openCases, color: 'bg-yellow-500' },
    { label: 'Total Quotes', value: totalQuotes, color: 'bg-green-500' },
    { label: 'Pending Quotes', value: pendingQuotes, color: 'bg-purple-500' },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      RECEIVED: 'bg-blue-100 text-blue-800',
      IN_REVIEW: 'bg-yellow-100 text-yellow-800',
      NEED_INFO: 'bg-orange-100 text-orange-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
      DRAFT: 'bg-gray-100 text-gray-800',
      SENT: 'bg-blue-100 text-blue-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      EXPIRED: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name || user.email}
        </h1>
        <p className="text-gray-600">
          {user.companyName && `${user.companyName} • `}
          Here&apos;s what&apos;s happening with your account
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/tools/rfq"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">📝</span>
            <span className="text-sm font-medium">Request Quote</span>
          </Link>
          <Link
            href="/portal/cases"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm font-medium">View Cases</span>
          </Link>
          <Link
            href="/portal/quotes"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm font-medium">View Quotes</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">🛒</span>
            <span className="text-sm font-medium">Browse Products</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Cases</h2>
            <Link href="/portal/cases" className="text-sm text-[#FFD60A] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {user.cases.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No cases yet. <Link href="/tools/rfq" className="text-[#FFD60A] hover:underline">Create your first request</Link>
              </div>
            ) : (
              user.cases.map((caseItem) => (
                <div key={caseItem.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{caseItem.subject}</p>
                      <p className="text-sm text-gray-500">
                        {caseItem.caseNumber} • {caseItem.type.replace('_', ' ')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Quotes</h2>
            <Link href="/portal/quotes" className="text-sm text-[#FFD60A] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {user.quotes.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No quotes yet. Quotes will appear here when created.
              </div>
            ) : (
              user.quotes.map((quote) => (
                <div key={quote.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{quote.quoteNumber}</p>
                      <p className="text-sm text-gray-500">
                        ${quote.totalAmount.toNumber().toLocaleString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
