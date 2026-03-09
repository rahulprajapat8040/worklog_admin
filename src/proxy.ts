// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/forget-password", "/reset-password"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /**
   * Skip proxy logic for:
   * - Server Actions
   * - React Server Component requests
   * - Router prefetch requests
   *
   * Otherwise Next.js will throw:
   * "An unexpected response was received from the server"
   */
  if (
    req.headers.get("next-action") ||
    req.headers.get("rsc") ||
    req.headers.get("next-router-prefetch")
  ) {
    return NextResponse.next();
  }

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.url);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const accessToken = req.cookies.get("accessToken");

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
