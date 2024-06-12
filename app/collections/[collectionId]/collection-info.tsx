"use client";

import { useContext, useState } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import Image from 'next/image';
import { Collection } from "../../lib/nfts";
import Wallet from "../../ui/wallet";
import { WalletContext } from "@/app/wallet-provider";
import Minting from "@/app/ui/Minting";

export default function CollectionInfo({
  collection,
}: {
  collection: Collection;
}) {
  const { wallet, email, address } = useContext(WalletContext)
  const [orderIdentifier, setOrderIdentifier] = useState<string | null>(null);
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  return (
    <section className="flex gap-4 w-full">
      <div className="w-1/3">
        <div className="relative w-full h-auto" style={{ paddingTop: '100%' }}>
          <Image className="rounded-lg" fill={true} src={collection.metadata.imageUrl} alt={collection.metadata.name} />
        </div>
        <div className="justify-between p-5 my-6 space-y-3 rounded-lg border">
          <p className="text-sm text-black font-bold">
            This is a demo
          </p>
          <p className="text-sm text-black ">
            You can test out the purchase experience by using the test credit
            card below and enter random information for other payment details.
          </p>
          <div className="w-full p-2 border rounded-lg">
            <div className="flex items-start gap-1 text-black justify-between">
              <p className="text-black text-sm">4242 4242 4242 4242</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto">
        <h2 className="text-xl">{collection.metadata.name}</h2>
        <p>{collection.metadata.description}</p>
        <p>{collection.payments?.price} ETH</p>
        {!wallet ? (
          <Wallet />
         ) : orderIdentifier === null ? (
          <CrossmintPaymentElement
            projectId={projectId}
            collectionId={collection.id}
            environment={environment}
            emailInputOptions={{
              show: false,
            }}
            mintConfig={{
              type: "erc-721",
              totalPrice: "0.001",
            }}
            recipient={{
              wallet: address,
              email,
            }}
            onEvent={(event) => {
              switch (event.type) {
                case "payment:process.succeeded":
                  console.log(event);
                  setOrderIdentifier(event.payload.orderIdentifier);
                  break;
                default:
                  console.log(event);
                  break;
              }
            }}
          />
        ) : (
          <Minting orderIdentifier={orderIdentifier} />
        )}
      </div>
    </section>
  );
}
