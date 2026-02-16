import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F9F4E8",    // 宣纸色
        cinnabar: "#B22222", // 朱砂红
        ink: "#2C2C2C",      // 水墨黑
        gold: "#C5A367",     // 描金
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/p6.png')", 
      },
    },
  },
  plugins: [],
};
export default config;