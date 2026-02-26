import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 允许在开发环境下加载图片 */
  images: {
    unoptimized: true,
  },
  
  /* 确保 Turbopack 能够正确识别根目录 */
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
