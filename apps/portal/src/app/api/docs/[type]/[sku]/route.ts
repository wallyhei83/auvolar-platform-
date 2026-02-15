import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import { join } from 'path';

// Map doc types to file extensions and placeholder routes
const docConfig: Record<string, { extensions: string[]; placeholderPath: string }> = {
  'spec-sheets': { extensions: ['.pdf'], placeholderPath: '/docs/spec-sheets' },
  'ies': { extensions: ['.ies', '.IES'], placeholderPath: '/docs/ies' },
  'instructions': { extensions: ['.pdf'], placeholderPath: '/docs/instructions' },
  'warranty': { extensions: ['.pdf'], placeholderPath: '/docs/warranty' },
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

  // Check if file exists in public/files/{type}/
  const publicDir = join(process.cwd(), 'public', 'files', type);
  
  for (const ext of config.extensions) {
    const filename = `${decodedSku}${ext}`;
    const filePath = join(publicDir, filename);
    
    if (existsSync(filePath)) {
      // File exists - redirect to the static file
      const fileUrl = `/files/${type}/${encodeURIComponent(filename)}`;
      return NextResponse.redirect(new URL(fileUrl, request.url));
    }
  }

  // For warranty, fall back to general warranty file if available
  if (type === 'warranty') {
    const defaultWarrantyPath = join(publicDir, 'AOK-5-Year-Warranty.pdf');
    if (existsSync(defaultWarrantyPath)) {
      return NextResponse.redirect(new URL('/files/warranty/AOK-5-Year-Warranty.pdf', request.url));
    }
  }

  // No file found - redirect to placeholder page
  const placeholderUrl = `${config.placeholderPath}/${encodeURIComponent(decodedSku)}`;
  return NextResponse.redirect(new URL(placeholderUrl, request.url));
}
