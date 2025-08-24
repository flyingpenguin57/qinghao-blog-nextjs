import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { ResponseUtil } from './app/lib/api';

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error('Missing JWT_SECRET');
  return new TextEncoder().encode(secret);
}

export async function middleware(
  req: NextRequest,
) {
  const token = req.cookies.get('token')?.value;
  if (!token)
    return NextResponse.json(
        ResponseUtil.fail('no access', 401),
    );

  try {
    const { payload } = await jwtVerify(
      token,
      getSecretKey(),
    );
    const requestHeaders = new Headers(
      req.headers,
    );
    requestHeaders.set(
      'x-user-info',
      JSON.stringify(payload),
    );
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.json(
      ResponseUtil.fail('token error', 401),
    );
  }
}

export const config = {
  matcher: [
    '/api/article/save',
    '/api/article/delete/(.*)',
    '/api/article/publish/(.*)',
    '/api/upload',
    '/api/auth/me',
    '/edit/(.*)',
  ],
};
