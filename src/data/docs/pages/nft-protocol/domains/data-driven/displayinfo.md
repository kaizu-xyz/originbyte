# DisplayInfo

The DisplayInfo domain essentially provides plain vanilla fields that can be added to the `Collection`.

```move
struct DisplayInfo has store, drop {
    name: String,
    description: String,
}
```

For NFTs these fields can be added as static fields to the object type, however this struct provides a convenience wrapper for the `Collection` object since this object does not have static fields and only dynamic ones.
