import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST - Track a referral visit (called from client-side on page load with ref param)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralCode, visitorId, landingPage, utmSource, utmMedium, utmCampaign } = body

    if (!referralCode || !visitorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify referral code exists and partner is approved
    const partner = await prisma.partner.findUnique({
      where: { referralCode },
      select: { id: true, status: true },
    })
    if (!partner || partner.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }

    // Create visit record
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 'unknown'

    await prisma.referralVisit.create({
      data: {
        referralCode,
        visitorId,
        ipAddress: ip,
        userAgent: request.headers.get('user-agent')?.substring(0, 500),
        landingPage,
        utmSource,
        utmMedium,
        utmCampaign,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Referral track error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
