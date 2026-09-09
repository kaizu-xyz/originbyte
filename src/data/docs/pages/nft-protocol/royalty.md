# Royalty Enforcement

Our Protocol allows NFT Creators to decide which trading smart contracts they trust which, therefore , allows their NFT collections to be traded in them, and also allows for their NFTs to interoperate with non-trading smart contracts.

Nevertheless, proactively monitoring trading and P2P transfer modules is most likely going to be a collective effort from the ecosystem. Our Protocol allows NFT creators to tap into any trusted list curated by the community. While anyone can create their own list, it is likely that the Creator’s community will coalesce in a select few of them.

In order to guarantee royalty enforcement and prevent royalty leaking, we propose an ownership model around an abstraction called `Safe`, which prevents polymorphic transfers. By guaranteeing that NFTs always live in the Owner's `Safe` instead of being directly owned by the Owner we can indirectly constrain polymorphic transfers by enforcing transferability only via trusted smart contracts.

## Safe

`Safe` is an abstraction meant to hold NFTs in it. A user that transfers its NFTs to its Safe is able to delegate the power of transferability. One typical issue with on-chain trading is that by sending one’s assets to a shared object (the trading primitive), one loses the ability to see them in their wallet, even though one has still technical ownership of such assets, until a trade is effectively executed.

To solve for this, we use `Safe` to hold the user’s assets. Then instead of transferring the assets to the shared object (trading primitive), the user transfers a `TransferCap` `TransferCap` is an object that delegates the ability to transfer a given NFT out of the seller’s `Safe`.

The ownership model of the `Safe` relies on the object `OwnerCap` whose holder is the effective owner of the `Safe` and subsequently the owner of the assets within it.

The `Safe` abstraction also guarantees that traders cannot bypass royalties by tapping into polymorphic transfers.

#### Structure

We divide the safe implementation into `UnprotectedSafe` and `Safe`. While the UnprotectedSafe provides the core functionality, `Safe` extends the functionality with the additional feature of restricting deposits into it.

```move
struct UnprotectedSafe has key, store {
    id: UID,
    /// Accounting for deposited NFTs. Each NFT in the object bag is
    /// represented in this map.
    refs: VecMap<ID, NftRef>,
}

/// Keeps info about an NFT which enables us to issue transfer caps etc.
struct NftRef has store, copy, drop {
    /// Is generated anew every time a counter is incremented from zero to
    /// one.
    ///
    /// We don't use monotonically increasing integer so that we can remove
    /// withdrawn NFTs from the map.
    version: ID,
    /// How many transfer caps are there for this version.
    transfer_cap_counter: u64,
    /// Only one `TransferCap` of the latest version can exist.
    /// An exclusively listed NFT cannot have its `TransferCap` revoked.
    is_exclusively_listed: bool,
}
```

```move
struct Safe has key, store {
    id: UID,
    inner: UnprotectedSafe,
    /// Enables depositing any collection, bypassing enabled deposits
    enable_any_deposit: bool,
    /// Collections which can be deposited into the `Safe`
    collections_with_enabled_deposits: VecSet<TypeName>,
}
```

#### Two NFT Kinds

`Safe` supports two kinds of NFTs:

1. 1.Our Protocol `nft_protocol::nft::Nft` which is guarded with an allowlist. This enables creators to have certain guarantees around royalty enforcement.
2. 2.Arbitrary type of NFTs. Those are not guarded with allowlist. They can be freely transferred between users and safes.

## Allowlists

Allowlists are used to authorize which contracts are allowed to transfer NFTs of a particular collection, and its module, `nft_protocol::transfer_allowlist` is a set of functions for implementing and managing an allowlist for NFT transfers.

The module includes functions for creating and managing the allowlist, adding and removing collections from the allowlist, and checking whether a contract is authorized to transfer a particular NFT. The module uses generics and reflection to allow for flexibility in implementing and managing the allowlist.

```move
struct Allowlist has key, store {
    id: UID,
    /// We don't store it as generic because then it has to be propagated
    /// around and it's very unergonomic.
    admin_witness: TypeName,
    /// Which collections does this allowlist apply to?
    ///
    /// We use reflection to avoid generics.
    collections: VecSet<TypeName>,
    /// If None, then there's no allowlist and everyone is allowed.
    ///
    /// Otherwise we use a witness pattern but store the witness object as
    /// the output of `type_name::get`.
    authorities: Option<VecSet<TypeName>>,
}
```

There are three generics at play:

1. 1.`Admin` (allowlist witness) enables any organization to start their own allowlist and manage it according to their own rules;
2. 2.`CW` (collection witness) empowers creators to add or remove their collections to allowlists;
3. 3.`Auth` (3rd party witness) is used to authorize contracts via their witness types. If e.g. an `Orderbook` trading contract wants to be included in a allowlist, the allowlist admin adds the stringified version of their witness type. The `Orderbook` then uses this witness type to authorize transfers.

## The TradePayment abstraction

To enable custom royalty functionality with current Move design, we need to create a system in which a collection’s own implementation can use privilege to access the NFT payments, while also allowing anyone to call the royalty logic to finish their trade.

When a trade occurs, the buyer funds are wrapped in an abstraction called `TradePayment`, which locks the funds until royalties are paid. To unwrap the funds from the `TradePayment` one requires access to a `Witness` struct declared in the creator's collection module (i.e. `suimarines::Witness`). This `Witness` struct is not to be confused with the OTW that defines the `Collection` and `Nft` type.

An instance of the collection’s struct `Witness` enables it to extract funds from `TradePayment`. This guarantees that the creator ultimately decides what the logic is to unwrap the funds and transfer them to the seller.

For instance, in our Suimarines example we have the following function:

```move
/// Calculates and transfers royalties to the `RoyaltyDomain`
public entry fun collect_royalty<FT>(
    payment: &mut TradePayment<SUIMARINES, FT>,
    collection: &mut Collection<SUIMARINES>,
    ctx: &mut TxContext,
) {
    let b = royalties::balance_mut(Witness {}, payment);

    let domain = royalty::royalty_domain(collection);
    let royalty_owed =
        royalty::calculate_proportional_royalty(domain, balance::value(b));

    royalty::collect_royalty(collection, b, royalty_owed);
    royalties::transfer_remaining_to_beneficiary(Witness {}, payment, ctx);
}
```

After it calculates the royalty from the NFT payment, it then transfers the rest to the beneficiary address, be it the NFT seller or a marketplace/wallet.

The trading contracts can design their commission schemes such that the marketplaces and/or wallets are incentivised to resolve the settlements. That avoids extra transactions sent by the user, because the client implementation will be such that they include everything in one batched transaction if possible, or have automation.

```move
/// `W` is the collection's witness (not the one time witness!) which
/// helps us ensure that the right royalty collection logic is operating
/// on this receipt.
///
/// 1. `C`ollection one-time-witness
/// 2. `F`ungible `T`oken
struct TradePayment<phantom C, phantom FT> has key {
    id: UID,
    amount: Balance<FT>,
    /// The address where the amount should be transferred to.
    /// This could be either the payment for the seller or a marketplace's
    /// commision.
    beneficiary: address,
    /// Optionally we enable grouping of payments, e.g. if there are
    /// multiple payments for one NFT (such as commission.), it might be
    /// useful for the royalty collection logic to distinguish such
    /// scenario.
    trade: Option<ID>,
}
```
