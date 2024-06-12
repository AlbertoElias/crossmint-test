import Image from 'next/image';
import { NFT, NFTStatus } from "../lib/nfts";
import { useState } from 'react';
import Spinner from '../ui/spinner';

function getIPFSHash(url: string) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

function trimId(id: string) {
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
}

function getNFTStatus(nft: NFT): NFTStatus {
  const statusAttribute = nft.metadata.attributes.find((attribute) => attribute.trait_type === 'Status');
  return statusAttribute ? statusAttribute.value as NFTStatus : NFTStatus.Factory;
}

export default function NFTItem({
  nft
} : {
  nft: NFT,
}) {
  const [status, setStatus] = useState<NFTStatus>(getNFTStatus(nft))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const res = await fetch('/api/nft', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, nft }),
    })
    const data = await res.json()
    if (data.error) {
      setError(data.error)
      setSuccess(null)
    } else {
      setError(null)
      setSuccess(data.message)
    }
    setTimeout(() => {
      setError(null)
      setSuccess(null)
    }, 5000)
    setLoading(false)
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-auto" style={{ paddingTop: '100%' }}>
        <Image className="rounded-lg" fill={true} src={`https://ipfs.io/ipfs/${getIPFSHash(nft.metadata.image)}`} alt={nft.metadata.name} />
      </div>
      <h2>{nft.metadata.name}</h2>
      <p>Id: {trimId(nft.id)}</p>
      <p>Owner: {trimId(nft.onChain.owner)}</p>
      <form className="w-full mt-2" onSubmit={handleSubmit}>
        <label htmlFor="nft-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update status</label>
        <select
          id="nft-status"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setStatus(e.target.value as NFTStatus)}
          value={status}
        >
          <option value={NFTStatus.Factory}>Factory</option>
          <option value={NFTStatus.Warehouse}>Warehouse</option>
          <option value={NFTStatus.InTransit}>In Transit</option>
          <option value={NFTStatus.Delivered}>Delivered</option>
        </select>
        {!loading && <button type="submit" className="bg-blue-500 text-white text-sm font-medium rounded-lg p-2.5 w-full">Update</button>}
        {loading && <Spinner />}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">Updated!</p>}
      </form>
    </div>
  )
}