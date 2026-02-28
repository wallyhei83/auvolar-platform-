'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

declare global {
  interface Window {
    _hsq?: Array<[string, ...unknown[]]>
  }
}

/**
 * HubSpot Identify component
 * When a user is logged in, identifies them to HubSpot tracking
 * so their browsing history is linked to their contact record
 */
export function HubSpotIdentify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      const _hsq = (window._hsq = window._hsq || [])
      _hsq.push([
        'identify',
        {
          email: session.user.email,
          ...(session.user.name ? { firstname: session.user.name } : {}),
        },
      ])
      _hsq.push(['trackPageView'])
    }
  }, [session?.user?.email, session?.user?.name])

  return null
}
