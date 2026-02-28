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

    const spamUsers = customers.filter(u => {
      const name = u.name || ''
      const company = u.companyName || ''
      // Detect garbage: long string with no spaces and low vowel ratio
      const isGarbage = (s: string) => 
        s.length > 12 && !s.includes(' ') && 
        ((s.match(/[aeiouAEIOU]/g)?.length || 0) / s.length < 0.25)
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
