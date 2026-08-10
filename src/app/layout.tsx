import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: "TradeLens | Professional Trading Journal",
  description: "Automated trading journal for professional traders",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get('x-pathname') || '';
  const isMaintenance = pathname === '/maintenance' || pathname.startsWith('/maintenance/');

  return (
    <html lang="en">
      <body>
        {isMaintenance ? children : <ClientWrapper>{children}</ClientWrapper>}
      </body>
    </html>
  );
}
