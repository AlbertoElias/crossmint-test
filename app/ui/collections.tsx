"use client";

import { Collection } from "../lib/nfts";
import CollectionItem from "./collection-item";

export default function Collections({ collections }: { collections: Collection[] }) {

  return (
    <section className="grid grid-cols-2 gap-4">
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </section>
  );
}