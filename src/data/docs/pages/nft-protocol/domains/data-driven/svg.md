# Svg

Domain used to associate SVG data with `Collection` or `Nft`. This domain is aso in the context of Composable SVGs, which is a more advanced primitive used to update SVGs on the fly, when NFTs are composed together.

```move
/// Domain for storing an associated SVG data
struct Svg has store, drop {
    svg: vector<u8>,
}
```

Composable NFTs with children registering `Svg` can declare them with `ComposableSvg` to compose all SVG data into one definition.
