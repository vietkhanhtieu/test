import { NextRequest, NextResponse } from 'next/server'

import { USER_TOKEN_NAME, WHITELIST_PATHS } from './lib/constants'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(USER_TOKEN_NAME)?.value

  // Do nothing if user is on home page
  if (request.nextUrl.pathname == '/') {
    return NextResponse.next()
  }

  // Redirect to home page if user is logged in and trying to access login or signup page
  if (
    token &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token) {
    if (WHITELIST_PATHS.includes(request.nextUrl.pathname)) {
      return NextResponse.next()
    } else if (!request.nextUrl.pathname.startsWith('/login')) {
      // Redirect to login page if user is not logged in
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpeg|.*\\.ico$|.*\\.gif).*)'
  ]
}
