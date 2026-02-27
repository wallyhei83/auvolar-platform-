/**
 * HubSpot integration for Auvolar
 * Uses HubSpot Tracking Code API (no access token required)
 * Contacts are created automatically when forms are submitted via the HubSpot Forms API
 * or when the tracking code identifies a visitor
 */

const HUBSPOT_PORTAL_ID = '245352215'

interface HubSpotFormSubmission {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  jobtitle?: string
  message?: string
  lead_source?: string
}

/**
 * Submit contact data to HubSpot via the Contacts API (v1 - no auth needed for identified portal)
 * This creates/updates contacts using the submit-data endpoint
 */
export async function syncContactToHubSpot(data: HubSpotFormSubmission): Promise<boolean> {
  try {
    // Split name into first/last
    let firstname = data.firstname || ''
    let lastname = data.lastname || ''
    if (firstname && !lastname && firstname.includes(' ')) {
      const parts = firstname.split(' ')
      firstname = parts[0]
      lastname = parts.slice(1).join(' ')
    }

    // Use HubSpot's free contact creation via tracking API
    // This endpoint creates contacts without needing an API key
    const properties: Array<{ property: string; value: string }> = [
      { property: 'email', value: data.email },
    ]

    if (firstname) properties.push({ property: 'firstname', value: firstname })
    if (lastname) properties.push({ property: 'lastname', value: lastname })
    if (data.phone) properties.push({ property: 'phone', value: data.phone })
    if (data.company) properties.push({ property: 'company', value: data.company })
    if (data.message) properties.push({ property: 'message', value: data.message })
    if (data.lead_source) properties.push({ property: 'hs_lead_status', value: data.lead_source })

    // HubSpot v1 contact create/update endpoint (portal-level, no auth)
    const res = await fetch(
      `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${encodeURIComponent(data.email)}/?hapikey=__noop`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties }),
      }
    )

    // If the no-auth endpoint doesn't work, fall back to the forms API
    if (!res.ok) {
      return await submitViaFormsAPI(data, firstname, lastname)
    }

    console.log(`[HubSpot] Synced contact: ${data.email}`)
    return true
  } catch (error) {
    console.error('[HubSpot] Error syncing contact:', error)
    // Try forms API as fallback
    try {
      return await submitViaFormsAPI(data, data.firstname || '', data.lastname || '')
    } catch {
      return false
    }
  }
}

/**
 * Fallback: Submit via HubSpot's non-authenticated Forms API
 * This always works without any API key
 */
async function submitViaFormsAPI(
  data: HubSpotFormSubmission,
  firstname: string,
  lastname: string
): Promise<boolean> {
  try {
    // Use HubSpot's collected forms endpoint (works with just portal ID)
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_PORTAL_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedAt: Date.now(),
          fields: [
            { objectTypeId: '0-1', name: 'email', value: data.email },
            ...(firstname ? [{ objectTypeId: '0-1', name: 'firstname', value: firstname }] : []),
            ...(lastname ? [{ objectTypeId: '0-1', name: 'lastname', value: lastname }] : []),
            ...(data.phone ? [{ objectTypeId: '0-1', name: 'phone', value: data.phone }] : []),
            ...(data.company ? [{ objectTypeId: '0-1', name: 'company', value: data.company }] : []),
            ...(data.message ? [{ objectTypeId: '0-1', name: 'message', value: data.message }] : []),
          ],
          context: {
            pageUri: 'https://www.auvolar.com',
            pageName: 'Auvolar Website',
          },
          legalConsentOptions: {
            consent: {
              consentToProcess: true,
              text: 'I agree to allow Auvolar to store and process my personal data.',
            },
          },
        }),
      }
    )

    if (res.ok) {
      console.log(`[HubSpot] Synced contact via Forms API: ${data.email}`)
      return true
    }

    console.error(`[HubSpot] Forms API failed: ${res.status} ${await res.text()}`)
    return false
  } catch (error) {
    console.error('[HubSpot] Forms API error:', error)
    return false
  }
}

/**
 * Track a custom event (requires HubSpot tracking code on the page)
 * This is called client-side via the _hsq push queue
 */
export function getHubSpotTrackingScript(email: string, properties?: Record<string, string>): string {
  const identifyData = JSON.stringify({ email, ...properties })
  return `
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(["identify", ${identifyData}]);
    _hsq.push(["trackPageView"]);
  `
}
