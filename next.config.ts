import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 🌟 这是解决 404 的关键：确保访问路径包含 /chinese-naming-app */
  basePath: '/chinese-naming-app',
  
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