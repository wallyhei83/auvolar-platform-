'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function InStockProducts() {
  const [products, setProducts] = useState<InStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInStockProducts() {
      try {
        const response = await fetch('/api/bigcommerce/in-stock?limit=8');
        const data = await response.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching in-stock products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInStockProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4">
                  <div className="bg-gray-200 aspect-square rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
