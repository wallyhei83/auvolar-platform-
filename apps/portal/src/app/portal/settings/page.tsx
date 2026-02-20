'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Save, Key, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function PortalSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your profile and security</p>
      </div>

      {/* Profile */}
      <ProfileCard />

      {/* Change Password */}
      <PasswordCard />

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{session?.user?.email || '—'}</p>
            </div>
            <div>
              <p className="text-gray-500">Account Type</p>
              <p className="font-medium">{session?.user?.role || '—'}</p>
            </div>
            <div>
              <p className="text-gray-500">Company</p>
              <p className="font-medium">{session?.user?.companyName || '—'}</p>
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
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setCompanyName(session.user.companyName || '')
    }
  }, [session])

  const handleSave = async () => {
    setLoading(true)
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, companyName, phone }),
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
          <User className="h-5 w-5" /> Profile
        </CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company</Label>
            <Input value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
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
      toast({ title: 'Password changed successfully' })
      setCurrent('')
      setNewPw('')
      setConfirm('')
    } else {
      const data = await res.json()
      toast({ title: data.message || 'Failed to change password', variant: 'destructive' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" /> Change Password
        </CardTitle>
        <CardDescription>Keep your account secure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input type="password" value={current} onChange={e => setCurrent(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>New Password</Label>
            <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min 8 characters" />
          </div>
          <div>
            <Label>Confirm New Password</Label>
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
