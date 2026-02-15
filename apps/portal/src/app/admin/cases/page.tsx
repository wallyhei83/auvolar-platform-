import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminCasesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF' && user.role !== 'SUPER_ADMIN')) {
    redirect('/portal')
  }

  const cases = await prisma.case.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: {
        select: { name: true, email: true, companyName: true },
      },
      assignedTo: {
        select: { name: true, email: true },
      },
    },
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      RECEIVED: 'bg-blue-100 text-blue-800',
      IN_REVIEW: 'bg-yellow-100 text-yellow-800',
      NEED_INFO: 'bg-orange-100 text-orange-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      LOW: 'text-gray-600 bg-gray-100',
      NORMAL: 'text-blue-700 bg-blue-100',
      HIGH: 'text-orange-700 bg-orange-100',
      URGENT: 'text-red-700 bg-red-100',
    }
    return colors[priority] || 'text-gray-600 bg-gray-100'
  }

  const isOverdue = (slaDueAt: Date | null, status: string) => {
    if (!slaDueAt) return false
    if (status === 'COMPLETED' || status === 'CLOSED') return false
    return new Date(slaDueAt) < new Date()
  }

  // Group stats
  const statsByStatus = cases.reduce((acc: Record<string, number>, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
          <p className="text-gray-600">Manage all customer cases and support requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold">{cases.length}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-2xl font-bold text-blue-600">{statsByStatus['RECEIVED'] || 0}</p>
          <p className="text-sm text-gray-600">Received</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-2xl font-bold text-yellow-600">{statsByStatus['IN_REVIEW'] || 0}</p>
          <p className="text-sm text-gray-600">In Review</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <p className="text-2xl font-bold text-orange-600">{statsByStatus['NEED_INFO'] || 0}</p>
          <p className="text-sm text-gray-600">Need Info</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-2xl font-bold text-green-600">
            {(statsByStatus['COMPLETED'] || 0) + (statsByStatus['CLOSED'] || 0)}
          </p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {cases.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-4xl mb-4 block">📭</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases yet</h3>
            <p className="text-gray-600">Cases will appear here when customers create them</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cases.map((caseItem) => {
                  const overdue = isOverdue(caseItem.slaDueAt, caseItem.status)
                  return (
                    <tr key={caseItem.id} className={`hover:bg-gray-50 ${overdue ? 'bg-red-50' : ''}`}>
                      <td className="px-4 py-3">
                        <Link href={`/admin/cases/${caseItem.id}`} className="hover:text-[#FFD60A]">
                          <p className="font-medium text-gray-900 line-clamp-1">{caseItem.subject}</p>
                          <p className="text-xs text-gray-500">{caseItem.caseNumber}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{caseItem.customer?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{caseItem.customer?.companyName}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{caseItem.type.replace('_', ' ')}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {caseItem.assignedTo ? (
                          <span className="text-gray-900">{caseItem.assignedTo.name}</span>
                        ) : (
                          <span className="text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {caseItem.slaDueAt ? (
                          <span className={`text-xs ${overdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                            {overdue ? '⚠️ ' : ''}
                            {new Date(caseItem.slaDueAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(caseItem.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
