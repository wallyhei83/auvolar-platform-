import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'crypto'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { searchParams } = request.nextUrl

  // --- Referral Tracking ---
  const ref = searchParams.get('ref')
  if (ref) {
    // Store referral code in cookie (90 days)
    response.cookies.set('auv_ref', ref, {
      maxAge: 90 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    // Store landing page
    response.cookies.set('auv_ref_landing', request.nextUrl.pathname, {
      maxAge: 90 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  // Ensure visitor has a tracking ID
  if (!request.cookies.get('auv_vid')) {
    response.cookies.set('auv_vid', crypto.randomBytes(8).toString('hex'), {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes that don't need tracking
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/(?!checkout|cart)).*)',
  ],
}
