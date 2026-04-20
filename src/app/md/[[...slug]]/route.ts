import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "index",
  "v2",
  "faq",
  "o-nas",
  "kontakt",
  "oferta",
  "oferta/hot-lead-catcher",
  "oferta/pipeline-machine",
  "oferta/content-machine",
  "oferta/obsluga-klienta",
  "oferta/generator-ofert",
  "blog",
]);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const key = !slug || slug.length === 0 ? "index" : slug.join("/");
  if (!ALLOWED.has(key)) {
    return new NextResponse("Not Found", { status: 404 });
  }
  const file = join(process.cwd(), "public", "md", `${key}.txt`);
  try {
    const body = await readFile(file, "utf-8");
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
