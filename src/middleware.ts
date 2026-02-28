import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function generateId(): string {
  const arr = new Uint8Array(8)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { searchParams } = request.nextUrl

  // --- Referral Tracking ---
  const ref = searchParams.get('ref')
  if (ref) {
    response.cookies.set('auv_ref', ref, {
      maxAge: 90 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
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
    response.cookies.set('auv_vid', generateId(), {
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
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)',
  ],
}
