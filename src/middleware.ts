import { NextRequest, NextResponse } from "next/server";

// Routes with a pre-rendered markdown variant in public/md/
const MARKDOWNABLE_ROUTES = new Set([
  "/",
  "/v2",
  "/faq",
  "/o-nas",
  "/kontakt",
  "/oferta",
  "/oferta/hot-lead-catcher",
  "/oferta/pipeline-machine",
  "/oferta/content-machine",
  "/oferta/obsluga-klienta",
  "/oferta/generator-ofert",
  "/blog",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown") && MARKDOWNABLE_ROUTES.has(pathname)) {
    const mdPath = pathname === "/" ? "/md/index" : `/md${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = mdPath;

    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Type", "text/markdown; charset=utf-8");
    response.headers.set("Vary", "Accept");
    response.headers.set("x-markdown-source", "pre-rendered");
    return response;
  }

  const response = NextResponse.next();
  if (MARKDOWNABLE_ROUTES.has(pathname)) {
    response.headers.append("Vary", "Accept");
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known|md).*)"],
};
