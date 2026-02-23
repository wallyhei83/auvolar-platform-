// Server-side BigCommerce product fetching for static generation
// Used by /p/[slug] pages for SEO

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

export interface BCProductFull {
  id: number
  name: string
  sku: string
  slug: string // from custom_url
  price: number
  salePrice: number
  retailPrice: number
  description: string
  categories: number[]
  inventoryLevel: number
  availability: string
  weight: number
  condition: string
  metaKeywords: string[]
  metaDescription: string
  searchKeywords: string
  isVisible: boolean
  dateCreated: string
  images: {
    url: string
    thumbnail: string
    zoom: string
    isPrimary: boolean
    sortOrder: number
  }[]
  variants: {
    id: number
    sku: string
    price: number
    inventory: number
    options: { name: string; value: string }[]
  }[]
  customFields: { name: string; value: string }[]
}

function transformProduct(p: any): BCProductFull {
  const slug = (p.custom_url?.url || `/${p.id}/`).replace(/^\/|\/$/g, '')
  return {
    id: p.id,
    name: p.name,
    sku: p.sku || '',
    slug,
    price: p.price || 0,
    salePrice: p.sale_price || 0,
    retailPrice: p.retail_price || 0,
    description: p.description || '',
    categories: p.categories || [],
    inventoryLevel: p.inventory_level || 0,
    availability: p.availability || 'available',
    weight: p.weight || 0,
    condition: p.condition || 'New',
    metaKeywords: p.meta_keywords || [],
    metaDescription: p.meta_description || '',
    searchKeywords: p.search_keywords || '',
    isVisible: p.is_visible !== false,
    dateCreated: p.date_created || '',
    images: (p.images || [])
      .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((img: any) => ({
        url: img.url_standard || img.url_thumbnail || '',
        thumbnail: img.url_thumbnail || '',
        zoom: img.url_zoom || img.url_standard || '',
        isPrimary: img.is_thumbnail || false,
        sortOrder: img.sort_order ?? 0,
      })),
    variants: (p.variants || []).map((v: any) => ({
      id: v.id,
      sku: v.sku || '',
      price: v.price || 0,
      inventory: v.inventory_level || 0,
      options: (v.option_values || []).map((opt: any) => ({
        name: opt.option_display_name || '',
        value: opt.label || '',
      })),
    })),
    customFields: (p.custom_fields || []).map((cf: any) => ({
      name: cf.name || '',
      value: cf.value || '',
    })),
  }
}

// Fetch all visible products — used by generateStaticParams
export async function getAllProducts(): Promise<BCProductFull[]> {
  const allProducts: BCProductFull[] = []
  let page = 1
  const limit = 250

  while (true) {
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?limit=${limit}&page=${page}&include=images,variants,custom_fields&is_visible=true`
    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 }, // 1 hour cache
    })

    if (!res.ok) {
      console.error(`BC API error: ${res.status}`)
      break
    }

    const data = await res.json()
    const products = (data.data || []).map(transformProduct)
    allProducts.push(...products)

    if (data.meta?.pagination?.total_pages <= page) break
    page++
  }

  return allProducts
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<BCProductFull | null> {
  // BC API doesn't support slug search directly — fetch all and find
  // In production with ISR this is cached
  const all = await getAllProducts()
  return all.find(p => p.slug === slug) || null
}

// Fetch single product by ID (faster for detail pages)
export async function getProductById(id: number): Promise<BCProductFull | null> {
  const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products/${id}?include=images,variants,custom_fields`
  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': BC_ACCESS_TOKEN,
      Accept: 'application/json',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null
  const data = await res.json()
  if (!data.data) return null
  return transformProduct(data.data)
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getAllProducts()
  return products.map(p => p.slug)
}

// Get related products (same primary category)
export async function getRelatedProducts(product: BCProductFull, limit = 4): Promise<BCProductFull[]> {
  const all = await getAllProducts()
  // Find products in same categories, excluding self
  const related = all
    .filter(p => p.id !== product.id && p.categories.some(c => product.categories.includes(c)))
    .slice(0, limit)
  return related
}
