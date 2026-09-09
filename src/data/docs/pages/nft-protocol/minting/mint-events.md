# Mint events

As a way to improve discoverability over your NFT collection, you can leverage OriginByte mint events so Marketplaces, games, and dApps integrated with the protocol can see what was minted.

Add one of these calls to your mint function:

- `mint_event::mint_unlimited()` if you have an unlimited mint cap
- `mint_event::mint_limited()` if you have a limited mint cap

The events emitted have the following type:

```move
/// Event signalling that an object `T` was minted
struct MintEvent<phantom T> has copy, drop {
    /// ID of the `Collection` that was minted
    collection_id: ID,
    /// Type name of `Collection<T>` one-time witness `T`
    ///
    /// Intended to allow users to filter by collections of interest.
    type_name: TypeName,
    /// ID of the minted object
    object: ID,
}
```
