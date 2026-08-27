import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const maintenanceExemptPaths = [
  '/maintenance',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/manifest.json',
  '/sitemap.xml',
  '/apple-touch-icon',
  '/_next/static',
  '/_next/image',
  '/_next/data',
]

function isExemptPath(pathname: string) {
  return maintenanceExemptPaths.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'))
}

export const config = {
  matcher: ['/:path*'],
}

export function proxy(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const pathname = request.nextUrl.pathname

  if (!isMaintenanceMode || isExemptPath(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.redirect(new URL('/maintenance', request.url))
}

