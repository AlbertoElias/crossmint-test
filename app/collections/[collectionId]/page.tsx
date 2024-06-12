import { fetchCollection } from "../../lib/nfts";
import CollectionInfo from "./collection-info";

export default async function Collections({
  params,
}: {
  params: { collectionId: string };
}) {
  const { collectionId } = params;
  const collection = await fetchCollection(collectionId);

  if (!collection) {
    return <p>Collection not found</p>;
  }

  return (
    <CollectionInfo collection={collection} />
  );
}
