import { NextResponse } from "next/server";

export function middleware(req) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

  if (isMobile) {
    return NextResponse.redirect(new URL("/mobile", req.url)); // Redirect mobile users to `/mobile`
  }

  return NextResponse.next(); // Continue normal rendering for desktop users
}

export const config = {
  matcher: "/", // Apply only on the home page (`/`)
};
