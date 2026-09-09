# Supply

`Supply` tracks the supply of a given object type or an accumualtion of actions. It tracks the current supply and guarantees that it cannot surpass the maximum supply defined.

Among others, this is used to keep track of NFT supply for collections. This is the core field responsible for accounting how many NFTs have been minted via MintCaps with limited supply.

```move
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
