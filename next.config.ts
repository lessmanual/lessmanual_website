import type { NextConfig } from "next";
import path from "path";

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1"',
  '</.well-known/mcp/server-card.json>; rel="https://modelcontextprotocol.io/rel/server-card"',
].join(", ");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/oferta/ai-sdr",
        destination: "/oferta/pipeline-machine",
        permanent: true,
      },
      {
        source: "/oferta/seo-content",
        destination: "/oferta/content-machine",
        permanent: true,
      },
      {
        source: "/oferta/seo-content/:path*",
        destination: "/oferta/content-machine/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // RFC-mandated paths without file extension -> serve static .json
      { source: "/.well-known/api-catalog", destination: "/.well-known/api-catalog.json" },
      { source: "/.well-known/oauth-authorization-server", destination: "/.well-known/oauth-authorization-server.json" },
      { source: "/.well-known/oauth-protected-resource", destination: "/.well-known/oauth-protected-resource.json" },
    ];
  },
  async headers() {
    return [
      // Link response headers (RFC 8288) on key pages
      {
        source: "/",
        headers: [{ key: "Link", value: AGENT_LINK_HEADER }],
      },
      {
        source: "/v2",
        headers: [{ key: "Link", value: AGENT_LINK_HEADER }],
      },
      // Content-Type overrides for well-known (Vercel defaults do not cover linkset/vendored openapi)
      {
        source: "/.well-known/api-catalog",
        headers: [
          { key: "Content-Type", value: "application/linkset+json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/oauth-authorization-server",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/oauth-protected-resource",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/openapi.json",
        headers: [
          { key: "Content-Type", value: "application/vnd.oai.openapi+json;version=3.1" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
