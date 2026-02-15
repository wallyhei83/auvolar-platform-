'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function InstallGuidePage() {
  const params = useParams();
  const sku = decodeURIComponent(params.sku as string).replace('.pdf', '');

  // Common installation steps for LED fixtures
  const generalSteps = [
    { title: 'Safety First', desc: 'Turn off power at the circuit breaker before installation. Verify power is off with a voltage tester.' },
    { title: 'Unpack & Inspect', desc: 'Remove fixture from packaging and inspect for damage. Keep hardware and mounting brackets organized.' },
    { title: 'Mount the Bracket', desc: 'Install the mounting bracket securely to the junction box or surface using appropriate hardware.' },
    { title: 'Wire Connections', desc: 'Connect wires: Black to Black (Hot), White to White (Neutral), Green/Bare to Green/Bare (Ground).' },
    { title: 'Attach Fixture', desc: 'Secure the fixture to the mounting bracket. Ensure all connections are tight and properly insulated.' },
    { title: 'Test & Adjust', desc: 'Restore power and test the fixture. Adjust angle or dimming settings as needed.' },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Installation Guide</h1>
          <p className="text-gray-500">SKU: {sku}</p>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-red-800">Important Safety Warning</h3>
              <p className="text-red-700 text-sm mt-1">
                Installation should be performed by a qualified electrician in accordance with local electrical codes. 
                Always turn off power before installation and follow all safety precautions.
              </p>
            </div>
          </div>
        </div>

        {/* General Installation Steps */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">General Installation Steps</h2>
          <div className="space-y-4">
            {generalSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product-Specific Notice */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">Product-Specific Instructions</h2>
          <p className="text-gray-600 text-sm mb-4">
            Detailed installation instructions specific to this product (including mounting dimensions, 
            wiring diagrams, and accessories) are available upon request or included with your order.
          </p>
          <p className="text-gray-600 text-sm">
            For technical assistance, please contact our support team at{' '}
            <a href="tel:1-888-555-0123" className="text-yellow-600 font-medium">1-888-555-0123</a> or 
            email <a href="mailto:support@auvolar.com" className="text-yellow-600 font-medium">support@auvolar.com</a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/support"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 text-center"
          >
            Contact Technical Support
          </Link>
          <Link 
            href="/bc-products"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-center"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
