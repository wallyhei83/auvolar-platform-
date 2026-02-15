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
  description: string;
  images: Array<{
    url_standard: string;
    url_thumbnail: string;
  }>;
  weight: number;
  width: number;
  height: number;
  depth: number;
  custom_fields: Array<{
    name: string;
    value: string;
  }>;
}

export default function SpecSheetPage() {
  const params = useParams();
  const sku = decodeURIComponent(params.sku as string).replace('.pdf', '');
  
  const [product, setProduct] = useState<BCProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // First get all products and find by SKU
        const response = await fetch('/api/bigcommerce/products');
        const data = await response.json();
        
        if (data.products) {
          const found = data.products.find((p: BCProduct) => 
            p.sku === sku || p.sku.toLowerCase() === sku.toLowerCase()
          );
          if (found) {
            setProduct(found);
          } else {
            setError('Product not found');
          }
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (sku) {
      fetchProduct();
    }
  }, [sku]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spec sheet...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Spec Sheet Not Found</h1>
          <p className="text-gray-600 mb-8">SKU: {sku}</p>
          <Link 
            href="/bc-products"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = product.images?.[0]?.url_standard || '/placeholder-product.png';

  return (
    <div className="min-h-screen bg-white">
      {/* Print-friendly styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Header Actions */}
      <div className="no-print bg-gray-100 py-4 px-8 border-b">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/bc-products" className="text-gray-600 hover:text-gray-900">
            ← Back to Products
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
            >
              🖨️ Print / Save PDF
            </button>
            <Link 
              href={`/bc-products/${product.id}`}
              className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>

      {/* Spec Sheet Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b-4 border-yellow-400 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💡</span>
              <span className="text-2xl font-bold">Auvolar</span>
            </div>
            <p className="text-gray-500">Light Done Right™</p>
          </div>
          <div className="text-right">
            <h1 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Specification Sheet</h1>
            <p className="text-xs text-gray-400 mt-1">Document generated from product data</p>
          </div>
        </div>

        {/* Product Title & Image */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-lg text-gray-500 mb-4">SKU: {product.sku}</p>
            
            {product.description && (
              <div 
                className="text-gray-600 text-sm prose prose-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <Image
              src={mainImage}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Technical Specifications
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {product.custom_fields && product.custom_fields.length > 0 ? (
                product.custom_fields.map((field, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 font-medium text-gray-700 w-1/3">{field.name}</td>
                    <td className="py-2 px-4 text-gray-900">{field.value}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 text-gray-500 italic" colSpan={2}>
                    Detailed specifications coming soon
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Physical Dimensions */}
        {(product.weight > 0 || product.width > 0 || product.height > 0 || product.depth > 0) && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              Physical Dimensions
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {product.weight > 0 && (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-gray-900">{product.weight}</p>
                  <p className="text-sm text-gray-500">Weight (lbs)</p>
                </div>
              )}
              {product.width > 0 && (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-gray-900">{product.width}"</p>
                  <p className="text-sm text-gray-500">Width</p>
                </div>
              )}
              {product.height > 0 && (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-gray-900">{product.height}"</p>
                  <p className="text-sm text-gray-500">Height</p>
                </div>
              )}
              {product.depth > 0 && (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-2xl font-bold text-gray-900">{product.depth}"</p>
                  <p className="text-sm text-gray-500">Depth</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications Placeholder */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Certifications & Compliance
          </h3>
          <div className="flex gap-6 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-gray-600">DLC</span>
              </div>
              <p className="text-xs text-gray-500">DLC Listed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-gray-600">UL</span>
              </div>
              <p className="text-xs text-gray-500">UL Listed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-gray-600">5YR</span>
              </div>
              <p className="text-xs text-gray-500">Warranty</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <div className="flex justify-between items-end text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">Auvolar</p>
              <p>www.auvolar.com</p>
              <p>1-888-555-0123</p>
            </div>
            <div className="text-right">
              <p>Specifications subject to change without notice.</p>
              <p>© 2026 Auvolar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
