const headers: HeadersInit = {
  'X-API-KEY': process.env.CROSSMINT_SERVER_API_KEY || ''
};

export interface Metadata {
  imageUrl: string;
  name: string;
  description: string;
}

export interface Collection {
  id: string;
  metadata: Metadata;
  fungability: string;
  onChain: object;
  payments?: {
    price: string;
    recipientAddress: string;
  }
}

export interface CollectionResponse {
  results: Collection[];
}

export async function fetchCollections(): Promise<Collection[]>{
  const options = {
    method: 'GET',
    headers
  };
  
  return fetch(`${process.env.NEXT_PUBLIC_CROSSMINT_API_URL}/collections/`, options)
    .then(response => response.json())
    .then((data: CollectionResponse) => data.results)
    .then((collections) => collections.filter((collection) => !collection.id.includes("default")))
    .catch(err => {
      console.error(err);
      return [];
    });
}

export async function fetchCollection(collectionId: string): Promise<Collection>{
  const options = {
    method: 'GET',
    headers
  };
  
  return fetch(`${process.env.NEXT_PUBLIC_CROSSMINT_API_URL}/collections/${collectionId}`, options)
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      return [];
    });
}

interface Attribute {
  trait_type: string;
  value: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface NFT {
  id: string;
  metadata: NFTMetadata;
  onChain: {
    status: string;
    owner: string;
  };
  collection?: string;
}

export enum NFTStatus {
  Factory = 'Factory',
  Warehouse = 'Warehouse',
  InTransit = 'In Transit',
  Delivered = 'Delivered',
}

export async function fetchNFTs(collectionId: string): Promise<NFT[]>{
  const options = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store',
      ...headers
    }
  };
  
  return fetch(`${process.env.NEXT_PUBLIC_CROSSMINT_API_URL}/collections/${collectionId}/nfts?page=1`, options)
    .then(response => response.json())
    .then((nfts) => {
      console.log(nfts)
      return nfts
    })
    .then((nfts) => nfts.filter((nft: NFT) => nft.onChain.status === 'success'))
    .catch(err => {
      console.error(err);
      return [];
    });
}

export async function updateNFT(nft: NFT, status: NFTStatus): Promise<void>{
  // Creates new metadata object and changes the metadata.attributes element with trait_type Status to status
  const newMetadata = {
    ...nft.metadata,
    attributes: nft.metadata.attributes.map((attribute) => {
      if (attribute.trait_type === 'Status') {
        return {
          ...attribute,
          value: status
        };
      }
      if (attribute.trait_type === 'Warranty') {
        const warranty = status === NFTStatus.Delivered ? Date.now().toString() : undefined;
        return {
          ...attribute,
          value: warranty
        };
      }
      return attribute;
    })
  };
  console.log(newMetadata)
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({ metadata: newMetadata })
  };
  
  return fetch(`${process.env.NEXT_PUBLIC_CROSSMINT_API_URL}/collections/${nft.collection}/nfts/${nft.id}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
}