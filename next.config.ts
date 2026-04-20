import type { NextConfig } from "next";
import path from "path";

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
    ];
  },
};

export default nextConfig;
