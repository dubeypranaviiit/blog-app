import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isPublicRoute = createRouteMatcher([
  '/',          
  '/sign-in(.*)', 
  '/sign-up(.*)',  '/api/blog', 
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect() 
  }
})

export const config = {
  matcher: [
   
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
}
