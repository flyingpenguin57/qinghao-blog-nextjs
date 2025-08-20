import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { fetchUserByUsername } from '@/app/lib/data'

export const runtime = 'nodejs'

function getSecretKey() {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('Missing JWT_SECRET')
    return new TextEncoder().encode(secret)
}

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { payload } = await jwtVerify(token, getSecretKey())
        console.log(payload)
        if (typeof payload.username !== "string") {
            throw new Error("Invalid token payload: missing username");
        }
        const userInfo = await fetchUserByUsername(payload.username)
        return NextResponse.json({ 
            username: userInfo.username, 
            email: userInfo.email, 
            id: userInfo.id,
            avator: userInfo.avator
        })
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
