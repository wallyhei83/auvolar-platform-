'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface BCProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  sale_price: number;
  description: string;
  images: Array<{
    url_standard: string;
    url_thumbnail: string;
    description: string;
    is_thumbnail: boolean;
  }>;
  inventory_level: number;
  availability: string;
  categories: number[];
  weight: number;
  width: number;
  height: number;
  depth: number;
  custom_fields: Array<{
    name: string;
    value: string;
  }>;
}

export default function BCProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<BCProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/bigcommerce/single?id=${productId}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else if (data.product) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-64 mb-8 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-10 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
                <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
                <div className="bg-gray-200 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product you are looking for does not exist.'}</p>
          <Link 
            href="/bc-products"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = product.sale_price > 0 ? product.sale_price : product.price;
  const hasDiscount = product.sale_price > 0 && product.sale_price < product.price;
  const inStock = product.inventory_level > 0 || product.availability === 'available';
  const mainImage = product.images?.[selectedImage]?.url_standard || '/placeholder-product.png';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/bc-products" className="text-gray-500 hover:text-gray-700">Products</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-4"
                unoptimized
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? 'border-yellow-400' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image.url_thumbnail || image.url_standard}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {inStock ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-700 font-medium">In Stock</span>
                  {product.inventory_level > 0 && (
                    <span className="text-gray-500">({product.inventory_level} available)</span>
                  )}
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                disabled={!inStock}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  inStock
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 pt-2">
              <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
              <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <div 
                  className="prose prose-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Custom Fields / Specifications */}
            {product.custom_fields && product.custom_fields.length > 0 && (
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h2>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {product.custom_fields.map((field, index) => (
                    <div key={index} className="flex justify-between col-span-2 py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{field.name}</dt>
                      <dd className="text-gray-900 font-medium">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Dimensions */}
            {(product.weight > 0 || product.width > 0) && (
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Dimensions</h2>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  {product.weight > 0 && (
                    <div>
                      <dt className="text-gray-500">Weight</dt>
                      <dd className="text-gray-900 font-medium">{product.weight} lbs</dd>
                    </div>
                  )}
                  {product.width > 0 && (
                    <div>
                      <dt className="text-gray-500">Width</dt>
                      <dd className="text-gray-900 font-medium">{product.width}"</dd>
                    </div>
                  )}
                  {product.height > 0 && (
                    <div>
                      <dt className="text-gray-500">Height</dt>
                      <dd className="text-gray-900 font-medium">{product.height}"</dd>
                    </div>
                  )}
                  {product.depth > 0 && (
                    <div>
                      <dt className="text-gray-500">Depth</dt>
                      <dd className="text-gray-900 font-medium">{product.depth}"</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
