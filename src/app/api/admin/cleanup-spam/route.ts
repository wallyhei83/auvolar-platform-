import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/admin/cleanup-spam - Delete spam bot registrations
// Protected by NEXTAUTH_SECRET header
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret')
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find users with garbage names (random chars, no spaces, long strings)
    const customers = await db.user.findMany({
      where: { role: 'CUSTOMER' },
      select: { id: true, name: true, email: true, companyName: true, createdAt: true },
    })

    // If action=list, just return all customers for inspection
    const action = request.headers.get('x-action')
    if (action === 'list') {
      return NextResponse.json({ customers })
    }

    const spamUsers = customers.filter(u => {
      const name = u.name || ''
      const company = u.companyName || ''
      // Detect garbage: long no-space string OR excessive case mixing
      const isGarbage = (s: string) => {
        if (s.length < 8) return false
        const noSpaces = !s.includes(' ')
        const lowVowel = ((s.match(/[aeiouAEIOU]/g)?.length || 0) / s.length) < 0.3
        const caseMix = s.length > 10 && (s.split('').filter((c, i) => 
          i > 0 && c !== c.toLowerCase() && s[i-1] === s[i-1].toLowerCase()
        ).length / s.length) > 0.3
        return (noSpaces && lowVowel) || caseMix
      }
      return isGarbage(name) || isGarbage(company)
    })

    if (spamUsers.length === 0) {
      return NextResponse.json({ message: 'No spam users found', deleted: 0 })
    }

    // Delete spam users
    const ids = spamUsers.map(u => u.id)
    await db.user.deleteMany({ where: { id: { in: ids } } })

    return NextResponse.json({
      message: `Deleted ${spamUsers.length} spam users`,
      deleted: spamUsers.length,
      users: spamUsers.map(u => ({ name: u.name, email: u.email })),
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
