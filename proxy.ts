import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('.md')) {
    const slug = request.nextUrl.pathname.slice(1, -3)
    return NextResponse.rewrite(new URL(`/api/md/${slug}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
