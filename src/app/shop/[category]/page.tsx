'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, Sun, Building2, Lightbulb, Leaf, Zap } from 'lucide-react'
import { websiteCategories, mainCategories, getCategoriesByParent } from '@/lib/bc-categories'
import { BCCategoryProducts } from '@/components/products/bc-category-products'

// Category icons
const categoryIcons: Record<string, any> = {
  outdoor: Sun,
  indoor: Building2,
  solar: Leaf,
  specialty: Zap,
}

export default function ShopCategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  
  // Find the category
  const category = websiteCategories.find(c => c.slug === categorySlug)
  const mainCategory = mainCategories.find(c => c.slug === categorySlug)
  
  // Is this a main category or a subcategory?
  if (mainCategory) {
    // Show main category page with subcategories
    const Icon = categoryIcons[mainCategory.slug] || Lightbulb
    const subcategories = getCategoriesByParent(mainCategory.slug)
    
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Breadcrumb */}
          <div className="bg-gray-50 border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{mainCategory.name}</span>
              </nav>
            </div>
          </div>
          
          {/* Hero */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/20 rounded-lg">
                  <Icon className="w-8 h-8 text-brand" />
                </div>
                <h1 className="text-3xl font-bold">{mainCategory.name}</h1>
              </div>
              <p className="text-gray-300 max-w-2xl">{mainCategory.description}</p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-6">Browse by Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className="group bg-gray-50 hover:bg-brand/5 border hover:border-brand rounded-lg p-6 transition-all"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <Lightbulb className="w-7 h-7 text-gray-400 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-brand transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }
  
  // Subcategory with products
  if (category) {
    const parentCategory = mainCategories.find(c => c.slug === category.parentSlug)
    const Icon = category.parentSlug ? categoryIcons[category.parentSlug] : Lightbulb
    
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Breadcrumb */}
          <div className="bg-gray-50 border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {parentCategory && (
                  <>
                    <Link href={`/shop/${parentCategory.slug}`} className="text-gray-500 hover:text-gray-700">
                      {parentCategory.name}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </>
                )}
                <span className="text-gray-900 font-medium">{category.name}</span>
              </nav>
            </div>
          </div>
          
          {/* Hero */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/20 rounded-lg">
                  <Icon className="w-8 h-8 text-brand" />
                </div>
                <h1 className="text-3xl font-bold">{category.name}</h1>
              </div>
              <p className="text-gray-300 max-w-2xl">{category.description}</p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 py-8">
            <BCCategoryProducts 
              categorySlug={categorySlug}
              categoryName={category.name}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }
  
  // Not found
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The category "{categorySlug}" could not be found.</p>
        <Link href="/shop" className="text-brand hover:underline">
          ← Browse All Categories
        </Link>
      </main>
      <Footer />
    </div>
  )
}
