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
        description: "List LessManual premium AI automation offers with ICP fit and pricing model.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          offers: [
            {
              slug: "content-machine",
              title: "Content Machine",
              pricingModel: "implementation plus monthly management, scoped after diagnosis",
              icp: "Companies that need repeatable SEO/GEO content without hiring a content team",
            },
            {
              slug: "obsluga-klienta",
              title: "Customer Operations AI",
              pricingModel: "implementation plus monthly management, scoped after diagnosis",
              icp: "Companies with growing support, email, WhatsApp or operations volume",
            },
            {
              slug: "pipeline-machine",
              title: "Premium Cold Email+",
              pricingModel: "setup plus MRR, no public per-meeting default",
              icp: "Non-tech or sales-led companies where high-quality personalised outbound can work",
            },
            {
              slug: "generator-ofert",
              title: "Generator Ofert",
              pricingModel: "implementation plus management, scoped after diagnosis",
              icp: "Sales-heavy companies with slow or inconsistent quote creation",
            },
            {
              slug: "hot-lead-catcher",
              title: "Hot Lead Catcher",
              pricingModel: "used when intent signals make sense for the segment",
              icp: "B2B companies with visible buying signals in public sources",
            },
          ],
          contact: "kontakt@lessmanual.ai",
          calcom: "https://cal.com/bart%C5%82omiej-chudzik-2en6pt/30min",
        }),
      },
    ];

    try {
      navigator.modelContext.provideContext(tools);
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
