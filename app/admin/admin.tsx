"use client";

import { useState } from "react";
import Login from "./login";
import { NFT } from "../lib/nfts";
import NFTItem from "./nft";

export default function Admin({
  nfts
} : {
  nfts: NFT[],
}) {  
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <section className="min-h-full w-full">
      <h2 className="text-xl mb-2">Minted NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map((nft) => <NFTItem nft={nft} key={nft.id} />)}
      </div>
    </section>
  )
}