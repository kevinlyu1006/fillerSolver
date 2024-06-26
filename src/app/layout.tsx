import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filler-Solver",
  description: "Created by Xing Lyu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{background: "radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(189,189,189,1) 100%)", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment:"fixed",}}>{children}</body>
      
    </html>
  );
}


