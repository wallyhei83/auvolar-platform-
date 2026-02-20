import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function AdminTaxExemptPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const documents = await prisma.taxExemptDocument.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: { select: { name: true, email: true, companyName: true } } },
    take: 50,
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      EXPIRED: 'bg-gray-100 text-gray-500',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tax Exempt Documents</h1>
        <p className="text-gray-600">Review and manage tax exemption certificates</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold">{documents.length}</p>
          <p className="text-sm text-gray-600">Total Documents</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.status === 'PENDING').length}</p>
          <p className="text-sm text-gray-600">Pending Review</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-green-600">{documents.filter(d => d.status === 'APPROVED').length}</p>
          <p className="text-sm text-gray-600">Approved</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-red-600">{documents.filter(d => d.status === 'REJECTED').length}</p>
          <p className="text-sm text-gray-600">Rejected</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {documents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No tax exempt documents submitted yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium">{doc.customer.name || doc.customer.email}</p>
                      <p className="text-xs text-gray-500">{doc.customer.companyName}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{doc.state}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {doc.expiresAt ? new Date(doc.expiresAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(doc.createdAt).toLocaleDateString()}</td>
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
