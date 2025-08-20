import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { fetchUserByUsername } from '@/app/lib/data';
import { ResponseUtil } from '@/app/lib/api';
import { verifyPassword } from '@/app/lib/auth';

export const runtime = 'nodejs'

//获取jwt token签名密钥
function getSecretKey() {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('Missing JWT_SECRET')
    return new TextEncoder().encode(secret)
}

export async function POST(req: Request) {
    const { username, password } = await req.json() as { username?: string, password?: string }

    if (!username || !password) {
        return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const user = await fetchUserByUsername(username)
    if (user !== undefined) {
        const valid = await verifyPassword(password, user.password)
        if (valid) {
            const userId = user.id
            const token = await new SignJWT({ sub: '1', username, userId })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('7d')
                .sign(getSecretKey())
            const res = NextResponse.json(ResponseUtil.ok({ 
                    id: user.id, 
                    username: user.username, 
                    email: user.email, 
                    avator: user.avator 
                }))
            res.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
            return res
        }
    }
    return NextResponse.json(ResponseUtil.fail("invalid password or username", 100))
}
