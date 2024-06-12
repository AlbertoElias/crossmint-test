import type { Metadata } from "next";
import '@/app/ui/globals.css';
import Link from "next/link";
import { WalletProvider } from "./wallet-provider";

export const metadata: Metadata = {
  title: "Sneaker Drop",
  description: "Buy futuristic sneakers, limited drop, and track it with an NFT!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center">
        <WalletProvider>
          <header className="w-[50rem] flex justify-between py-4">
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              <h1>Sneaker Drop</h1>
            </Link>
            <Link
              href="/orders"
              className="text-xl font-bold"
              >
              Orders
            </Link>
          </header>

          <main className="w-[50rem] flex-grow flex py-4">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
