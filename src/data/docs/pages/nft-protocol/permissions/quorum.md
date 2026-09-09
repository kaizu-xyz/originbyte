# Quorum

One challenge we have spotted was that until now there was no flexible yet easy on-chain abstraction for creators and marketplaces to collaborate on all aspects of the collection. To solve this problem we have created `Quorum`, a primitive for regulating access management for administrative objects such `MintCap`, `Publisher`, `LaunchpadCap` among others.

The core problem that `Quorum` tries to solve is that in an organisational context, it is not sufficiently secure to own [Capability](https://examples.sui.io/patterns/capability.html) objects directly via a keypair. Owning Cap objects directly equates to centralisation risk, exposing projects to the risk that such keypair gets compromised. Furthermore by being directly owned by a keypair, is provides no abstraction for collaboration between multiple parties.

Quorum solves this by providing a flexible yet ergonomic way of regulating access control over these objects. Baseline Multi-sig only solves the problem of distributing the risk across key-pairs but it does not provide an ergonomic on-chain abstraction with ability to manage access control as well as delegation capabilities.

The core mechanics of the Quorum are the following:

1. 1.Allowed users can borrow Cap objects from the `Quorum` but have to return it in the same batch of programmable transactions. When authorised users call `borrow_cap` they will receive the Cap object `T` and a hot potato object `ReturnReceipt<F, T>`. In order for the batch of transactions to succeed this hot potato object needs to be returned in conjunctions with the Cap `T`.
2. 2.`Quorum` exports two users types: Admins and Members. Any `Admin` user can add or remove `Member` users. To add or remove `Admin` users, at least >50% of the admins need to vote in favour. (Note: This is the baseline functionality that the quorum provides but it can be overwritten by Quorum extensions to fit specific needs of projects)
3. 3.Only Admins can insert Cap objects to Quorums. When inserting Cap objects, admins can decide if these are accessible to Admin-only or if they are also accessible to Members.
4. 4.Delegation: To facilitate interactivity between parties, such as Games or NFT creators and Marketplaces, Quorums can delegate access rights to other Quorums. This means that sophisticated creators can create a Creator-Quorum and delegate access rights to a Marketplace-Quorum. This allows for creators to preserve their sovereignty over the collection’s affairs, whilst allowing for Marketplaces or other Third-Parties to act on their behalf.
5. 5.Simplicity: The above case is an advanced option, however creators can decide to start simple by calling `quorum::singleton(creator_address)`, which effectively mimics as if the creator would own the Cap objects directly.
6. 6.Another option for simplicity, in cases where creators are completely abstracted away from the on-chain code, these Cap objects can be stored directly in the marketplace’s Quorums. If needed at any time the Marketplace can return the Caps back to the creator address or quorum.
7. 7.Extendability: Following our principles of OriginByte as a developer framework, the Quorum can be extended with custom-made implementations. In a nutshell, extensions can:
  1. 1.Implement different voting mechanisms with their own majority and minority rules;
  2. 2.Implement different access-permission schemes (they can bypass the Admin-Member model and add their own model)
