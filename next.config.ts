import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/oferta/pipeline-machine",
        destination: "/oferta/ai-sdr",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
