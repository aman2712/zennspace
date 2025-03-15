import { NextResponse } from "next/server";

export function middleware(req) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
  const url = new URL(req.url);

  if (isMobile && url.pathname !== "/mobile") {
    return NextResponse.redirect(new URL("/mobile", req.url)); // Redirect mobile users to `/mobile`
  }

  if (!isMobile && url.pathname === "/") {
    return NextResponse.redirect(new URL("/pomodoro", req.url)); // Redirect desktop users from `/` to `/pomodoro`
  }

  return NextResponse.next(); // Continue rendering
}

export const config = {
  matcher: ["/", "/pomodoro"], // Apply middleware to both `/` and `/pomodoro`
};
