# Dutch Auctions

Dutch auctions allow NFT Creators to sell their NFTs at a guaranteed minimum reserve price, all the while allowing the market to decided the pricing of the NFTs.

In a typical Dutch auction of a single object, the auctioneer begins with a high asking price, and lowers it until some participant accepts the price. If no participant accepts the price it will reach a predetermined reserve price limit.

If the auction is selling a fungible asset or multiple objects of equal standing, say *N* objects, then the *N* highest bids will be accepted, but not at their bid price but at the price of the lowest accepted bid.

If 10 NFTs are sold in a dutch auction, and there were the following bids:

1 NFT at 50 SUI

3 NFTs at 45 SUI

2 NFTs at 30 SUI

4 NFTs at 25 SUI

2 NFTs at 24 SUI

...

Then, the sale auction will conclude with 10 NFTs being sold at 25 SUI.

Creators can use the Dutch auction sale in conjunction with the fixed price sale, by performing a tiered sale where the common NFTs are sold at a fixed price but the rare NFTs are sold in a Dutch auction.

The `DutchAuctionMarket` object is as follows:

```move
struct DutchAuctionMarket<phantom FT> has key, store {
    id: UID,
    /// The minimum price at which NFTs can be sold
    reserve_price: u64,
    /// A bid order stores amount of "T"okens the buyer is willing to
    /// purchase
    bids: CBTree<vector<Bid<FT>>>,
}

/// A bid for one NFT
struct Bid<phantom FT> has store {
    /// Amount is equal to the price that the bidder is ready to pay for
    /// one NFT.
    amount: Balance<FT>,
    /// The address of the user who created this bid and who will receive
    /// an NFT in exchange for their tokens.
    owner: address,
}
```

There are multiple ways to create a Dutch auction market:

1. 1.You can call `dutch_auction::init_market` to create a standalone `Market` object, albeit for the sale to be fully configured this object must be owned by an `inventory` object which is responsible for owning the NFTs that will be sold. You can then add the market object to an inventory by calling `inventory::add_market`
2. 2.Alternatively, when a collection is created on chain, its NFTs need to be initially created and transferred to an inventory. A pattern that allows for the speed up of this process is for the Creator to instantiate the `Inventory` objects privately, along with the markets, and only then transfer these to the `Listing` object. From this, the Creator can call `inventory::init_inventory` and then call `dutch_auction::create_market_on_inventory`

Both of the above patterns require the `Inventory` to be transferred to the listing via `listing::add_inventory`.

Or additionally, you can call `dutch_auction::create_market_on_listing` which will create the market on an `Inventory` already owned by a `Listing`.
