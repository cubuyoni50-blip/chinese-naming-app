import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "墨香取名 - 文墨传家，雅名共赏",
  description: "为您的小孩寻找充满文化底蕴的名字",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
