#!/usr/bin/env node
/**
 * Generate markdown variants for MARKDOWNABLE_ROUTES.
 * Reads rendered HTML from a running Next server, strips chrome,
 * converts to markdown via turndown, writes to public/md/.
 *
 * Prereq: npm i -D turndown jsdom
 * Run: npm run md:gen (requires `next start -p 3000` or `next dev` running)
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

const ROUTES = [
  "/",
  "/faq",
  "/o-nas",
  "/kontakt",
  "/ai-growth-opportunity-map",
  "/oferta",
  "/oferta/hot-lead-catcher",
  "/oferta/pipeline-machine",
  "/oferta/content-machine",
  "/oferta/obsluga-klienta",
  "/oferta/generator-ofert",
  "/oferta/indywidualne-wdrozenia",
  "/blog",
];

const BASE = process.env.MD_GEN_BASE || "http://localhost:3000";
const PUBLIC_BASE = process.env.MD_GEN_PUBLIC_BASE || "https://www.lessmanual.ai";
const OUT_DIR = "public/md";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.remove(["script", "style", "noscript", "nav", "footer", "aside"]);

async function generate(route) {
  const url = `${BASE}${route}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[md-gen] ${route} -> HTTP ${res.status}, skip`);
    return { route, status: "skip", reason: `HTTP ${res.status}` };
  }
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const main = doc.querySelector("main") || doc.body;
  const md = turndown.turndown(main.innerHTML);

  const title = doc.querySelector("title")?.textContent || "LessManual";
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
  const publicUrl = `${PUBLIC_BASE}${route}`;
  const full = `# ${title}\n\n> ${desc}\n\n> Source: ${publicUrl}\n> Generated: ${new Date().toISOString()}\n\n---\n\n${md}\n`
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  const outPath = route === "/" ? `${OUT_DIR}/index.txt` : `${OUT_DIR}${route}.txt`;
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, full, "utf-8");
  console.log(`[md-gen] ${route} -> ${outPath} (${full.length} bytes)`);
  return { route, status: "ok", bytes: full.length, path: outPath };
}

console.log(`[md-gen] generating ${ROUTES.length} markdown variants from ${BASE}`);
const results = [];
for (const r of ROUTES) {
  try {
    results.push(await generate(r));
  } catch (e) {
    console.error(`[md-gen] ${r} failed:`, e.message);
    results.push({ route: r, status: "error", error: e.message });
  }
}
const ok = results.filter((x) => x.status === "ok").length;
const skip = results.filter((x) => x.status === "skip").length;
const err = results.filter((x) => x.status === "error").length;
console.log(`[md-gen] done: ${ok} ok, ${skip} skip, ${err} error`);
if (err > 0) process.exit(1);
