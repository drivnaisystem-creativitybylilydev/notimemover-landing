import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/proposal')) {
    const token = request.nextUrl.searchParams.get('access')
    const expected = process.env.PROPOSAL_TOKEN
    if (!expected || token !== expected) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/proposal/:path*',
}
