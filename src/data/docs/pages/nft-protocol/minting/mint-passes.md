# Mint passes

In addition to `MintCap`, we provide an abstraction called `MintPass`. Whilst MintCap serves as a limited or unlimited mint authority, a `MintPass` is a pass that allows its owner to mint a certain amount of NFTs. The key difference is that mint passes are not fungible, because they can have metadata embedded in them.

In summary:

- `MintCap`s are fungible and therefore can `split` and `merge`
- `MintPass`es are created from mint caps
- `MintPass`es are not fungible and can have embedded metadata

The core motivation is that OriginByte Launchpad V2 can act as a factory for NFTs that have not been created yet. The factory generates mint passes with serialized metadata, and the buyer of those passes uses them to mint the NFT. The data of the NFT is generated from the metadata in the pass.

This allows on-the-fly minting from the launchpad, where the factory can help generate NFTs with any given metadata. For example, creators can build a delayed-reveal sale by adding encrypted metadata to mint passes and selling them on the launchpad. On the reveal date, the creator injects the secret key on-chain to decrypt the metadata and buyers mint the NFTs. In the process of minting, the metadata is decrypted and added to the NFTs themselves.
