# Endpoints

## Inventory

- [init_inventory](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/inventory.move)
- [add_market](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/inventory.move)
- [deposit_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/inventory.move)
- [set_live](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/inventory.move)
- [set_whitelisted](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/inventory.move)

## Listing

- [transfer_whitelist_certificate](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [init_listing](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [init_inventory](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [request_to_join_marketplace](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [accept_listing_request](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [add_fee](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [add_inventory](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [add_market](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [add_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [sale_on](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [sale_off](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [sale_on_delegated](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [sale_off_delegated](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)
- [collect_proceeds](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/listing.move)

## Marketplace

- [init_marketplace](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/marketplace.move)

## Flat Fee (Launchpad)

- [init_fee](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/fees/flat_fee.move)
- [collect_proceeds_and_fees](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/fees/flat_fee.move)

## Dutch Auction

- [init_market](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [create_market_on_inventory](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [create_market_on_listing](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [create_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [create_bid_whitelisted](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [cancel_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [sale_cancel](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)
- [sale_conclude](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/dutch_auction.move)

## Fixed Price sale

- [init_market](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)
- [create_market_on_inventory](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)
- [create_market_on_listing](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)
- [buy_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)
- [buy_whitelisted_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)
- [set_price](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/launchpad/market/fixed_price.move)

## Safe

- [create_for_sender](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [create_transfer_cap_for_sender](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [create_exclusive_transfer_cap_for_sender](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [restrict_deposits](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [enable_any_deposit](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [disable_deposits_of_collection](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [enable_deposits_of_collection](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [deposit_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [deposit_generic_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [deposit_nft_privileged](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [burn_transfer_cap](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)
- [delist_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/safe.move)

## Unprotected Safe

- [create_for_sender](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/unprotected_safe.move)
- [deposit_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/unprotected_safe.move)
- [deposit_generic_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/unprotected_safe.move)
- [burn_transfer_cap](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/unprotected_safe.move)
- [delist_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/safe/unprotected_safe.move)

## Royalty

- [distribute_royalties](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/standards/royalties/royalty.move)

## Bidding

- [create_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/bidding.move)
- [create_bid_with_commission](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/bidding.move)
- [sell_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/bidding.move)
- [sell_nft_with_commission](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/bidding.move)
- [close_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/bidding.move)

## Orderbook

- [create_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [create_bid_with_commission](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [cancel_bid](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [create_ask](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [create_ask_with_commission](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [cancel_ask](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [buy_nft](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [finish_trade](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
- [create](https://github.com/Origin-Byte/nft-protocol/blob/main/sources/trading/ob.move)
