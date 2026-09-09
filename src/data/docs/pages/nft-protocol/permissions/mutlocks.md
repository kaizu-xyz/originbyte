# MutLocks

In the ideal world, Programable Transaction would allow a function to return a mutable reference to an NFT field, therefore opening up write-access to the client side for such field. However, this is not possible to do, since in Programmable Transactions only objects themselves can be returned, not references to them.

This is problematic because we cannot give a party write-access to a specific field without giving him write-access the whole NFT itself. To solve this, we have created `MutLock`, which lock NFTs and only provide write-access to the authorised fields.

```move
struct MutLock<T> has key {
    id: UID,
    nft: T,

    // We add authority as type name to simplify the API
    // and avoid 4 generics in the extract function
    authority: TypeName,

    // We add type reflection here due to it being an option,

    // since the borrow can occur globally,
    in which case the
    // Option is None
    field: Option<TypeName>,
}
```

To gain write-access to a field of an NFT, the calling address must be authorised by the [Access Policy](/docs/nft-protocol/permissions/access-policies). An authorised address can call `ob_kiosk::borrow_nft_mut()` or `ob_kiosk::borrow_nft_field_mut()`. The reason why these functions live in the OriginByte Kiosk module is because the Kiosk is where NFTs live.
