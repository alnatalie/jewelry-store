//Автоматическая проверка аутентификации перед доступам к страницам, чтобы пользователь не мог вручную перейти на /саrt или /profile

import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const protectedRoutes = ['/cart', '/profile', '/orders'];
  
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !session?.user) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/auth/signin';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};