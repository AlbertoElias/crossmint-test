import { fetchCollections } from "./lib/nfts";
import Collections from "./ui/collections";

export default async function Home() {
  const collections = await fetchCollections();

  return <Collections collections={collections} />
}
