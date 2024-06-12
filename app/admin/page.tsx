import { fetchCollections, fetchNFTs } from "../lib/nfts";
import Admin from "./admin";

export default async function Page() {
  const collections = await fetchCollections();
  const nfts = await Promise.all(collections.map((collection) => fetchNFTs(collection.id)));
  console.log(nfts)
  for (let i = 0; i < nfts.length; i++) {
    nfts[i] = nfts[i].map((nft) => {
      nft.collection = collections[i].id;
      return nft;
    });
  }

  return <Admin nfts={nfts.flat()} />;
}