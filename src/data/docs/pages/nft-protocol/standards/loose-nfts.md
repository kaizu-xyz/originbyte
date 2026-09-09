# Loose NFTs

**NOTE: This feature will be restructured soon, once Sui adds support for Dynamic Fields in the Display feature.**

Loose NFTs are NFTs that do not hold their data directly but point indirectly to it.

The opposite of loose NFTs are NFTs that embed the metadata within themselves, by adding dynamic fields to the `Nft<T>` objects. For the purpose of this article, lets us call these embedded NFTs.

A core difference between embedded NFTs and loose NFTs is that, since the embedded NFT forces its data be held by the NFT object, it can only represent a one-to-one relationship with data object. This is ideal for classic NFT collections, in which NFTs are non-fungible from a data perspective.

In contrast, since loose NFTs do not hold the data itself, they can represent one-to-many relationships between the data object and the NFT objects. Essentially, you can mint any amount of NFTs - they will all point to a single data object. This is ideal for digital collectibles such as digital football or baseball cards, as well as gaming items that more than one user should have access to. Since they separate the data from the NFT, they can substantially reduce the amount of data redundancy you would otherwise have if you instead used embedded NFTs. To put it simply, if any Creator wants to mint millions of gaming NFTs it is dramatically cheaper to use the loose NFT implementation.

Let's now dive deeper into the implementation.

The loose implementation is composed of two core domains: the `TemplatesDomain` that lives at the Collection level, and the `PointerDomain` that lives at the NFT level:

1. The `MetadataBagDomain` is an object contained in `Collection` that contain aggregates all NFT Metadata objects:

```move
struct MetadataBagDomain<phantom C> has key, store {
    id: UID,
    table: ObjectTable<ID, Metadata<C>>,
}
```

A `Metadata` is an object that contains an NFT that serves as the Metadata object:

```move
struct Metadata<phantom C> has key, store {
    id: UID,
    metadata: Nft<C>,
}
```

A `Pointer` is the object that is added to each NFT and, as the name indicates, is serves as the pointer that loosely links the NFT to its data:

```move
struct PointerDomain has store {
    /// `Metadata` ID that this NFT is a loose representation of
    metadata_id: ID,
}
```

The loose NFT pattern is based on the Flyweight pattern, which is a design pattern that achieves storage and memory efficiency by sharing common parts of state between multiple objects instead of keeping all of the data in each object. Check [here](https://refactoring.guru/design-patterns/flyweight) for more on this design pattern.

Embedded NFTs, contrary to loose NFTs, hold their own data, and therefore the minting of data and the NFT itself can happen in one single step. With Loose NFTs however, the metadata object is first minted and only then the NFT(s) associated to that object is (are) minted.

We provide the following example function on how to mint metadata (for more you can check the full example [here](https://github.com/Origin-Byte/nft-protocol/blob/main/examples/footbytes.move)):

```move
public entry fun mint_nft_metadata(
    name: String,
    description: String,
    url: vector<u8>,
    collection: &mut Collection<FOOTBYTES>,
    mint_cap: &MintCap<FOOTBYTES>,
    supply: u64,
    ctx: &mut TxContext,
) {
    let url = sui::url::new_unsafe_from_bytes(url);

    let nft = nft::from_mint_cap(mint_cap, name, url, ctx);

    display::add_display_domain(
        &Witness {}, &mut nft, name, description,
    );

    url::add_url_domain(&Witness {}, &mut nft, url);

    let metadata = metadata::new_regulated(nft, supply, ctx);
    metadata_bag::add_metadata_to_collection(mint_cap, collection, metadata);
}
```
