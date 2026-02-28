import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Auvolar Tools',
    default: 'Free LED Lighting Tools | Calculator, Rebate Finder, ROI | Auvolar',
  },
  description: 'Free LED lighting tools: replacement finder, ROI calculator, rebate finder, BOM upload, photometric request, and more. Designed for contractors and facility managers.',
  alternates: { canonical: 'https://www.auvolar.com/tools' },
}

const toolsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Auvolar Free LED Lighting Tools',
  url: 'https://www.auvolar.com/tools',
  description: 'Free professional tools for LED lighting projects: fixture replacement finder, ROI calculator, utility rebate lookup, BOM upload for bulk quoting, and photometric design requests.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'LED Lighting Tools',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'LED Replacement Finder',
          url: 'https://www.auvolar.com/tools/replacement',
          description: 'Find LED replacements for existing HID, fluorescent, or metal halide fixtures. Enter your current fixture type and get matching LED options with energy savings calculations.',
          applicationCategory: 'UtilityApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          operatingSystem: 'Web browser',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'LED ROI Calculator',
          url: 'https://www.auvolar.com/tools/roi-calculator',
          description: 'Calculate return on investment for LED lighting upgrades. Input current fixtures, energy costs, and rebates to see payback period and lifetime savings.',
          applicationCategory: 'FinanceApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Utility Rebate Finder',
          url: 'https://www.auvolar.com/tools/rebate-finder',
          description: 'Look up available utility rebates for LED lighting in your area. Search by state, utility company, or fixture type to find DLC rebate programs.',
          applicationCategory: 'UtilityApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'SoftwareApplication',
          name: 'LightSpec AI',
          url: 'https://www.auvolar.com/tools/lightspec-ai',
          description: 'AI-powered lighting specification tool. Describe your project and get instant fixture recommendations with quantities, spacing, and estimated costs.',
          applicationCategory: 'UtilityApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'SoftwareApplication',
          name: 'BOM Upload Tool',
          url: 'https://www.auvolar.com/tools/bom-upload',
          description: 'Upload your Bill of Materials (BOM) spreadsheet for instant bulk quoting. Supports Excel and CSV formats. Get volume pricing within 24 hours.',
          applicationCategory: 'BusinessApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Lighting Calculator',
          url: 'https://www.auvolar.com/tools/lighting-calculator',
          description: 'Calculate how many LED fixtures you need for your space. Input room dimensions and get recommended fixture count, spacing, and wattage.',
          applicationCategory: 'UtilityApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
    ],
  },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />
      {children}
    </>
  )
}
