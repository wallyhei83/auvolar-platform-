import Link from 'next/link'
import { db } from '@/lib/db'
import { 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'

export default async function AdminCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; type?: string; status?: string }>
}) {
  const params = await searchParams
  const filter = params.filter
  const typeFilter = params.type
  const statusFilter = params.status

  // Build where clause
  const where: Record<string, unknown> = {}
  
  if (filter === 'breached') {
    where.slaBreached = true
    where.status = { notIn: ['COMPLETED', 'CLOSED'] }
  } else if (filter === 'need-info') {
    where.status = 'NEED_INFO'
  }
  
  if (typeFilter) where.type = typeFilter
  if (statusFilter) where.status = statusFilter

  const cases = await db.case.findMany({
    where,
    orderBy: [
      { slaBreached: 'desc' },
      { slaDueAt: 'asc' },
    ],
    include: {
      customer: true,
      assignedTo: true,
      _count: { select: { messages: true, attachments: true } },
    },
  })

  const stats = await db.case.groupBy({
    by: ['status'],
    _count: true,
  })

  const statusCounts = stats.reduce((acc, s) => {
    acc[s.status] = s._count
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
          <p className="mt-1 text-gray-600">Manage customer requests and support tickets</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-5">
        {[
          { label: 'Received', status: 'RECEIVED', color: 'blue' },
          { label: 'In Review', status: 'IN_REVIEW', color: 'yellow' },
          { label: 'Need Info', status: 'NEED_INFO', color: 'orange' },
          { label: 'Completed', status: 'COMPLETED', color: 'green' },
          { label: 'Closed', status: 'CLOSED', color: 'gray' },
        ].map(({ label, status, color }) => (
          <Link
            key={status}
            href={`/admin/cases?status=${status}`}
            className={`card p-4 text-center hover:shadow-md transition-shadow ${
              statusFilter === status ? 'ring-2 ring-brand' : ''
            }`}
          >
            <p className="text-2xl font-bold text-gray-900">{statusCounts[status] || 0}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </Link>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by case number, customer, or subject..."
            className="input pl-10"
          />
        </div>
        <select className="input w-auto" defaultValue={typeFilter || ''}>
          <option value="">All Types</option>
          <option value="RFQ">RFQ</option>
          <option value="BOM">BOM</option>
          <option value="RMA">RMA</option>
          <option value="SHIPPING_DAMAGE">Shipping Damage</option>
          <option value="PHOTOMETRIC">Photometric</option>
          <option value="REBATE">Rebate</option>
          <option value="NET_TERMS">Net Terms</option>
          <option value="SUPPORT">Support</option>
        </select>
        <Link
          href="/admin/cases?filter=breached"
          className={`btn ${filter === 'breached' ? 'btn-primary' : 'btn-outline'} btn-md`}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          SLA Breached
        </Link>
      </div>

      {/* Cases Table */}
      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Status</th>
              <th>SLA</th>
              <th>Assigned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No cases found
                </td>
              </tr>
            ) : (
              cases.map((c) => {
                const slaDate = new Date(c.slaDueAt)
                const isOverdue = slaDate < new Date() && !['COMPLETED', 'CLOSED'].includes(c.status)
                const hoursLeft = Math.round((slaDate.getTime() - Date.now()) / (1000 * 60 * 60))

                return (
                  <tr key={c.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{c.caseNumber}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{c.subject}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{c.customer.companyName || c.customer.name}</p>
                        <p className="text-sm text-gray-500">{c.customer.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className="badge-gray">{c.type}</span>
                    </td>
                    <td>
                      <span className={`status-${c.status.toLowerCase().replace('_', '-')}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {c.slaBreached || isOverdue ? (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        ) : hoursLeft < 4 ? (
                          <Clock className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm ${c.slaBreached || isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {c.slaBreached || isOverdue ? 'Overdue' : `${hoursLeft}h left`}
                        </span>
                      </div>
                    </td>
                    <td>
                      {c.assignedTo ? (
                        <span className="text-sm text-gray-900">{c.assignedTo.name}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/admin/cases/${c.id}`}
                        className="btn-ghost btn-sm"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
