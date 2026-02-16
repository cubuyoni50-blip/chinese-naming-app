import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  distDir: 'dist',
  basePath: '/chinese-naming-app',
  assetPrefix: '/chinese-naming-app',
};

export default nextConfig;