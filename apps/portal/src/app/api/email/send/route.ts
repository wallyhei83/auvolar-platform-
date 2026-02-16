import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'sales@auvolar.com'

// Simple Resend API call without SDK
async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Auvolar <onboarding@resend.dev>',
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${error}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { type, data } = body

    let subject = ''
    let htmlContent = ''

    switch (type) {
      case 'contact':
        subject = `[Auvolar] New Contact Form: ${data.subject || 'General Inquiry'}`
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.subject || 'General Inquiry'}</td></tr>
          </table>
          <h3>Message</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
        `
        break

      case 'rfq':
        subject = `[Auvolar] New RFQ Request from ${data.company || data.name}`
        const itemsHtml = data.items?.map((item: { sku: string; quantity: number; notes?: string; description?: string }) => 
          `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.sku || '-'}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.description || '-'}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.notes || '-'}</td>
          </tr>`
        ).join('') || ''
        
        htmlContent = `
          <h2>New RFQ Request</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectName || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline || 'Not specified'}</td></tr>
          </table>
          <h3>Requested Items</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr style="background: #f0f0f0;">
              <th style="padding: 8px; border: 1px solid #ddd;">SKU</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Description</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Qty</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Notes</th>
            </tr>
            ${itemsHtml}
          </table>
          ${data.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.notes}</p>` : ''}
        `
        break

      case 'photometric':
        subject = `[Auvolar] Photometric Layout Request: ${data.projectName || 'New Project'}`
        htmlContent = `
          <h2>Photometric Layout Request</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectName || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Application Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.applicationType}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mounting Height</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.mountingHeight}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Target Light Level</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.targetLightLevel || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Dimensions</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.dimensions}</td></tr>
          </table>
          ${data.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.notes}</p>` : ''}
        `
        break

      case 'spec-package':
        subject = `[Auvolar] Spec Package Request: ${data.projectName || 'New Request'}`
        const productsHtml = data.products?.map((p: { sku: string; name: string }) => 
          `<li>${p.name} (${p.sku})</li>`
        ).join('') || ''
        const docsHtml = data.documents?.join(', ') || ''
        
        htmlContent = `
          <h2>Spec Package Request</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectName || 'Not provided'}</td></tr>
          </table>
          <h3>Products (${data.products?.length || 0})</h3>
          <ul>${productsHtml}</ul>
          <h3>Document Types</h3>
          <p>${docsHtml}</p>
        `
        break

      case 'bom-upload':
        subject = `[Auvolar] BOM Upload Request from ${data.company || data.name}`
        htmlContent = `
          <h2>BOM Upload Request</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectName || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>File Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.fileName || 'Not uploaded'}</td></tr>
          </table>
          ${data.notes ? `<h3>Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.notes}</p>` : ''}
          <p><em>Note: Customer was instructed to email BOM file to this address.</em></p>
        `
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    // Send email to sales team
    await sendEmail(CONTACT_EMAIL, subject, htmlContent, data.email)

    // Send confirmation email to customer
    if (data.email) {
      const confirmSubject = 'Thank you for contacting Auvolar'
      const confirmHtml = `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${data.name || 'there'},</p>
        <p>We've received your ${type === 'rfq' ? 'quote request' : type === 'photometric' ? 'photometric layout request' : 'message'} and will get back to you within 1 business day.</p>
        <p>If you have any urgent questions, please call us at <strong>1-888-555-0123</strong>.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Auvolar Team</strong></p>
        <p style="color: #666; font-size: 12px;">Light Done Right™</p>
      `
      await sendEmail(data.email, confirmSubject, confirmHtml)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
