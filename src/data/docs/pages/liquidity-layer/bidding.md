# Bidding Contract

The `Bidding` module allows users to bid for any given NFT in a `safe`, giving NFT owners a platform to sell their NFTs to any available bid.

Entry function to create a bid for an NFT performs the following:

- Sends funds Balance from `wallet` to the `bid`
- Creates object `bid` and shares it.

```move
create_bid<FT>(
    nft: ID,
    buyers_safe: ID,
    price: u64,
    wallet: &mut Coin<FT>,
)
```

and its commissioned version:

```move
create_bid_with_commission<FT>(
    nft,
    buyers_safe,
    price,
    beneficiary: address,
    commission_ft: u64,
    wallet,
)
```

Entry function to sell an NFT with an open `bid`.

It performs the following:

- Splits funds from `Bid<FT>` by
  - (1) Creating TradePayment<C, FT> for the trade amount
- Transfers NFT from `sellers_safe` to `buyers_safe` and burns `TransferCap`
- Transfers bid commission funds to the address `bid.commission.beneficiary`

```move
sell_nft<C, FT>(
    bid: &mut Bid<FT>,
    transfer_cap: TransferCap,
    sellers_safe: &mut Safe,
    buyers_safe: &mut Safe,
    whitelist: &Whitelist,
)
```

and its commission version

Entry function to sell an NFT with an open `bid`.

It performs the following:

- Splits funds from `Bid<FT>` by:
  - (1) Creating TradePayment<C, FT> for the Ask commission
  - (2) Creating TradePayment<C, FT> for the net trade amount
- Transfers NFT from `sellers_safe` to `buyers_safe` and burns `TransferCap`
- Transfers bid commission funds to the address `bid.commission.beneficiary`

To be called by an intermediate application, for the purpose of securing a commission for intermediating the process.

```move
sell_nft_with_commission<C, FT>(
    bid,
    transfer_cap,
    beneficiary: address,
    commission_ft: u64,
    sellers_safe,
    buyers_safe,
    whitelist,
)
```

To cancel an offer, the buyer can close a bid

```move
close_bid<FT>(bid)
```

## Events

Closing or selling a big emits an event `BidClosed`. Creating a new bid emits an event `BidCreated`.
