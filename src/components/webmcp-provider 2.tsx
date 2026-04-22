"use client";

import { useEffect } from "react";

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (tools: WebMCPTool[]) => void;
    };
  }
}

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: object;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return;

    const tools: WebMCPTool[] = [
      {
        name: "generate_email",
        description:
          "Generate a personalized B2B sales email draft (Polish or English). Rate-limited: 30 req/day per IP.",
        inputSchema: {
          type: "object",
          required: ["industry", "icp"],
          properties: {
            industry: { type: "string", description: 'Target industry, e.g. "SaaS B2B"' },
            icp: { type: "string", description: 'Ideal Customer Profile, e.g. "CTO 50-200 employees"' },
            language: { type: "string", enum: ["pl", "en"], default: "pl" },
          },
        },
        execute: async (args) => {
          const res = await fetch("/api/generate-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(args),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.text();
        },
      },
      {
        name: "list_offers",
        description: "List LessManual AI automation offers with pricing tiers and ICP match.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          offers: [
            { slug: "hot-lead-catcher", title: "Hot Lead Catcher", setup: 3000, mrr: 1300, icp: "B2B with sales team" },
            { slug: "pipeline-machine", title: "Pipeline Machine", setup: 5000, mrr: 1800, icp: "B2B sales-led growth" },
            { slug: "content-machine", title: "Content Machine", setup: 5000, mrr: 1800, icp: "Companies without regular content" },
            { slug: "obsluga-klienta", title: "Obsluga Klienta AI", setup: 10000, mrr: 1500, icp: "E-commerce, clinics, services" },
            { slug: "generator-ofert", title: "Generator Ofert", setup: 4000, mrr: 900, icp: "Sales-heavy B2B" },
          ],
          contact: "kontakt@lessmanual.ai",
          calcom: "https://cal.com/bart%C5%82omiej-chudzik-2en6pt",
        }),
      },
    ];

    try {
      navigator.modelContext.provideContext(tools);
      // eslint-disable-next-line no-console
      console.info(
        "[WebMCP] registered",
        tools.map((t) => t.name),
      );
    } catch (e) {
      console.warn("[WebMCP] registration failed:", e);
    }
  }, []);

  return null;
}
