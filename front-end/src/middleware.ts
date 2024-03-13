import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const auth = /auth|logout/g;
    const cookieStore = cookies();
    let hasRequestToken = cookieStore.getAll()
    .some((cookie:{name: string, value: string}) => {
      return cookie.name.startsWith('CSRF_RequestVerificationToken.')
    });

    let headerToken: boolean = cookieStore.getAll()
    .some((cookie:{name: string, value: string}) => {
      return cookie.name.startsWith('CSRF_HeaderToken.')
    });

    if(!auth.test(request.url) && (!hasRequestToken || !headerToken)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
  matcher: [
    '/((?!_next|login|signUp|_next/static|_next/image|image|favicon.ico).*)(.+)'
  ],
}