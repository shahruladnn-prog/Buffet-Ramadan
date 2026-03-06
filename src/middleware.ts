import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || ''

    // If the request comes from the production domain, route it to maintenance.
    // We leave the vercel.app domain active for testing.
    if (host === 'buffet.gopengglampingpark.com') {
        if (!request.nextUrl.pathname.startsWith('/maintenance')) {
            return NextResponse.redirect(new URL('/maintenance', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
