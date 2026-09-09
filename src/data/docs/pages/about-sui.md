# About Sui

Designed from the ground up, Sui is the first permissionless Layer 1 blockchain whose ethos centers around enabling creators and developers to build experiences for users with extreme ease. With an extremely composable programming model, Sui is one of the best solutions available and comes with a few killer features:

- [It's easy to scale](https://docs.sui.io/devnet/learn/about-sui): Sui scales horizontally with no upper bound to meet application demand and maintains extremely low operating costs per transaction.
- [Everything is an object in Sui](https://docs.sui.io/devnet/learn/objects): On Sui, a smart contract is an object (otherwise known as a **Move Package**). Once a Move package is published on-chain, it becomes immutable. A package object can depend on other package objects that were previously published to the Sui ledger. By using an extremely composable programming model, Sui pushes itself to the forefront as one of the best solutions for developers and creators to build incredible games, NFTs and applications.
- [Move gives you a ton of opportunities:](https://docs.sui.io/devnet/learn/objects) To read about the differences between Move and Solidity - click [here](https://docs.sui.io/devnet/learn/why-move).

## **Comparing Sui to Other Blockchains**

#### **Traditional Blockchains:**

Traditional blockchain validators collectively build a *shared accumulator* - a representation of the state of the blockchain (a chain to which they add increments over time) called *blocks*.

In blockchains that offer deterministic finality, every time validators want to make an incremental addition to the blockchain, i.e., *a block proposal*, they sequence the proposal. This protocol lets them form an agreement over whether the proposed increment is valid, what the state of the chain will be after the new addition and thus *the current state of the chain*.

This method of maintaining a common state over time has known practical success over the last 14 years or so, using a wealth of theory from the last 50 years of research in the field of Byzantine Fault Tolerant distributed systems.

Yet it is inherently sequential: increments to the chain are *added one at a time*, like pearls on a string. In practice, this approach *pauses the influx of transactions* (often stored in a "mempool"), while the current block is under consideration.

#### **Sui's Approach to Validating New Transactions:**

In contrast to traditional blockchains, Sui takes the approach of only taking a lock - or "*stopping the world*" - for the relevant piece of data rather than the whole chain (an example of this would be the address of the sender, which can only send one transaction at a time). Therefore, the transaction can occur in parallel with the rest of the blockchain *because the action of the transaction's result is independent*.

Sui further expands this approach to more involved transactions that may explicitly depend on multiple elements under their sender's control, *using an*[*object model*](https://docs.sui.io/devnet/learn/objects)*and leveraging*[*Move*](https://docs.sui.io/devnet/build/move)*'s strong ownership model*. By requiring that dependencies be explicit, Sui applies a "*multi-lane*" approach to transaction validation, making sure those independent transaction flows can progress without impediment from the others.

This doesn't mean that Sui as a platform never orders transactions with respect to each other, or that it allows owners to affect only their owned microcosm of objects. Sui also processes transactions that have an effect on some shared state in a rigorous, consensus-ordered manner. See Sui's [state-of-the-art consensus](https://docs.sui.io/devnet/learn/sui-compared) section for details on the [Narwhal and Bullshark consensus engine](https://docs.sui.io/devnet/learn/architecture/consensus).

#### You can find further information about Sui here:

[Whitepaper](https://github.com/MystenLabs/sui/blob/main/doc/paper/sui.pdf)

[Sui documentation](https://docs.sui.io/)

[How Sui works](https://docs.sui.io/devnet/learn/how-sui-works)

[Why Move?](https://docs.sui.io/devnet/learn/why-move)

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
