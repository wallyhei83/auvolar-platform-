import { NextResponse } from 'next/server'

export async function GET() {
  const xml = `<?xml version="1.0"?>
<users>
\t<user>9467E02D1B16C6D0F851E4538851BC86</user>
</users>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
