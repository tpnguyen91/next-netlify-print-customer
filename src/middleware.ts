import { NextResponse } from 'next/server'
import { CURRENT_USER_COOKIE } from '../ultilities/enum'
import { routingPage } from '../ultilities/path'

export function middleware(req) {
  const { cookies, nextUrl } = req
  const { pathname } = nextUrl

  if (!cookies.get(CURRENT_USER_COOKIE)) {
    if (!pathname.startsWith(routingPage.LOGIN_PAGE)) {
      return NextResponse.redirect(new URL(routingPage.LOGIN_PAGE, req.url))
    }
  } else {
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
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
