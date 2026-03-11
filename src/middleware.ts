import { NextRequest, NextResponse } from 'next/server'
import {
  CURRENT_USER_COOKIE,
  SUPABASE_ACCESS_TOKEN_COOKIE
} from '../ultilities/enum'
import { routingPage } from '../ultilities/path'

const isRoutePublic = (pathname: string) =>
  pathname.startsWith(routingPage.LOGIN_PAGE)

const isSessionValid = (accessToken?: string, currentUser?: string) => {
  // Accept either cookie so redirect does not fail due to timing on the first request after login.
  return Boolean(accessToken || currentUser)
}

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req
  const { pathname } = nextUrl

  // Next.js 12.x: cookies.get() returns the value string directly (not an object)
  const accessToken = cookies.get(SUPABASE_ACCESS_TOKEN_COOKIE)
  const currentUser = cookies.get(CURRENT_USER_COOKIE)
  const isAuthenticated = isSessionValid(accessToken, currentUser)

  if (!isAuthenticated && !isRoutePublic(pathname)) {
    return NextResponse.redirect(new URL(routingPage.LOGIN_PAGE, req.url))
  }

  if (isAuthenticated) {
    if (
      pathname === routingPage.HOME_PAGE ||
      pathname.startsWith(routingPage.LOGIN_PAGE)
    ) {
      return NextResponse.redirect(new URL(routingPage.CUSTOMER_PAGE, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude Next internals and file requests (e.g. /_next/data, .ico, .png)
    '/((?!api|_next|.*\\..*).*)'
  ]
}
