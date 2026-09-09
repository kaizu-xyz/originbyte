# Attributes

The Attributes domain is a wrapper for register string attributes on NFTs.

```move
/// Domain for storing NFT string attributes
struct Attributes has store, drop {

    /// Map of attributes
    map: VecMap<String, String>,
}
```

This struct can be added as a static field to an NFT, or also as a dynamic field.
