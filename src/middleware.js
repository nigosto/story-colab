import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req, res) {
    const token = await getToken({req})
    if(!token) {
        return new NextResponse(JSON.stringify({ message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } })
    }
    return NextResponse.next()
}

export const config = {
  matcher: ['/api/room/create']
}