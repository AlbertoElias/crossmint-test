import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTStatus, updateNFT } from '../../app/lib/nfts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { status, nft } = req.body

    if (!Object.values(NFTStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    
    try {
      await updateNFT(nft, status)
      res.status(200).json({ message: 'NFT status updated successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to update NFT status' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}