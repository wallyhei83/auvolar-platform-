'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Client-side referral tracking component.
 * Place in root layout. On page load with ?ref=XXX, sends tracking data to server.
 * Also stores ref in localStorage as backup for cookie.
 */
export function ReferralTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (!ref) return

    // Store in localStorage as backup
    localStorage.setItem('auv_ref', ref)
    localStorage.setItem('auv_ref_time', Date.now().toString())

    // Get or create visitor ID
    let vid = localStorage.getItem('auv_vid')
    if (!vid) {
      vid = crypto.randomUUID().replace(/-/g, '').substring(0, 16)
      localStorage.setItem('auv_vid', vid)
    }

    // Track the visit server-side
    fetch('/api/referral/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: ref,
        visitorId: vid,
        landingPage: window.location.pathname,
        utmSource: searchParams.get('utm_source'),
        utmMedium: searchParams.get('utm_medium'),
        utmCampaign: searchParams.get('utm_campaign'),
      }),
    }).catch(() => {}) // Fire and forget
  }, [searchParams])

  return null
}

/**
 * Get the current referral code from localStorage (for checkout/forms).
 */
export function getReferralCode(): string | null {
  if (typeof window === 'undefined') return null
  const ref = localStorage.getItem('auv_ref')
  const time = parseInt(localStorage.getItem('auv_ref_time') || '0')
  // Expire after 90 days
  if (ref && Date.now() - time < 90 * 24 * 60 * 60 * 1000) {
    return ref
  }
  return null
}
