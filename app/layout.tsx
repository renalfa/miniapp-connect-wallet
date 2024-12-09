"use client";

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TonConnectUIProvider manifestUrl="https://gold-main-wolverine-336.mypinata.cloud/files/bafkreihcgsotmrfy5sb7aqvgwedyuqydscrtwo2fetij4enzmw7yw27524?X-Algorithm=PINATA1&X-Date=1733734380&X-Expires=30&X-Method=GET&X-Signature=b72181a1aec244f2974b39538a310515d915f7dab537d11af13f769babad7b41">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
