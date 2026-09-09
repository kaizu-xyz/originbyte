# OriginByte Kiosk

### Background

`Kiosk` is an abstraction built by Sui, and it has been implemented in the [Sui Framework](https://github.com/MystenLabs/sui/tree/main/crates/sui-framework/packages/sui-framework/sources) as a push to drive the ecosystem to adopt a shared building block for holding and transferring NFTs.

As a building block, one of Sui Kiosk's purposes is to allow for extensions to be created. OriginByte has built the first Kiosk extension on top of the base implementation, which provides extra functionality for royalty protection, flexibility for games to build their game economies as well as access points for updating Dynamic NFTs.

### Sui Kiosk

The Sui Kiosk, as a base implementation, allows users to hold NFTs and list them for sale. When a sale happens, NFTs are withdrawn from the seller's Kiosk along with a Hot Potato object called `TransferReceipt`, which the client has to resolve in order for the batch of programmable transactions to complete successfully.

As part of Sui and OriginByte's collaboration, the Pipeline pattern was introduced, where metadata gets injected into the [Hot Potato](https://examples.sui.io/patterns/hot-potato.html) object as a way to allow creators to define a list of actions that users have to undertake in order to resolve the transfers.

#### Trading and Discoverability

Kiosks also allow for delegated transferability to trading contracts while maintaining discoverability. A user that transfers their NFTs to the Kiosk is able to delegate the power of transferability. One typical issue with on-chain trading is that by sending one’s assets to a shared object (the trading primitive), one loses the ability to see them in their wallet, even though one has still technical ownership of such assets, until a trade is effectively executed.

### OriginByte Kiosk

OriginByte Kiosk is an extension to `sui::kiosk::Kiosk` object. We extend the functionality of the base object with the aim to provide:

- Enhanced royalty protection & custom royalty strategies;
- Interoperability between royalties and gaming economies;
- A price-agnostic transfer system;
- A gateway for updating Dynamic NFTs with custom Access Policies.

This module closely co-operates with `ob_transfer_request` module. The OriginByte Kiosk extends the Sui Kiosk using dynamic fields, which allows us to provide a seamless interface in all of our contracts, that interoperate with the Sui Kiosk.

Let us explore now some of the key feature extensions available in the OriginByte Kiosk.

#### Ownership

In the base implementation, ownership of the Kiosk is claimed by a user holding a `KioskOwnerCap`. In OriginByte's extension, the OB Kiosk owns its own `KioskOwnerCap` as a dynamic field, and this allows the extension to regulate access to the functions implemented in the base contract in the Sui Framework.

OB Kiosk reimplements ownership not via an `OwnerCap` object, but via the static `owner` field. This makes the OB Kiosk non-transferrable. In other words, once an OB Kiosk is owned by a user address, it can never change owner. This mitigates royalty avoidance by trading `KioskOwnerCaps`.

As a result, function authorization occurs with `tx_context::sender` rather than an `OwnerCap`. This also reduces the amount of objects that Marketplaces need to keep track of, therefore making the implementation more lightweight.

#### Owned vs. Wrapped Kiosks

The default use case for OB Kiosks is to be owned by users, but they can also be owned by other objects. When owned by users, the object is technically shared with the field owner set as the user address. However, when the Kiosk is owned by another object, we set the field owner to `@0xb`. When the Kiosk is owned by another object it is said to be Permissionless, because no assertions occur on the transaction sender, because the possession of the Kiosk object is sufficient proof of ownership.

#### Royalty Protection

One particular feature of Sui Move is that objects with `key` ability have access to the global transfer function. In practice, what this means is that they are freely transferable, without smart contract develops having to implement `<my_type_module>::transfer`. Whilst this is useful because it allows for needless interface reimplementation, it means that creators cannot override it with a custom implementation. Transfer polymorphism is allowed, but restricting the default/global implementation is not feasible.

Untethered access to the global transfer function makes royalties unenforceable, and therefore a solution for royalty protection requires the use of [Shared Objects](https://examples.sui.io/basics/shared-object.html). Whilst Sui Kiosk is royalty agnostic, and therefore does not solve the Royalty Enforcement problem by itself, it serves as the underlying shared object that directly owns NFTs. With the OriginByte Kiosk, royalty protection is achieved by pipelining allowlists into `TransferReceipts`.

The only way for creators to guarantee full royalty enforcement is to guarantee that NFTs remain within the Kiosk. OriginByte's Kiosk extension helps facilitate that. Depending on the Creator's choices, NFTs can optionally always live inside the OB Kiosk, hence creating an option for bullet-proof royalty enforcement. Nevertheless, creators can always opt out and allow for their NFT types to freely float across different Kiosk extensions or even outside the Kiosk ecosystem itself.

#### Transfer Authorization

OriginByte Kiosk implements a slightly different approach for transferring NFTs from Kiosk to Kiosk. In the base implementation, NFTs can be sent to another Kiosk via the `list` function or via the issuance of `PurchaseCap`. These two approaches require the price of a trade to be defined upfront. However, in some cases, we can only know the trade price after its execution. Two examples of this are trading in Orderbooks or Auctions.

To mitigate this, OriginByte built a transfer delegation system that is price agnostic. There are basically two ways in which an NFT can be transferred, which stem from the fact that a trade always requires two independent parties, the seller and the buyer, to make a function call.

When the seller is the first entity to make the function call, it will have to wait for the buyer, and only then can the trade execute, and the NFT be transferred. For that, the seller first has to provide authorization to the trading contract to withdraw the NFT in the future when the buyer comes. For this to occur, the seller's transaction to the trading contract has to call `ob_kiosk::auth_transfer()` or `ob_kiosk::auth_exclusive_transfer()`, which in turn registers the trading contract as authorized for future withdrawal. When the buyer comes at a later stage and makes their transaction call, the trading contract will call `ob_kiosk::transfer_delegated()`.

When it's the other way around, and the buyer is the first making a transaction to the blockchain, it means that it's the seller's transaction that will lead to the transfer. Therefore, there is no need for prior approval, and the trading contract can simply call `ob_kiosk::transfer_signed()`.

To summarize:

- NFTs can be listed with a specific entity, be it a smart contract or a user. Only allowed entities (by the owner) can withdraw NFTs.
- The owner is by default an authorized entity.
- We provide a unified interface for exclusive and non-exclusive listing.
- It interoperates fully with the OriginByte Liquidity Layer

#### Permissionless Deposits

In the base implementation, only the Kiosk owner can perform a deposit into the Kiosk. We extend the implementation by allowing Creators to airdrop NFts directly to users' Kiosks. This is possible with OriginByte Kiosk, as owners can configure deposits to be permissionless. This means deposits can be made without the owner's signature.

#### Mutable accessors for Dynamic NFTs

A crucial piece of the dNFT puzzle is how can creators define who is allowed to mutate NFTs? OriginByte provides an ergonomic and lightweight implementation based on [Access Policies](/docs/nft-protocol/permissions/access-policies), which fully interoperates with OriginByte's Kiosk.

It provides a bridge to this feature by exposing the following functions, which allow authorized entities to borrow an NFT protected by a [MutLock](/docs/nft-protocol/permissions/mutlocks), with the promise of returning it in the same programmable batch of transactions:

```move
public fun borrow_nft_field_mut<T: key + store, Field: store>(
    self: &mut Kiosk,
    collection: &Collection<T>,
    nft_id: TypedID<T>,
    ctx: &mut TxContext,
): (MutLock<T>, ReturnPromise<T>) {
    let nft_id = typed_id::to_id(nft_id);
    assert_not_listed(self, nft_id);
    ap::assert_field_auth<T, Field>(collection, ctx);

    let cap = pop_cap(self);
    let nft = kiosk::take<T>(self, &cap, nft_id);
    set_cap(self, cap);

    mut_lock::lock_nft<Witness, T, Field>(Witness {}, nft, ctx)
}

public fun borrow_nft_mut<T: key + store>(
    self: &mut Kiosk,
    collection: &Collection<T>,
    nft_id: TypedID<T>,
    ctx: &mut TxContext,
): (MutLock<T>, ReturnPromise<T>) {
    let nft_id = typed_id::to_id(nft_id);
    assert_not_listed<T>(self, nft_id);
    ap::assert_parent_auth<T>(collection, ctx);

    let cap = pop_cap(self);
    let nft = kiosk::take<T>(self, &cap, nft_id);
    set_cap(self, cap);

    mut_lock::lock_nft_global<Witness, T>(Witness {}, nft, ctx)
}

public fun return_nft<T: key + store>(
    self: &mut Kiosk,
    locked_nft: MutLock<T>,
    promise: ReturnPromise<T>,
) {
    let nft = mut_lock::unlock_nft(Witness {}, locked_nft, promise);

    let cap = pop_cap(self);
    kiosk::place<T>(self, &cap, nft);
    set_cap(self, cap);
}
```
