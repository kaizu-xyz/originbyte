# Launchpad

Our protocol offers a launchpad facility, which provides creators with custom ways to sell their NFTs on the primary market.

At its core, the Launchpad facility has two types of objects: `Listing` and `Marketplace`.

## Marketplace

Marketplaces are the platforms that facilitate the listing of NFT collections to the public, by facilitating a primary market UI. An NFT Creator can create a `Listing` to sell their NFTs to the public and can decide to partner with a `Marketplace` such that these are sold through the Marketplace UI. In order for the Marketplace to be remunerated, the `Listing` must be attached to a `Marketplace`.

Marketplaces and dApps that want to offer a Launchpad service should create a `Marketplace` object. After the creation of the `Marketplace`, a `Listing` for the NFT listing needs to be created by the creator of the NFT Collection. Then, the `Listing` admin should request to join the marketplace launchpad, pending acceptance.

As mentioned before, while the `Marketplace` stipulates a default fee policy, the Marketplace admin can decide to create a custom fee policy for each `Listing`.

The `Marketplace` object has the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `UID` | The `UID` of the `Marketplace` object. |
| `admin` | `address` | The address of the `Marketplace` administrator. |
| `receiver` | `address` | The address of the receiver of `Marketplace` fees. |
| `default_fee` | `ObjectBox` | Field holding a default fee implementation. In order for creators to collect their proceeds from listings with marketplaces, they will have to pay fees. Listings can have custom fee implementation, which supercede over the default fee calculation. In case of no custom fee implementation, the calculation of fees revert to the default implementation. |

## Listing

A `Listing` allows creators to sell their NFTs to the primary market using bespoke market primitives, such as [Fixed Price](/docs/launchpad/fixed-price-sale) sales and [Dutch Auctions](/docs/launchpad/dutch-auctions). `Listings` can be standalone or be attached to a `Marketplace`. This attaching serves as the on-chain abstraction that represents the partnership between the Marketplace and the NFT creator, by which the Creator's collection is promoted by and sold in the Marketplace's UI.

When a `Listing` is attached to a `Marketplace`, the Marketplace will have the opportunity to charge fees from the sales.

While the associated `Marketplace` object stipulates a default fee policy, the Marketplace admin can decide to create a custom fee policy for each `Listing`.

The `Listing` acts as the object that configures the primary NFT listing strategy (that is, the primary market sale). Primary market sales can take many shapes, depending on the business level requirements. Furthermore, Creators can decide to create multiple tiers for their sales and choose different market primitives for each.

The `Listing` object has the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `UID` | The `UID` of the `Listing` object. |
| `marketplace_id` | `Option<TypedID<Marketplace>>` | The `ID` of the marketplace to whom the listing is attached, if any. |
| `admin` | `address` | The address of the `Listing` administrator. |
| `receiver` | `address` | The address of the receiver of sale proceeds. |
| `proceeds` | `Proceeds` | Proceeds object holds the balance of Fungible Tokens acquired from the sale. |
| `venues` | `ObjectTable<ID, Venue>` | List of venues. A venue is an abstraction that contains all the configurations of a sale, such as market type and whitelist settings. |
| `warehouses` | `ObjectTable<ID, Warehouse>` | List of all `Warehouse` objects, which contain to `Nft`s for sale. |
| `custom_fee` | `ObjectBox` | Field holding a custom fee implementation, if any. In case this box is empty the calculation will be applied on the default fee object in the associated `Marketplace`. In case there is no Marketplace attached, aka. a standalone `Listing`, then there are no fees. |

In essence a listing has two main types of objects:

- Warehouses: Where the NFTs are held in inventory;
- Venues: Where the sales occurs

By having multiple warehouses and venues, listings can create bespoke sale strategies such as tiered sales. An example of this would be a Gaming NFT Creator separating the sale based on NFT rarity and emitting whitelist tokens to different users for different rarities depending on the user’s game score.

The main reason for warehouses not to be wrapped by the venues is to allow for more than one venue to tap into the same inventory of NFTs. For example, a creator might want to provide a sale of NFT packs in which 30% are rare (from aarehouse A) and 70% are common (from warehouse B), all the while allowing for buyers to buy rare and common NFTs individually (from the same warehouses).

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2Fbm36MaGhRJiY4gvZPyd8%2Fimage.png?alt=media&token=2d503399-6f1d-4894-902f-7da75112ba96)

## Inventory

In the section above we have defined Warehouses, but OriginByte's launchpad also offers an abstraction called Factory (Note: This abstraction will be available in the next release). The difference between Warehouses and Factories is that for Warehouses, NFTs are preemptively minted, whereas Factories mint NFTs on the fly when they are bought. For simplicity, whenever there is no need to specifity the if we are reffering to a warehouse or a factory, we refer it as the inventory.

The Warehouse object has the following fields:

```move
struct Warehouse has key, store {
    id: UID,
    // NFTs that are currently on sale. When an ``Nft is sold,
    // its corresponding NFT ID will be flushed from `nfts`.
    nfts: vector<ID>,
}
```

## Venue

The venue object is responsible for:

- Toggling sales on/off
- Configuring the whitelisting setup
- Provides the platform by which markets are built on top

The `Venue` object has the following fields:

```move
struct Venue has key, store {
    id: UID,
    /// Track whether market is live
    is_live: bool,
    /// Track which market is whitelisted
    is_whitelisted: bool,
}
```

A venue also configures a market type, albeit the market object is added to the venue via a dynamic field.

#### Minting of NFTs

When a collection is created on chain, its NFTs need to be initially created and transferred to a warehouse (or multiple). A pattern that allows for the speed-up of this process is for the Creator to instantiate the `Warehouse` objects privately and only then transfer these to the `Listing` object. This pattern takes full advantage of single-writer objects and Sui broadcast transaction.

As an example, for our *Suimarines* collection we first call `warehouse::init_warehouse()` to create the warehouse and transfer to our address, and then we would have the following mint function in `suimarines.move` to mint the NFTs to the warehouse:

```move
public entry fun mint_nft(
    _mint_cap: &MintCap<SUIMARINES>,
    warehouse: &mut Warehouse,
    ctx: &mut TxContext,
) {
    let nft = nft::new<SUIMARINES>(tx_context::sender(ctx), ctx);

    warehouse::deposit_nft(warehouse, nft);
}
```

#### Minting of Loose NFTs

Loose NFTs are NFTs that do not hold the data themselves but simply point to the data object. This loose standard utilizes the flyweight pattern and can massively reduce the cost a collection, since it allows for NFTs to share the same metadata and therefore eliminate any redundancy that would otherwise exist. For example, if a creator mints 1 million white t-shirts to be used by an avatar NFT, in the traditional implementation the information about the t-shirt would be duplicated a million times. With the loose implementation, there is only one data objects and the 1 million NFTs only contain a pointer to it.

By using the Factory pattern along with the [Flyweight](/docs/nft-protocol/standards/loose-nfts) pattern, we allow for loose NFTs to be minted on the fly in a launchpad sale. Note: This feature is not in production yet but it will be released in the following cycle.

## Proceeds

The `Proceeds` object performs custody of the funds acquired from the sale proceeds of an NFT `Listing`. In addition, `Proceeds` also perform the book-keeping of the sales, in quantities and amount. This allows Marketplaces to implemented custom fees policies that are applied on the aggregate sale amount and quantity, instead of being applied on each sale separately.

The process of retrieving the funds from the `Proceeds` object embedded in a `Listing` guarantees that fees are transferred to the `marketplace.receiver` and therefore the `Listing.receiver` receives the proceeds net of fees.

The exception is when we are dealing with a Standalone `Listing`, in other words, a `Listing` that is not attached to any `Marketplace`. In these cases, the NFT creators can simply retrieve the funds from the `Proceed` object.

## Whitelisting

The launchpad allows NFT creators to define if a given market is whitelisted or not. To whitelist an address we call `listing::issue_whitelist_certificate()`.

## Market Types

We currently have the following market types embedded in the Launchpad:

- [Fixed Price Sale](/docs/launchpad/fixed-price-sale)
- [Dutch Auction](/docs/launchpad/dutch-auctions)

## Interacting with the Launchpad

To interact with the launchpad, we recommend you use our [JS-SDK](/docs/frontend). You can spread your NFTs from your landing page or other pages of your dApp application with it.

Further information can be found here:

- Mint to Launchpad
- [Enable sales on your launchpad](/docs/frontend/prepare-nfts-for-sale)
- Buy from market

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
