# Delegated Witness

The Delegated Witness is a special type of witness that not only can be constructed from the `Witness` defined in the creators' contract but also to from the `Publisher` object.

```move
/// Delegated witness of a generic type. The type `T` is the type of an NFT itself.
struct Witness<phantom T> has copy, drop {}

/// Delegate a delegated witness from arbitrary witness type
public fun from_witness<T, W: drop>(_witness: W): Witness<T> {
    assert_same_module_as_witness<T, W>();
    Witness {}
}

/// Creates a delegated witness from a package publisher.
/// Useful for contracts which don't support our protocol the easy way,
/// but use the standard of publisher.
public fun from_publisher<T>(publisher: &Publisher): Witness<T> {
    utils::assert_package_publisher<T>(publisher);
    Witness {}
}
```

The `DelegatedWitness<T>` is an important pillar of OriginByte's domain interface protection. You essentially need to acquire an instance of it to be able to perform authenticated actions on the collection level.

For example, to create a collection you need to get a `DelegatedWitness<T>` where `T` represents the given NFT type, we call the following function:

```move
/// Creates a `Collection<T>`, and a `MintCap<T>` and returns it.
public fun create_with_mint_cap<T>(
    witness: DelegatedWitness<T>,
    supply: Option<u64>,
    ctx: &mut TxContext,
): (Collection<T>, MintCap<T>) {
    let id = object::new(ctx);

    event::emit(MintCollectionEvent {
            collection_id: object::uid_to_inner(&id),
            type_name: type_name::get<T>(),
        });

    let collection = Collection { id };

    let mint_cap = mint_cap::new(witness, object::id(&collection), supply, ctx);

    (collection, mint_cap)
}
```
