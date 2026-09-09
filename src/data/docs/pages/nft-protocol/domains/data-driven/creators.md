# Creators

The `Creators` domain gathers all collection Creators and their respective addresses. This domain is intended to be added on a `Collection` level exclusively.

It has the following structure:

```move
/// `Creators` tracks collection creators
struct Creators has store {
    creators: VecSet<address>,
}
```
