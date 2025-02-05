// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Example: Redirect all requests to `/dashboard` if the user is authenticated
  const isAuthenticated = req.cookies.get('authToken');

  if (!isAuthenticated && pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue request processing
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Only apply middleware to these paths
};
