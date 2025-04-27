//Автоматическая проверка аутентификации перед доступам к страницам, чтобы пользователь не мог вручную перейти на /саrt или /profile

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Явно указываем использование Node.js runtime
// export const config = {
//   runtime: 'nodejs',
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// export async function middleware(request: NextRequest) {
//   // Динамический импорт auth только при необходимости
//   const { auth } = await import('@/server/auth');
//   const session = await auth();
  
//   const protectedRoutes = ['/cart', '/profile', '/orders'];
  
//   if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
//     if (!session?.user) {
//       const url = request.nextUrl.clone();
//       url.pathname = '/api/auth/signin';
//       return NextResponse.redirect(url);
//     }
//   }
  
//   return NextResponse.next();
// }










// import { auth } from "@/server/auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   const protectedRoutes = ['/cart', '/profile', '/orders'];
  
//   if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !session?.user) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/api/auth/signin';
//     return NextResponse.redirect(url);
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  
// };