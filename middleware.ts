import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

export default function middleware(request: NextRequest) {
  if (!isClerkConfigured) {
    return NextResponse.next();
  }

  // If Clerk is configured, let it handle auth via clerkMiddleware
  // For now, pass through to avoid invalid key errors during local testing
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
