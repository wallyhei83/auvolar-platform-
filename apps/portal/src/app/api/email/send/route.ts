import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
// Note: Resend free tier can only send to verified owner email
// Change this after verifying auvolar.com domain in Resend
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'wally@aabtecinc.com'

interface ProductItem {
  sku: string
  description: string
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type } = body

    let subject = ''
    let htmlContent = ''
    let customerEmail = body.email
    let customerName = body.name

    switch (type) {
      case 'contact':
        subject = `Contact Form: ${body.subject || 'General Inquiry'}`
        htmlContent = buildContactEmail(body)
        break

      case 'rfq':
        subject = `RFQ Request: ${body.projectName || 'Quote Request'}`
        htmlContent = buildRFQEmail(body)
        break

      case 'photometric':
        subject = `Photometric Request: ${body.projectName || 'Lighting Layout'}`
        htmlContent = buildPhotometricEmail(body)
        break

      case 'spec-package':
        subject = `Spec Package Request: ${body.projectName || 'Submittal Package'}`
        htmlContent = buildSpecPackageEmail(body)
        break

      case 'bom-upload':
        subject = `BOM Upload: ${body.projectName || 'Bill of Materials'}`
        htmlContent = buildBOMEmail(body)
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    // Send to sales team
    // Note: Using Resend's test domain until auvolar.com is verified
    const { error: salesError } = await resend.emails.send({
      from: 'Auvolar <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      subject: subject,
      html: htmlContent,
      replyTo: customerEmail,
    })

    if (salesError) {
      console.error('Failed to send sales email:', salesError)
      return NextResponse.json({ error: salesError.message }, { status: 500 })
    }

    // Send confirmation to customer
    // Note: Disabled until domain is verified (Resend free tier limitation)
    // if (customerEmail) {
    //   const confirmationHtml = buildConfirmationEmail(type, customerName, body)
    //   await resend.emails.send({
    //     from: 'Auvolar <onboarding@resend.dev>',
    //     to: [customerEmail],
    //     subject: `We received your ${getTypeLabel(type)} - Auvolar`,
    //     html: confirmationHtml,
    //   }).catch(err => {
    //     console.error('Failed to send confirmation email:', err)
    //   })
    // }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    contact: 'message',
    rfq: 'quote request',
    photometric: 'photometric request',
    'spec-package': 'spec package request',
    'bom-upload': 'BOM submission',
  }
  return labels[type] || 'request'
}

function buildContactEmail(body: { name: string; email: string; phone?: string; company?: string; subject?: string; message: string }): string {
  return `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
      ${body.phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone}</td></tr>` : ''}
      ${body.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.company}</td></tr>` : ''}
      ${body.subject ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.subject}</td></tr>` : ''}
    </table>
    <h3>Message:</h3>
    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${body.message}</p>
  `
}

function buildRFQEmail(body: { 
  name: string; email: string; phone?: string; company?: string;
  projectName?: string; projectAddress?: string; timeline?: string;
  products?: ProductItem[]; notes?: string 
}): string {
  const productsHtml = body.products?.map((p, i) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${i + 1}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${p.sku || 'N/A'}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${p.description || 'N/A'}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${p.quantity}</td>
    </tr>
  `).join('') || '<tr><td colspan="4">No products specified</td></tr>'

  return `
    <h2>New Quote Request (RFQ)</h2>
    
    <h3>Contact Information</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
      ${body.phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone}</td></tr>` : ''}
      ${body.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.company}</td></tr>` : ''}
    </table>

    <h3>Project Information</h3>
    <table style="border-collapse: collapse; width: 100%;">
      ${body.projectName ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.projectName}</td></tr>` : ''}
      ${body.projectAddress ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Address:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.projectAddress}</td></tr>` : ''}
      ${body.timeline ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.timeline}</td></tr>` : ''}
    </table>

    <h3>Products Requested</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr style="background: #f0f0f0;">
        <th style="padding: 8px; border: 1px solid #ddd;">#</th>
        <th style="padding: 8px; border: 1px solid #ddd;">SKU</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Description</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Qty</th>
      </tr>
      ${productsHtml}
    </table>

    ${body.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${body.notes}</p>` : ''}
  `
}

function buildPhotometricEmail(body: {
  name: string; email: string; phone?: string; company?: string;
  projectName?: string; spaceType?: string; dimensions?: string;
  mountingHeight?: string; targetFootcandles?: string; notes?: string
}): string {
  return `
    <h2>Photometric Layout Request</h2>
    
    <h3>Contact Information</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
      ${body.phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone}</td></tr>` : ''}
      ${body.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.company}</td></tr>` : ''}
    </table>

    <h3>Project Details</h3>
    <table style="border-collapse: collapse; width: 100%;">
      ${body.projectName ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.projectName}</td></tr>` : ''}
      ${body.spaceType ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Space Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.spaceType}</td></tr>` : ''}
      ${body.dimensions ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Dimensions:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.dimensions}</td></tr>` : ''}
      ${body.mountingHeight ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mounting Height:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.mountingHeight}</td></tr>` : ''}
      ${body.targetFootcandles ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Target Footcandles:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.targetFootcandles}</td></tr>` : ''}
    </table>

    ${body.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${body.notes}</p>` : ''}
  `
}

function buildSpecPackageEmail(body: {
  name: string; email: string; phone?: string; company?: string;
  projectName?: string; products?: string[]; includeIES?: boolean;
  includeCutSheets?: boolean; includeWarranty?: boolean; notes?: string
}): string {
  return `
    <h2>Spec Package Request</h2>
    
    <h3>Contact Information</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
      ${body.phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone}</td></tr>` : ''}
      ${body.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.company}</td></tr>` : ''}
    </table>

    <h3>Request Details</h3>
    <table style="border-collapse: collapse; width: 100%;">
      ${body.projectName ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.projectName}</td></tr>` : ''}
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Include IES Files:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.includeIES ? 'Yes' : 'No'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Include Cut Sheets:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.includeCutSheets ? 'Yes' : 'No'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Include Warranty:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.includeWarranty ? 'Yes' : 'No'}</td></tr>
    </table>

    ${body.products?.length ? `<h3>Products</h3><ul>${body.products.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
    ${body.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${body.notes}</p>` : ''}
  `
}

function buildBOMEmail(body: {
  name: string; email: string; phone?: string; company?: string;
  projectName?: string; bomContent?: string; notes?: string
}): string {
  return `
    <h2>BOM Upload Submission</h2>
    
    <h3>Contact Information</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
      ${body.phone ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone}</td></tr>` : ''}
      ${body.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${body.company}</td></tr>` : ''}
    </table>

    ${body.projectName ? `<p><strong>Project:</strong> ${body.projectName}</p>` : ''}
    ${body.bomContent ? `<h3>BOM Content</h3><pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">${body.bomContent}</pre>` : ''}
    ${body.notes ? `<h3>Additional Notes</h3><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${body.notes}</p>` : ''}
  `
}

function buildConfirmationEmail(type: string, name: string, body: Record<string, unknown>): string {
  const typeLabel = getTypeLabel(type)
  const projectName = body.projectName as string || ''
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FFD60A; padding: 20px; text-align: center; }
        .header h1 { margin: 0; color: #000; }
        .content { padding: 30px 20px; background: #fff; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f5f5f5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Auvolar</h1>
        </div>
        <div class="content">
          <h2>Thanks for your ${typeLabel}!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>We've received your ${typeLabel}${projectName ? ` for "${projectName}"` : ''} and our team will review it shortly.</p>
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will review your request within 1 business day</li>
            <li>We'll reach out via email with pricing or any follow-up questions</li>
            <li>For urgent requests, call us at 1-888-555-0123</li>
          </ul>
          <p>Thank you for choosing Auvolar!</p>
          <p>Best regards,<br>The Auvolar Team</p>
        </div>
        <div class="footer">
          <p>Auvolar - Light Done Right</p>
          <p>1-888-555-0123 | sales@auvolar.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}
