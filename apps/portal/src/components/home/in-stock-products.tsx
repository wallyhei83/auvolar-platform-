import Image from 'next/image';
import Link from 'next/link';

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq';
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || 'taw41x7qx3rqu1hjmt04s20b665pse6';

interface InStockProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  salePrice: number;
  inventory: number;
  image: string | null;
  thumbnail: string | null;
  shippingStatus: string;
  shippingDays: number;
  url: string;
  categories: number[];
}

async function getInStockProducts(): Promise<InStockProduct[]> {
  try {
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?include=images&is_visible=true&limit=100`;
    
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store', // Disable cache to ensure fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    // Filter products with actual inventory, sort by inventory descending
    const inStockProducts = data.data
      .filter((p: any) => p.inventory_level > 0)
      .sort((a: any, b: any) => b.inventory_level - a.inventory_level)
      .slice(0, 8)
      .map((p: any) => {
        const primaryImage = p.images?.find((img: any) => img.is_thumbnail) || p.images?.[0];
        
        // Determine shipping status based on inventory
        let shippingStatus = 'In Stock';
        let shippingDays = 0;
        if (p.inventory_level >= 50) {
          shippingStatus = 'In Stock';
        } else if (p.inventory_level >= 10) {
          shippingStatus = 'Ships in 2-3 days';
          shippingDays = 3;
        } else {
          shippingStatus = 'Ships in 3-5 days';
          shippingDays = 5;
        }
        
        return {
          id: p.id,
          name: p.name,
          sku: p.sku,
          price: p.price,
          salePrice: p.sale_price || 0,
          inventory: p.inventory_level,
          image: primaryImage?.url_standard || primaryImage?.url_thumbnail || null,
          thumbnail: primaryImage?.url_thumbnail || null,
          shippingStatus,
          shippingDays,
          url: `/bc-products?id=${p.id}`,
          categories: p.categories || [],
        };
      });
    
    return inStockProducts;
  } catch (error) {
    console.error('Error fetching in-stock products:', error);
    return [];
  }
}

export default async function InStockProducts() {
  const products = await getInStockProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              In Stock & Ready to Ship
            </h2>
            <p className="text-gray-600 mt-1">
              Ships within 24 hours • Fast delivery
            </p>
          </div>
          <Link
            href="/bc-products?instock=true"
            className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
          >
            View All In-Stock
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.url}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 p-2">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* DLC Badge */}
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                  DLC
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-yellow-600">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {product.sku}
                </p>
                
                {/* Price */}
                <div className="mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="mt-2 flex items-center gap-1">
                  {product.shippingDays === 0 ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-xs text-green-700 font-medium">
                        {product.shippingStatus}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span className="text-xs text-yellow-700 font-medium">
                        {product.shippingStatus}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
