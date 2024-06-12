# Crossmint Demo - NFT Supply Chain

A simple demo to try out different APIs and SDKs provided by Crossmint. This demo showcases a simple NFT supply chain where NFTs are minted for each product purchase and then moved through different stages of the supply chain from an admin panel.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

Navigate manually to /admin to access the admin panel. You'll need to use the password used in the environment variable `NEX_PUBLIC_ADMIN_PASSWORD`. This allows you to update minted NFTs as they change status. Factory => Warehouse => In Transit => Delivered

__Note: This is just a demo with no proper authentication.__

## Trhings to Improve

- Add proper authentication to the admin panel
- Use custom NFT view instead of <CrossmintNFTCollectionView> for faster rendering and more seamless UI
- Use passkeys for smart wallets once it's available to sync wallets between all devices and actual security.
- Once the a collection's supply has been minted, the collection should appear as sold out to prevent further minting.
