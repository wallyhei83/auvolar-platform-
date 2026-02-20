'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Save, Key, Building2, Mail } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function AdminSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage system configuration</p>
      </div>

      {/* Profile */}
      <ProfileCard />

      {/* Change Password */}
      <PasswordCard />

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Company Information
          </CardTitle>
          <CardDescription>Platform branding and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input defaultValue="Auvolar" disabled />
            </div>
            <div>
              <Label>Support Email</Label>
              <Input defaultValue="support@auvolar.com" disabled />
            </div>
          </div>
          <p className="text-sm text-gray-500">Contact your SUPER_ADMIN to modify company settings.</p>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Platform</p>
              <p className="font-medium">Auvolar Portal</p>
            </div>
            <div>
              <p className="text-gray-500">Framework</p>
              <p className="font-medium">Next.js 15</p>
            </div>
            <div>
              <p className="text-gray-500">Database</p>
              <p className="font-medium">Neon PostgreSQL</p>
            </div>
            <div>
              <p className="text-gray-500">Your Role</p>
              <p className="font-medium">{session?.user?.role || '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileCard() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
    }
  }, [session])

  const handleSave = async () => {
    setLoading(true)
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    })
    setLoading(false)
    if (res.ok) {
      toast({ title: 'Profile updated' })
    } else {
      toast({ title: 'Failed to update', variant: 'destructive' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" /> Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input value={session?.user?.email || ''} disabled />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Profile
        </Button>
      </CardContent>
    </Card>
  )
}

function PasswordCard() {
  const { toast } = useToast()
  const [current, setCurrent] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = async () => {
    if (newPw !== confirm) {
      toast({ title: 'Passwords do not match', variant: 'destructive' })
      return
    }
    if (newPw.length < 8) {
      toast({ title: 'Password must be at least 8 characters', variant: 'destructive' })
      return
    }
    setLoading(true)
    const res = await fetch('/api/user/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: current, newPassword: newPw }),
    })
    setLoading(false)
    if (res.ok) {
      toast({ title: 'Password changed' })
      setCurrent('')
      setNewPw('')
      setConfirm('')
    } else {
      const data = await res.json()
      toast({ title: data.message || 'Failed', variant: 'destructive' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" /> Change Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input type="password" value={current} onChange={e => setCurrent(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>New Password</Label>
            <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} />
          </div>
          <div>
            <Label>Confirm</Label>
            <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
        </div>
        <Button onClick={handleChange} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Key className="mr-2 h-4 w-4" />}
          Change Password
        </Button>
      </CardContent>
    </Card>
  )
}
