'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function WarrantyPage() {
  const params = useParams();
  const sku = decodeURIComponent(params.sku as string).replace('.pdf', '');

  const warrantyTerms = [
    {
      category: 'Commercial Indoor',
      products: ['High Bay', 'Troffer', 'Panel', 'Strip Light', 'Downlight'],
      years: 5,
    },
    {
      category: 'Commercial Outdoor',
      products: ['Area Light', 'Flood Light', 'Wall Pack', 'Canopy'],
      years: 5,
    },
    {
      category: 'Industrial',
      products: ['Vapor Tight', 'Explosion Proof', 'High Temperature'],
      years: 3,
    },
    {
      category: 'Solar',
      products: ['Solar Street Light', 'Solar Flood', 'Solar Wall Pack'],
      years: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Warranty Information</h1>
          <p className="text-gray-500">SKU: {sku}</p>
        </div>

        {/* Warranty Overview */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">LumilinkAI Limited Warranty</h2>
          <p className="text-gray-600">
            All LumilinkAI LED products are backed by our comprehensive manufacturer warranty, 
            providing protection against defects in materials and workmanship.
          </p>
        </div>

        {/* Warranty Terms by Category */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Warranty Terms by Product Category</h2>
          <div className="space-y-4">
            {warrantyTerms.map((term, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{term.category}</h3>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                    {term.years} Year{term.years > 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  {term.products.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-5">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              What's Covered
            </h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• LED chip/driver failure</li>
              <li>• Lumen depreciation {">"} 30%</li>
              <li>• Manufacturing defects</li>
              <li>• Color shift {">"} 7 SDCM</li>
              <li>• Housing/lens defects</li>
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-lg p-5">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Not Covered
            </h3>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Improper installation</li>
              <li>• Power surge damage</li>
              <li>• Physical damage/abuse</li>
              <li>• Unauthorized modifications</li>
              <li>• Normal wear and tear</li>
            </ul>
          </div>
        </div>

        {/* Claim Process */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">How to File a Warranty Claim</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">1</span>
              <span>Gather your proof of purchase (invoice, order number) and photos of the defect</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">2</span>
              <span>Submit an RMA request through our portal or contact support</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">3</span>
              <span>Receive RMA number and shipping instructions within 2 business days</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">4</span>
              <span>Ship defective product to our facility (prepaid label provided for approved claims)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">5</span>
              <span>Receive replacement product within 5-7 business days of inspection</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/portal/cases/new"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 text-center"
          >
            Submit RMA Request
          </Link>
          <Link 
            href="/support"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-center"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/bc-products" className="text-gray-500 hover:text-gray-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
