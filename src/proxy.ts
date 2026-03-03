// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/forget-password", "/reset-password"];
export function proxy(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLoggedIn = req.cookies.get("accessToken");
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next({ headers });
}
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
