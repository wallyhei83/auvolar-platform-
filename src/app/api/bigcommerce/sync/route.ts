import { NextResponse } from 'next/server'
import { 
  syncProductToBigCommerce, 
  getCategories, 
  createCategory,
  type BCCategory 
} from '@/lib/bigcommerce'
import { products } from '@/lib/product-data'

// Category mapping for BigCommerce
const categoryStructure = {
  'Indoor Lighting': {
    subcategories: ['High Bay Lights', 'Troffers & Panels', 'LED Tubes', 'Strip Lights', 'Vapor Tight', 'Downlights', 'Garage Lights', 'Wrap Fixtures']
  },
  'Outdoor Lighting': {
    subcategories: ['Area Lights', 'Flood Lights', 'Wall Packs', 'Canopy Lights', 'Bollard Lights', 'Post Top Lights']
  },
  'Solar Lighting': {
    subcategories: ['Solar Street Lights', 'Solar Flood Lights', 'Solar Garden Lights']
  },
  'Retrofit Solutions': {
    subcategories: ['LED Tubes', 'Retrofit Kits', 'Corn Bulbs', 'PL Lamps']
  },
  'Lighting Controls': {
    subcategories: ['Occupancy Sensors', 'Photocells', 'Dimmers', 'Smart Controls']
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { action = 'sync-all', sku } = body

    // Get existing categories from BigCommerce
    const existingCategories = await getCategories({ limit: 250 })
    const categoryMap = new Map<string, number>()
    
    for (const cat of existingCategories.data) {
      categoryMap.set(cat.name, cat.id)
    }

    // Create categories if they don't exist
    if (action === 'setup-categories' || action === 'sync-all') {
      for (const [parentName, config] of Object.entries(categoryStructure)) {
        // Create parent category if needed
        if (!categoryMap.has(parentName)) {
          const newCat = await createCategory({
            name: parentName,
            parent_id: 0,
            is_visible: true,
          })
          categoryMap.set(parentName, newCat.data.id)
        }
        
        const parentId = categoryMap.get(parentName)!
        
        // Create subcategories
        for (const subName of config.subcategories) {
          const fullName = `${parentName} > ${subName}`
          if (!categoryMap.has(subName) && !categoryMap.has(fullName)) {
            try {
              const newSubCat = await createCategory({
                name: subName,
                parent_id: parentId,
                is_visible: true,
              })
              categoryMap.set(subName, newSubCat.data.id)
            } catch (e) {
              // Category might already exist
              console.log(`Category ${subName} might already exist`)
            }
          }
        }
      }
    }

    // Sync products
    const results: { sku: string; success: boolean; error?: string; productId?: number }[] = []
    
    const productsToSync = sku 
      ? [products[sku]].filter(Boolean)
      : Object.values(products)
    
    for (const product of productsToSync) {
      try {
        // Get category IDs
        const categoryIds: number[] = []
        
        // Add parent category
        if (categoryMap.has(product.category)) {
          categoryIds.push(categoryMap.get(product.category)!)
        }
        
        // Add subcategory
        if (categoryMap.has(product.subcategory)) {
          categoryIds.push(categoryMap.get(product.subcategory)!)
        }

        // Build custom fields for certifications, specs, etc.
        const customFields: { name: string; value: string }[] = []
        
        // Add certifications
        if (product.certifications) {
          for (const cert of product.certifications) {
            customFields.push({
              name: `Certification: ${cert.name}`,
              value: cert.number || (cert.verified ? 'Yes' : 'No'),
            })
          }
        }
        
        // Add key specs
        if (product.quickSpecs) {
          for (const spec of product.quickSpecs) {
            customFields.push({
              name: spec.label,
              value: spec.value,
            })
          }
        }
        
        // Add warranty
        if (product.warranty) {
          customFields.push({
            name: 'Warranty',
            value: `${product.warranty.years} Year ${product.warranty.type}`,
          })
        }

        // Sync to BigCommerce
        const bcProduct = await syncProductToBigCommerce({
          sku: product.sku,
          name: product.name,
          price: product.price,
          description: `
            <p>${product.description}</p>
            <h3>Key Features</h3>
            <ul>
              ${product.quickSpecs?.map(s => `<li><strong>${s.label}:</strong> ${s.value}</li>`).join('') || ''}
            </ul>
            ${product.replaces ? `
              <h3>Replaces</h3>
              <ul>
                ${product.replaces.map(r => `<li>${r}</li>`).join('')}
              </ul>
            ` : ''}
          `.trim(),
          categories: categoryIds,
          weight: 5, // Default weight in lbs
          inventory_level: product.stockQty,
          custom_fields: customFields.slice(0, 250), // BigCommerce limit
        })
        
        results.push({
          sku: product.sku,
          success: true,
          productId: bcProduct.id,
        })
      } catch (error) {
        results.push({
          sku: product.sku,
          success: false,
          error: String(error),
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Synced ${successCount} products, ${failCount} failed`,
      categories: Array.from(categoryMap.entries()).map(([name, id]) => ({ name, id })),
      results,
    })
  } catch (error) {
    console.error('BigCommerce sync error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'BigCommerce Product Sync API',
    usage: {
      'POST /api/bigcommerce/sync': {
        description: 'Sync products to BigCommerce',
        body: {
          action: 'sync-all | setup-categories',
          sku: 'optional - sync single product by SKU',
        },
      },
    },
    total_products_available: Object.keys(products).length,
  })
}
