import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

function getSecretKey() {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('Missing JWT_SECRET')
    return new TextEncoder().encode(secret)
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/edit') || pathname.startsWith('/usercenter')) {
        const token = req.cookies.get('token')?.value
        if (!token) return NextResponse.redirect(new URL('/login', req.url))

        try {
            await jwtVerify(token, getSecretKey())
            return NextResponse.next()
        } catch {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
