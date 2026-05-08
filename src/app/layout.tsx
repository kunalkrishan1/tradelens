import type { Metadata } from "next";
import "./globals.css";

import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: "TradeLens | Professional Trading Journal",
  description: "Automated trading journal for professional traders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
