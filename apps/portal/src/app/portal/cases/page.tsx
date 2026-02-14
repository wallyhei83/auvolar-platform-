import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Plus, Clock, AlertCircle, CheckCircle2, Search } from 'lucide-react'

export default async function CasesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) return null

  const cases = await db.case.findMany({
    where: { customerId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const statusIcon = (status: string, breached: boolean) => {
    if (breached) return <AlertCircle className="h-5 w-5 text-red-500" />
    switch (status) {
      case 'NEED_INFO': return <AlertCircle className="h-5 w-5 text-orange-500" />
      case 'COMPLETED': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'CLOSED': return <CheckCircle2 className="h-5 w-5 text-gray-400" />
      default: return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>
          <p className="mt-1 text-gray-600">Track your requests and support tickets</p>
        </div>
        <Link href="/tools/rfq" className="btn-primary btn-md">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Link>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases..."
            className="input pl-10"
          />
        </div>
        <select className="input w-auto">
          <option value="">All Types</option>
          <option value="RFQ">RFQ</option>
          <option value="BOM">BOM</option>
          <option value="RMA">RMA</option>
          <option value="SUPPORT">Support</option>
        </select>
        <select className="input w-auto">
          <option value="">All Status</option>
          <option value="RECEIVED">Received</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="NEED_INFO">Need Info</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Cases list */}
      {cases.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-500 mb-4">You don&apos;t have any cases yet.</p>
          <Link href="/tools/rfq" className="btn-primary btn-md">
            Submit Your First Request
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/portal/cases/${c.id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {statusIcon(c.status, c.slaBreached)}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{c.caseNumber}</p>
                    <span className="badge-gray text-xs">{c.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{c.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`status-${c.status.toLowerCase().replace('_', '-')}`}>
                  {c.status.replace('_', ' ')}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
