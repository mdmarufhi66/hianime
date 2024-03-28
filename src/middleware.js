import { authMiddleware } from "@clerk/nextjs";
// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
  apiKey: process.env.CLERK_SECRET_KEY,
  frontendApiKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // You can define custom paths for the public and private routes
  // Allow signed out users to access the specified routes:
  publicRoutes: ["/", "/sign-in", "/manga", "/api/webhooks/clerk"],
  // Prevent the specified routes from accessing
  // authentication information:
  // ignoredRoutes: ['/no-auth-in-this-route'],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.

    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
