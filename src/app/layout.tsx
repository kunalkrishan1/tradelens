import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: "Trade Lens — High-Performance Trading Terminal & Intelligence",
  description: "Institutional-grade analytics, ultra-low latency execution, and proactive market intelligence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get('x-pathname') || '';
  const isMaintenance = pathname === '/maintenance' || pathname.startsWith('/maintenance/');

  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=JetBrains+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {isMaintenance ? children : <ClientWrapper>{children}</ClientWrapper>}
      </body>
    </html>
  );
}
