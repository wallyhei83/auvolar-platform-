import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'wally@auvolar.com' },
    update: {},
    create: {
      email: 'wally@auvolar.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      companyName: 'Auvolar',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'contractor@example.com' },
    update: {},
    create: {
      email: 'contractor@example.com',
      passwordHash: customerPassword,
      name: 'John Smith',
      companyName: 'Smith Electric LLC',
      phone: '(555) 123-4567',
      role: 'CUSTOMER',
    },
  })
  console.log('✅ Customer created:', customer.email)

  // Create sample cases
  const caseTypes = ['RFQ', 'BOM', 'RMA', 'SUPPORT'] as const
  const caseStatuses = ['RECEIVED', 'IN_REVIEW', 'NEED_INFO', 'COMPLETED'] as const

  for (let i = 0; i < 5; i++) {
    const caseType = caseTypes[i % caseTypes.length]
    const status = caseStatuses[i % caseStatuses.length]
    
    await prisma.case.create({
      data: {
        caseNumber: `CS-2024-${String(i + 1).padStart(5, '0')}`,
        type: caseType,
        status,
        customerId: customer.id,
        contactEmail: customer.email,
        companyName: customer.companyName,
        subject: `Sample ${caseType} Request #${i + 1}`,
        customerMessage: `This is a sample ${caseType.toLowerCase()} request for testing purposes.`,
        slaDueAt: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
        slaBreached: i === 0, // First case is breached for testing
        relatedSkus: ['HB-200W-5K', 'WP-50W-4K'],
      },
    })
  }
  console.log('✅ Sample cases created')

  // Create sample quotes
  for (let i = 0; i < 3; i++) {
    const statuses = ['DRAFT', 'SENT', 'ACCEPTED'] as const
    await prisma.quote.create({
      data: {
        quoteNumber: `QT-2024-${String(i + 1).padStart(5, '0')}`,
        customerId: customer.id,
        status: statuses[i],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        items: JSON.stringify([
          { sku: 'HB-200W-5K', name: '200W High Bay 5000K', qty: 20, unitPrice: 89.99, extPrice: 1799.80 },
          { sku: 'WP-50W-4K', name: '50W Wall Pack 4000K', qty: 10, unitPrice: 45.99, extPrice: 459.90 },
        ]),
        subtotal: 2259.70,
        discountAmount: 225.97,
        taxAmount: 142.36,
        totalAmount: 2176.09,
        shippingTerms: 'FOB Origin',
        leadTimeTerms: '3-5 business days',
        paymentTerms: 'Net 30',
        createdById: admin.id,
      },
    })
  }
  console.log('✅ Sample quotes created')

  // Create sample project
  await prisma.project.create({
    data: {
      projectName: 'Warehouse Retrofit - Building A',
      customerId: customer.id,
      siteAddress: '123 Industrial Blvd, Suite 100, Anytown, USA 12345',
      savedSkus: ['HB-200W-5K', 'HB-150W-5K', 'WP-50W-4K'],
      notes: 'Phase 1 of the warehouse lighting upgrade project.',
    },
  })
  console.log('✅ Sample project created')

  // Create sample product docs
  const productDocs = [
    { sku: 'HB-200W-5K', bcProductId: '111', docType: 'CUT_SHEET', title: '200W High Bay Cut Sheet', url: '/docs/hb-200w-5k-cut-sheet.pdf' },
    { sku: 'HB-200W-5K', bcProductId: '111', docType: 'IES', title: '200W High Bay IES File', url: '/docs/hb-200w-5k.ies' },
    { sku: 'HB-200W-5K', bcProductId: '111', docType: 'INSTALL_GUIDE', title: '200W High Bay Installation Guide', url: '/docs/hb-200w-5k-install.pdf' },
    { sku: 'WP-50W-4K', bcProductId: '112', docType: 'CUT_SHEET', title: '50W Wall Pack Cut Sheet', url: '/docs/wp-50w-4k-cut-sheet.pdf' },
    { sku: 'WP-50W-4K', bcProductId: '112', docType: 'IES', title: '50W Wall Pack IES File', url: '/docs/wp-50w-4k.ies' },
  ] as const

  for (const doc of productDocs) {
    await prisma.productDocAsset.create({
      data: {
        ...doc,
        version: '1.0',
      },
    })
  }
  console.log('✅ Sample product docs created')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
