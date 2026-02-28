'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function IESFilePage() {
  const params = useParams();
  const sku = decodeURIComponent(params.sku as string).replace('.ies', '');

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">IES Photometric File</h1>
        <p className="text-gray-500 mb-2">SKU: {sku}</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">What is an IES file?</h2>
          <p className="text-gray-600 text-sm mb-4">
            IES (Illuminating Engineering Society) files contain photometric data that describes 
            how light is distributed from a luminaire. These files are used in lighting design 
            software like AGi32, DIALux, and Visual to accurately simulate lighting layouts.
          </p>
          
          <h2 className="font-semibold text-gray-900 mb-3">Request IES File</h2>
          <p className="text-gray-600 text-sm">
            IES files are available upon request. Please contact our technical support team 
            or submit an RFQ to receive photometric data for this product.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/tools/rfq"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
          >
            Request IES File
          </Link>
          <Link 
            href="/support"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/bc-products" className="text-gray-500 hover:text-gray-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
