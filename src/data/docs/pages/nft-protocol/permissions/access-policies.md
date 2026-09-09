# Access Policies

Access Policies allow creators to define the write-access permissions around dynamic NFTs. The biggest challenge with dynamic NFTs is that different use cases require different stakeholders to act as the authority for updating NFTs.

For example, Collections might want NFTs to be mutated by the Creators themselves, by the NFT owners themselves, or by any third party that interacts with such NFT Collections.

In the case where NFTs represent in-game items, very often games will want to update those NFTs based on in-game logic, which naturally lives off-chain. This means that players while still maintaining on-chain ownership over their NFTs, still have to allow Games to update those NFTs, preferably without changing the ownership of the NFT.

***Introduction of Access Policies***

Before, creators would have to program in the access rights themselves, however with the introduction of Access Policies, creators and game developers can now define who has access to update dynamic NFTs with barely having to write Move code.

`AccessPolicy<T>` is a struct that defines which addresses have parent and field access to NFTs of a given type `T`. Whilst the Parent access list defines the addresses that can get mutable access to the whole object, the field access list defines the addresses that can get mutable access to certain fields of the NFT.

```move
struct AccessPolicy<phantom T: key + store> has key, store {
    id: UID,
    version: u64,
    parent_access: VecSet<address>,
    field_access: Table<TypeName, VecSet<address>>,
}
```

To create an Access Policy for a given type the creator can call the following function:

```move
public fun add_new<T: key + store>(
    witness: DelegatedWitness<T>,
    collection: &mut Collection<T>,
    ctx: &mut TxContext,
)
```

where the type parameter `T` is the NFT type.

To add addresses in the Parent list, the client can call the following function:

```move
public fun add_parent_access<T: key + store>(
    witness: DelegatedWitness<T>,
    collection: &mut Collection<T>,
    addresses: vector<address>,
)
```

Similary, to addresses to the field list it can call:

```move
public fun add_field_access<T: key + store, Field: store>(
    witness: DelegatedWitness<T>,
    collection: &mut Collection<T>,
    addresses: vector<address>,
)
```

Where the type `Field` is the fields which the addresses can get mutable access to.

Given that OriginByte powered NFTs will live inside the Kiosk, we have implemented accessor functions in our Kiosk extension `ob_kiosk::borrow_nft_mut()` and `ob_kiosk::borrow_nft_field_mut()` to allow authorised entities to withdraw NFTs with the promise to return them in the same batch of programmable transactions. To guarantee that the user only has access to the authorised fields, the OriginByte Kiosk wraps the NFT in and object `MutLock`. This object contains metadata related to what fields can be accessed for mutability.
