/**
 * HubSpot API integration for Auvolar
 * Syncs form submissions to HubSpot CRM as contacts
 */

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN
const HUBSPOT_API_BASE = 'https://api.hubapi.com'

interface HubSpotContactProps {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  jobtitle?: string
  // Custom properties
  lead_source?: string
  product_interest?: string
  project_name?: string
  notes?: string
}

/**
 * Create or update a contact in HubSpot CRM
 */
export async function upsertHubSpotContact(props: HubSpotContactProps): Promise<boolean> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('[HubSpot] No access token configured, skipping sync')
    return false
  }

  try {
    // Split name into first/last if only firstname provided
    let firstname = props.firstname || ''
    let lastname = props.lastname || ''
    if (firstname && !lastname && firstname.includes(' ')) {
      const parts = firstname.split(' ')
      firstname = parts[0]
      lastname = parts.slice(1).join(' ')
    }

    const properties: Record<string, string> = {
      email: props.email,
    }

    if (firstname) properties.firstname = firstname
    if (lastname) properties.lastname = lastname
    if (props.phone) properties.phone = props.phone
    if (props.company) properties.company = props.company
    if (props.jobtitle) properties.jobtitle = props.jobtitle
    if (props.lead_source) properties.hs_lead_status = props.lead_source
    if (props.notes) properties.message = props.notes

    // Try to create contact first
    const createRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    })

    if (createRes.ok) {
      console.log(`[HubSpot] Created contact: ${props.email}`)
      return true
    }

    // If contact already exists (409), update instead
    if (createRes.status === 409) {
      const updateRes = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${encodeURIComponent(props.email)}?idProperty=email`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties }),
        }
      )

      if (updateRes.ok) {
        console.log(`[HubSpot] Updated contact: ${props.email}`)
        return true
      }

      console.error(`[HubSpot] Failed to update contact: ${updateRes.status}`)
      return false
    }

    const errorBody = await createRes.text()
    console.error(`[HubSpot] Failed to create contact: ${createRes.status} ${errorBody}`)
    return false
  } catch (error) {
    console.error('[HubSpot] Error syncing contact:', error)
    return false
  }
}

/**
 * Submit a HubSpot form (non-API tracking, uses collected forms)
 * This method uses HubSpot's Forms API which doesn't require an access token
 */
export async function submitHubSpotForm(
  portalId: string,
  formGuid: string,
  fields: Record<string, string>,
  context?: { pageUri?: string; pageName?: string; hutk?: string }
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: Object.entries(fields).map(([name, value]) => ({ name, value })),
          context: {
            pageUri: context?.pageUri || 'https://www.auvolar.com',
            pageName: context?.pageName || 'Auvolar',
            hutk: context?.hutk,
          },
        }),
      }
    )

    return res.ok
  } catch (error) {
    console.error('[HubSpot] Form submission error:', error)
    return false
  }
}
