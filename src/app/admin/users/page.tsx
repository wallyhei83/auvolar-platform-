'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Plus, Pencil, Trash2, Users, Shield, UserCheck, Building2 } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string | null
  companyName: string | null
  phone: string | null
  role: string
  permissions?: string[]
  createdAt: string
  _count: { cases: number; quotes: number }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [deleteUser, setDeleteUser] = useState<User | null>(null)
  const [permUser, setPermUser] = useState<User | null>(null)
  const { toast } = useToast()

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users')
    if (res.ok) {
      setUsers(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      SUPER_ADMIN: 'bg-yellow-100 text-yellow-800',
      ADMIN: 'bg-red-100 text-red-800',
      STAFF: 'bg-purple-100 text-purple-800',
      CUSTOMER: 'bg-blue-100 text-blue-800',
      PARTNER: 'bg-green-100 text-green-800',
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  const stats = {
    total: users.length,
    customers: users.filter(u => u.role === 'CUSTOMER').length,
    staff: users.filter(u => ['STAFF', 'ADMIN', 'SUPER_ADMIN'].includes(u.role)).length,
    partners: users.filter(u => u.role === 'PARTNER').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage accounts and permissions</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={stats.total} />
        <StatCard icon={UserCheck} label="Customers" value={stats.customers} color="text-blue-600" />
        <StatCard icon={Shield} label="Staff/Admin" value={stats.staff} color="text-purple-600" />
        <StatCard icon={Building2} label="Partners" value={stats.partners} color="text-green-600" />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cases</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{user.name || 'No name'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.companyName || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      {(user.role === 'ADMIN' || user.role === 'STAFF') && (
                        <span className="ml-1 text-xs text-gray-400">
                          ({user.permissions?.length || 0} perms)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user._count.cases}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      {(user.role === 'ADMIN' || user.role === 'STAFF') && (
                        <Button variant="ghost" size="icon" onClick={() => setPermUser(user)} title="Manage Permissions">
                          <Shield className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setEditUser(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {user.role !== 'SUPER_ADMIN' && (
                        <Button variant="ghost" size="icon" onClick={() => setDeleteUser(user)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Dialog */}
      <CreateUserDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={() => { setShowCreate(false); fetchUsers(); toast({ title: 'User created' }) }}
      />

      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog
          user={editUser}
          open={!!editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => { setEditUser(null); fetchUsers(); toast({ title: 'User updated' }) }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteUser && (
        <DeleteUserDialog
          user={deleteUser}
          open={!!deleteUser}
          onClose={() => setDeleteUser(null)}
          onSuccess={() => { setDeleteUser(null); fetchUsers(); toast({ title: 'User deleted' }) }}
        />
      )}
      {permUser && (
        <PermissionsDialog
          user={permUser}
          open={!!permUser}
          onClose={() => setPermUser(null)}
          onSuccess={() => { setPermUser(null); fetchUsers(); toast({ title: 'Permissions updated' }) }}
        />
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color || 'text-gray-500'}`} />
        <div>
          <p className={`text-2xl font-bold ${color || ''}`}>{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  )
}

function CreateUserDialog({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ email: '', password: '', name: '', companyName: '', phone: '', role: 'CUSTOMER' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setForm({ email: '', password: '', name: '', companyName: '', phone: '', role: 'CUSTOMER' })
      onSuccess()
    } else {
      setError(data.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new account</DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
            </div>
            <div>
              <Label>Company</Label>
              <Input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} placeholder="ABC Electric" />
            </div>
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="user@company.com" />
          </div>
          <div>
            <Label>Password *</Label>
            <PasswordInput value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 8 characters" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" />
          </div>
          <div>
            <Label>Role</Label>
            <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="PARTNER">Partner</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditUserDialog({ user, open, onClose, onSuccess }: { user: User; open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: user.name || '', companyName: user.companyName || '', phone: user.phone || '', role: user.role, password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    const payload: Record<string, string> = { name: form.name, companyName: form.companyName, phone: form.phone, role: form.role }
    if (form.password) payload.password = form.password

    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) onSuccess()
    else setError(data.message)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
        <div className="grid gap-4">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label>Role</Label>
            <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="PARTNER">Partner</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>New Password (leave blank to keep)</Label>
            <PasswordInput value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUserDialog({ user, open, onClose, onSuccess }: { user: User; open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    setLoading(false)
    if (res.ok) onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{user.email}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Permission groups for quick assignment
const PERMISSION_GROUPS: Record<string, { label: string; permissions: string[] }> = {
  product_manager: {
    label: '🛒 Product Manager',
    permissions: ['products.view', 'products.edit', 'products.create', 'documents.view', 'documents.upload', 'documents.delete', 'cases.view', 'cases.manage'],
  },
  sales_manager: {
    label: '💰 Sales Manager',
    permissions: ['products.view', 'documents.view', 'orders.view', 'orders.manage', 'partners.view', 'partners.manage', 'commission.view', 'commission.manage', 'payouts.view', 'payouts.manage', 'analytics.view'],
  },
  support_agent: {
    label: '🎧 Support Agent',
    permissions: ['products.view', 'documents.view', 'orders.view', 'tickets.view', 'tickets.manage', 'cases.view'],
  },
  content_editor: {
    label: '✏️ Content Editor',
    permissions: ['products.view', 'products.edit', 'documents.view', 'documents.upload', 'cases.view', 'cases.manage'],
  },
  full_admin: {
    label: '👑 Full Admin',
    permissions: Object.keys(ALL_PERMISSIONS_MAP),
  },
}

const ALL_PERMISSIONS_MAP: Record<string, string> = {
  'products.view': 'View products',
  'products.edit': 'Edit products',
  'products.create': 'Create products',
  'products.delete': 'Delete products',
  'documents.view': 'View documents',
  'documents.upload': 'Upload documents',
  'documents.delete': 'Delete documents',
  'orders.view': 'View orders',
  'orders.manage': 'Manage orders',
  'partners.view': 'View partners',
  'partners.manage': 'Manage partners',
  'commission.view': 'View commission',
  'commission.manage': 'Edit commission rules',
  'payouts.view': 'View payouts',
  'payouts.manage': 'Process payouts',
  'users.view': 'View users',
  'users.manage': 'Manage users',
  'cases.view': 'View case studies',
  'cases.manage': 'Manage case studies',
  'tickets.view': 'View support tickets',
  'tickets.manage': 'Manage tickets',
  'analytics.view': 'View analytics',
  'settings.manage': 'Manage settings',
}

// Group permissions by category for display
const PERMISSION_CATEGORIES: Record<string, string[]> = {
  '📦 Products': ['products.view', 'products.edit', 'products.create', 'products.delete'],
  '📄 Documents': ['documents.view', 'documents.upload', 'documents.delete'],
  '🛍️ Orders': ['orders.view', 'orders.manage'],
  '🤝 Partners': ['partners.view', 'partners.manage'],
  '💰 Commission & Payouts': ['commission.view', 'commission.manage', 'payouts.view', 'payouts.manage'],
  '👥 Users': ['users.view', 'users.manage'],
  '📊 Case Studies': ['cases.view', 'cases.manage'],
  '🎫 Support': ['tickets.view', 'tickets.manage'],
  '⚙️ System': ['analytics.view', 'settings.manage'],
}

function PermissionsDialog({ user, open, onClose, onSuccess }: { user: User; open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [perms, setPerms] = useState<string[]>(user.permissions || [])
  const [saving, setSaving] = useState(false)

  const togglePerm = (p: string) => {
    setPerms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const applyGroup = (groupKey: string) => {
    const group = PERMISSION_GROUPS[groupKey]
    if (group) setPerms([...new Set([...group.permissions])])
  }

  const selectAll = () => setPerms(Object.keys(ALL_PERMISSIONS_MAP))
  const clearAll = () => setPerms([])

  const save = async () => {
    setSaving(true)
    const res = await fetch(`/api/admin/users/${user.id}/permissions`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions: perms }),
    })
    setSaving(false)
    if (res.ok) onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            <Shield className="inline h-5 w-5 mr-2 text-blue-500" />
            Permissions — {user.name || user.email}
          </DialogTitle>
          <DialogDescription>
            Set what this {user.role} account can access. SUPER_ADMIN always has full access.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Presets */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PERMISSION_GROUPS).map(([key, group]) => (
              <button
                key={key}
                onClick={() => applyGroup(key)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
              >
                {group.label}
              </button>
            ))}
            <button onClick={selectAll} className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              ✅ Select All
            </button>
            <button onClick={clearAll} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
              ❌ Clear All
            </button>
          </div>
        </div>

        {/* Permission Checkboxes by Category */}
        <div className="space-y-4">
          {Object.entries(PERMISSION_CATEGORIES).map(([category, permKeys]) => (
            <div key={category} className="rounded-lg border p-3">
              <div className="text-sm font-semibold mb-2">{category}</div>
              <div className="grid grid-cols-2 gap-2">
                {permKeys.map(p => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
                    <input
                      type="checkbox"
                      checked={perms.includes(p)}
                      onChange={() => togglePerm(p)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700">{ALL_PERMISSIONS_MAP[p] || p}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-xs text-gray-400">
          Selected: {perms.length} / {Object.keys(ALL_PERMISSIONS_MAP).length} permissions
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Permissions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
