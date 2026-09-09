# Fixed Price Sale

Fixed price sales allow NFT Creators to sell their NFTs at a fixed price. Creators can then decide to either sell their NFTs all at the same price, or they can break down the sale into tiers and have each tier selling at a different fixed price. As an example this allows Creators to sell NFTs at different prices depending on their rarity.

The `FixedPriceMarket` object is as follows:

```move
struct FixedPriceMarket<phantom FT> has key, store {
    id: UID,
    price: u64,
}
```

There are multiple ways to create a Fixed Price Market:

1. 1.You can call `fixed_price::init_market` to create a standalone market object, albeit for the sale to be fully configured this object must be owned by an `inventory` object which is responsible for owning the NFTs that will be sold. You can then add the market object to an inventory by calling `inventory::add_market`.
2. 2.Alternatively, when a collection is created on chain, its NFTs need to be initially created and transferred to an inventory. A pattern that allows for the speed up of this process is for the creator to instantiate the `Inventory` objects privately, along with the markets, and only then transfer these to the `Listing` object. From this, the Creator can call `inventory::init_inventory` and then call `fixed_price::create_market_on_inventory`.

Both of the above patterns require the `Inventory` to be transferred to the listing via `listing::add_inventory`.

Or additionally, you can call `fixed_price::create_market_on_listing` which will create the market on an `Inventory` already owned by a `Listing`.

To buy NFTs from a given sale, the buyer will have to call `fixed_price::buy_nft`, or in case it is a whitelisted sale `fixed_price::buy_whitelisted_nft`.
