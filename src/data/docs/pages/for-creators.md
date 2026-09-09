# For Creators

OriginByte provides a JavaScript SDK that allows creators to make their unique collection and NFTs. Please note that our JavaScript SDK is currently in its experimental stages, so some instability is expected.

### How to create your own collection and mint NFTs

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FRvbgrB11ZC16JawPb99Z%2Fimage%20(5).png?alt=media&token=ef45240b-70c7-4447-8d55-8de2437f5859)NFT types

1. 1.Install the Sui CLI [https://docs.sui.io/build/install](https://docs.sui.io/build/install)
2. 2.Run the command `sui client active-address`
3. 3.Fund this wallet address with SUI tokens for gas fees
4. 4.Install our [nft-protocol](/docs/nft-protocol) `git clone https://github.com/Origin-Byte/nft-protocol.git`
5. 5.Write the underlying smart-contract for your NFT collection. Examples can be found [here](https://github.com/Origin-Byte/nft-protocol/tree/main/sources/examples). Alternatively, our Gutenberg tool can generate a smart-contract for you. More details on Gutenberg can be found in our repository. (Gutenberg has been deprecated but we are working on a better solution!)
6. 6.Create a `.env` file with a field `GAS=<COIN_OBJECT>` to receive `COIN_OBJECT` `sui client gas`. You can use this as an object in your `.env` file
7. 7.Deploy your contract with command `./bin/publish.sh` (be sure to run this command from the root directory of your `nft-protocol` project)

Once deploying, you should see this message in your console:

```move
----- Certificate ----
Transaction Hash: uYYW8K1Ai62qwyqsb/gjPePisl3IydmC2mXyhUcOy9A=
Transaction Signature:
Signed Authorities Bitmap: RoaringBitmap<[1, 2, 3]>
Transaction Kind : Publish
----- Transaction Effects ----
Status : Success
Created Objects:
- ID: 0x42880ce096688677e84eb58d7f70b71c106dbe4d , Owner: Immutable
- ID: 0x622594be95c6890c3a055a9fd3781661cce99c01 , Owner: Shared
- ID: 0xaaef259e202d0508191e615470960c2465415305 , Owner: Account Address ( 0xde2d0d8c2fb85c63ec66f0322fde5d62a58acae6 )
- ID: 0xe38937000c811e2754b377ff39c335d054d55a76 , Owner: Shared
Mutated Objects:
- ID: 0xe2d1a60163750964db660d7b2ef7ee7326012ddd , Owner: Account Address ( 0xde2d0d8c2fb85c63ec66f0322fde5d62a58acae6 )
```

Let's look closer at the example output above and see how these fields are related to our JavaScript SDK.

`0x42880ce096688677e84eb58d7f70b71c106dbe4d` - This is your contract and is `PACKAGE_OBJECT_ID` in the JavaScript SDK

`0x622594be95c6890c3a055a9fd3781661cce99c01` - This is your launchpad and is`LAUNCHPAD_ID` in the JavaScript SDK

`0xaaef259e202d0508191e615470960c2465415305` - This is your authority and is `AUTHORITY_ID` in the JavaScript SDK

`0xe38937000c811e2754b377ff39c335d054d55a76` - This is your collection and is `COLLECTION_ID` the JavaScript SDK

`0xe2d1a60163750964db660d7b2ef7ee7326012ddd` - This is your `COIN_OBJECT` in the `.env` file.

Once these objects have been produced, you can interact with them using our JavaScript SDK.

#### How to Interact With Your Program Using our JavaScript SDK:

In order to interact with our Javascript SDK, you should first install Node JS and the other dependencies needed for our library. These are listed [here](/docs/frontend). Once installed, you are able to do the following:

- Create several types of NFTs. Further information about this can be found in our [NFT-Protocol documentation](/docs/nft-protocol).
- Distribute a collection using your own launchpad. For information on how to create a launchpad and how to mint to the launchpad, please click the embedded links.

Further examples of use-cases can be found in our [Frontend section](/docs/frontend).

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
