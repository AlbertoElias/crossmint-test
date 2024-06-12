"use client";

import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../wallet-provider";
import { CrossmintNFTCollectionView } from "@crossmint/client-sdk-react-ui";
import Wallet from "../ui/wallet";

interface Wallet {
  chain: string;
  publicKey: string;
}

export default function Page() {
  const { address } = useContext(WalletContext);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    if (address) {
      setWallets([
        {
          chain: "polygon-amoy",
          publicKey: address,
        },
      ]);
    }
  }, [address]);

  return (
    <section className="min-h-full w-full">
      <h2>Your Orders</h2>
      {!wallets.length ? (
        <Wallet />
      ) : (
        <div className="h-full w-full">
          <CrossmintNFTCollectionView
            wallets={wallets}
            environment={process.env.NEXT_PUBLIC_ENVIRONMENT as string}
          />
        </div>
      )}
    </section>
  );
}