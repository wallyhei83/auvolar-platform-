import { NextRequest, NextResponse } from 'next/server';

// Map doc types to file extensions and placeholder routes
const docConfig: Record<string, { extensions: string[]; placeholderPath: string }> = {
  'spec-sheets': { extensions: ['.pdf'], placeholderPath: '/docs/spec-sheets' },
  'ies': { extensions: ['.ies', '.IES'], placeholderPath: '/docs/ies' },
  'instructions': { extensions: ['.pdf'], placeholderPath: '/docs/instructions' },
  'warranty': { extensions: ['.pdf'], placeholderPath: '/docs/warranty' },
};

// Known files that exist (can't use fs.existsSync on Vercel serverless)
// Add SKUs here when you upload their documents
const knownFiles: Record<string, string[]> = {
  'spec-sheets': [
    'AAB-OT-75-145W-(s)',
    'AAB-OT-180-230W-(m)',
    'AAB-OT-300-420W-(L)',
    'OT-Series-Area-Light',
  ],
  'instructions': [
    'AAB-OT-75-145W-(s)',
    'AAB-OT-180-230W-(m)',
    'AAB-OT-300-420W-(L)',
    'OT-Series-Area-Light',
  ],
  'ies': [],
  'warranty': [], // Uses general warranty file
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; sku: string }> }
) {
  const { type, sku } = await params;
  const decodedSku = decodeURIComponent(sku);
  
  const config = docConfig[type];
  if (!config) {
    return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
  }

  // For warranty, always redirect to the general warranty file
  if (type === 'warranty') {
    return NextResponse.redirect(new URL('/files/warranty/AOK-5-Year-Warranty.pdf', request.url));
  }

  // Check if file is in our known files list
  const knownList = knownFiles[type] || [];
  if (knownList.includes(decodedSku)) {
    const filename = `${decodedSku}${config.extensions[0]}`;
    const fileUrl = `/files/${type}/${encodeURIComponent(filename)}`;
    return NextResponse.redirect(new URL(fileUrl, request.url));
  }

  // No file found - redirect to placeholder page
  const placeholderUrl = `${config.placeholderPath}/${encodeURIComponent(decodedSku)}`;
  return NextResponse.redirect(new URL(placeholderUrl, request.url));
}
