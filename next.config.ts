import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
