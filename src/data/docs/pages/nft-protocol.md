# NFT-Protocol

Note: If you are a developer, do not forget to checkout our [developer documentation](https://origin-byte.github.io/), for a detailed write-up on our entrypoints, public functions and structs.

OriginByte is an ecosystem of tools, standards and smart contracts designed to make life easier for Web-3 game developers and NFT creators. Ranging from simple artwork to more complex gaming assets, OriginByte’s ethos centers around aiding builders in reaching the public and providing on-chain market infrastructure.

The Protocol is divided into three critical components:

- The NFT standard, encompassing the core `NFT`, `Collection`, and `Safe` types, controlling the lifecycle and properties of each NFT.
- Primary markets, encompassing `Marketplace`, `Listing`, and numerous markets which control the initial minting of NFTs. This section of our Protocol will be of particular interest to you if you are interested in setting up an NFT mint or want to purchase NFTs.
- Secondary markets, encompassing our `Orderbook`, which allows you to trade existing NFTs.

## Type Exporting

In order to make the below concepts more digestible, we will use an example case of an NFT creator creating a collection called *Suimarines*.

In the spirit of the design philosophy presented in this [RFC](https://github.com/MystenLabs/sui/blob/a49613a52d1556386464be7d138c379773f35499/sui_programmability/examples/nft_standard/README.md), NFTs of a given NFT Collection have their own type `C` which is expressed as:

- `Nft<C>`
- `Collection<C>`

Where `C` is a One-Time Witness (OTW) created by the creator's NFT collection module.

This not only allows us to link the `NFT` objects with the `Collection` object via type association, but it guarantees that NFTs from the Creators collection can only be minted via the contract that Creator deploys.

In our *Suimarines* case, this means that the NFT creator will deploy a Move contract called `suimarines.move`, which will contain the OTW Suimarine. With it, the Creator will create the `Collection<Suimarines>` object and export a mint function meant to mint the `Nft<Suimarines>` objects.

## **NFT**

OriginByte’s NFT protocol brings dynamism, composability and extendability to NFTs. Our current design allows Creators to create NFTs with custom domain-specific fields, with their own bespoke behaviour.

OriginByte provides a set of standard domains which implement common NFT use-cases such as `DisplayDomain` which allows wallets and marketplaces to easily display your NFT.

An `NFT` exclusively owns domains of different types, which can be dynamically acquired and lost over its lifetime. OriginByte NFTs are modelled after [Entity Component Systems](https://en.wikipedia.org/wiki/Entity_component_system), and their domains are accessible by type.

## **Collection**

Conceptually, we can think of NFTs as being organized into collections; a one-to-many relational data model that could, in a traditional database setup, be represented by two relational database tables - `collection` and `NFTs`. In this iteration `collection_id` would serve as a primary key for the `collection` table and a foreign key to the `NFTs` table.

In our Protocol, the `Collection` object has two purposes:

1. 1.To centralise collection level information on one object and thus avoid redundancy (hence reducing storage costs).
2. 2.To serve as a configuration object for its NFTs, as configurable behaviour can be injected into the object via the addition and removal of domains.

The `Collection` object leverages on the design pattern of [Entity Component Systems](https://en.wikipedia.org/wiki/Entity_component_system). Creators can therefore add custom domains to `Collection` to regulate certain aspects of the NFT collection. An example of this is using a supply domain to regulate how many NFTs can be minted in total.

## Domains

Domains are objects that are added to either `NFT` or `Collection` objects. They essentially add new behaviour and data to each NFT or to the whole Collection itself.

Our Protocol functions as a developer framework, and therefore anyone can create custom domains that incorporate any desired business logic.

We do however provide standard domains, which you can find in the [Standards](/docs/nft-protocol/standards) page.

*Note: We are actively working on adding more standard domains - these include: Composability, Supply Policies, etc.*

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2Ffz0qCqEwQIGjAqSGIAbP%2FScreenshot%202023-01-02%20at%2016.36.43.png?alt=media&token=36103773-f3e5-4a9f-afde-0163692d5735)Domains allow you to add custom fields

## **Mint Capability**

When the creator deploys a contract (e.g. `suimarines.move`) it will export a token called `MintCap<C>` which gives its owner the ability to mint NFTs for the Creator's collection (i.e. `Nft<Suimarines>`).

This object can be owned by a keypair - this may be the creator's keypair - or by a shared object. By making it a shared object we let users be the ones calling the minting function. This pattern is useful in certain applications (e.g. Sui Name Service where users are the ones minting the NFTs themselves).

### Our Community

For more information please check [our repository](https://github.com/Origin-Byte/nft-protocol).

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
