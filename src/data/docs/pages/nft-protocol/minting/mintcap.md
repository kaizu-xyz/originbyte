# MintCap

A MintCap is an object that serves to guarantee minting authority over a certain type.

For each type `T` created for a Collection there is a corresponding type `MintCap<T>`. It stands for **Mint Capability**, and it is the object that gives its owner the ability to mint NFTs from its type.

```move
/// `MintCap<T>` delegates the capability of it's owner to mint `T`
struct MintCap<phantom T> has key, store {
    /// `MintCap` ID
    id: UID,
    /// ID of the `Collection` that `MintCap` controls.
    ///
    /// Intended for discovery.
    collection_id: ID,
    /// Supply that `MintCap` can mint
    supply: Option<Supply>,
}

/// `Supply` tracks supply parameters
///
/// `Supply` can be frozen, therefore making it impossible to change the
/// maximum supply.
struct Supply has store, drop {
    frozen: bool,
    max: u64,
    current: u64,
}
```

## Limited vs. unlimited supply

A `MintCap<T>` can either mint an **unlimited** number of NFTs of type `T`, or a **limited** amount. This is defined by its `supply` field. When `mint_cap.supply` is `None` the supply is unlimited; `Some` means it is limited.

## Creating MintCaps

There are essentially two ways to create a `MintCap` from scratch: from a `DelegatedWitness` or via the `Publisher` object.

In the first scenario, acquire `DelegatedWitness<T>` and call `mint_cap::new()`. Alternatively, create the MintCap together with the collection by calling `collection::create_with_mint_cap()`.

Usually this step is done in the `init` function of the contract, but it can also be done later in a transaction.

## Fungibility

Two mint cap objects of the same type `T` are fungible. Split with `mint_cap::split()`, merge with `mint_cap::merge()`.

## Minting function

The minting function must exist in the contract the creator deploys — OriginByte does not export a generic mint. Only the contract that defines a type can generate objects of that type. The purpose of `MintCap` is to be used in your mint function interface.

When minting NFTs with limited supply, take `&mut MintCap<T>`:

```move
public entry fun mint_avatar(
    name: String,
    color: String,
    mood: String,
    url: vector<u8>,
    // Need to be mut because supply is limited at 10_000 Avatars
    mint_cap: &mut MintCap<Avatar>,
    warehouse: &mut Warehouse<Avatar>,
    ctx: &mut TxContext,
) {
    let nft = Avatar {
        id: object::new(ctx),
        name,
        url: url::new_unsafe_from_bytes(url),
        color,
        mood,
    };

    mint_event::mint_limited(mint_cap, &nft);
    warehouse::deposit_nft(warehouse, nft);
}
```

When minting with **unlimited** supply, `&MintCap<T>` is enough:

```move
public entry fun mint_hat(
    type: String,
    // Does not need to be mut because supply is unlimited
    mint_cap: &MintCap<Hat>,
    warehouse: &mut Warehouse<Hat>,
    ctx: &mut TxContext,
) {
    let nft = Hat {
        id: object::new(ctx),
        type,
    };

    mint_event::mint_unlimited(mint_cap, &nft);
    warehouse::deposit_nft(warehouse, nft);
}
```
