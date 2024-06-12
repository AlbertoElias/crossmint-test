"use client";

import Link from "next/link";
import Image from 'next/image';
import { Collection } from "../lib/nfts";

export default function CollectionItem({ collection }: { collection: Collection }) {

  return (
    <Link href={`/collections/${collection.id}`}>
      <div className="bg-stone-100 rounded">
        <div className="relative w-full h-auto" style={{ paddingTop: '100%' }}>
          <Image className="rounded-lg" fill={true} src={collection.metadata.imageUrl} alt={collection.metadata.name} />
        </div>
        <div className="p-4">
          <h2 className="text-xl">{collection.metadata.name}</h2>
          <p className="h-12">{collection.metadata.description}</p>
        </div>
      </div>
    </Link>
  );
}