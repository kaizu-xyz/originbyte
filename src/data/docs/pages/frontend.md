# Frontend

**Note: We are currently working on updating our SDK and make it more ergonomic.**

Our [Javascript SDK](https://github.com/Origin-Byte/originbyte-js-sdk)works with the [OriginByte NFT Protocol](/docs/nft-protocol) and provides extensive opportunities for both developers and creators.

### How to Initialize

#### Installation

Our SDK requires a minimum of [Node 16](https://nodejs.org/en/download/).

To install the library run the command:

```bash
npm install @originbyte/js-sdk
```

Or, if you use yarn:

```bash
yarn add @originbyte/js-sdk
```

To interact with Sui blockchain we recommend installing:

```bash
npm install @mysten/sui.js
```

Or, if you use yarn:

```bash
yarn add @mysten/sui.js
```

### Code Examples and Usage

The `NftClient` class provides all necessary methods to fetch the data from the blockchain and build transactions to interact with the contract. You can create your own parser and fetch any data from the blockchain - by either using a user wallet address or directly by an Object ID. The parser is an object which implements an `interface`:

```typescript
export interface SuiObjectParser<RpcResponse, DataModel> {
    parser: (
        typedData: RpcResponse,
        suiObject: SuiObject,
        rpcResponse: GetObjectDataResponse
    ) => DataModel | undefined // Parsing function, which takes RPC response and transform it into the plain JS object.
    regex: RegExp // Regular expression to filter objects
}
```

An example of the parser can be seen here:

```typescript
export const CollectionParser: SuiObjectParser<NftCollectionRpcResponse, NftCollection> = {
    parser: (data: NftCollectionRpcResponse, suiData: SuiObject, rpcResponse: GetObjectDataResponse) => ({
            name: data.name,
            description: data.description,
            creators: data.creators,
            symbol: data.symbol,
            currentSupply: data.cap.fields.supply.fields.current,
            totalSupply: data.cap.fields.supply.fields.cap,
            receiver: data.receiver,
            type: suiData.data.dataType,
            id: suiData.reference.objectId,
            tags: data.tags.fields.enumerations.fields.contents.map((_) => _.fields.value),
            rawResponse: rpcResponse,
        }),
    regex: /0x[a-f0-9]{40}::collection::Collection<0x[a-f0-9]{40}::[a-zA-Z]{1,}::[a-zA-Z]{1,}, 0x[a-f0-9]{40}::std_collection::StdMeta, 0x[a-f0-9]{40}::cap::[a-zA-Z]{1,}>/,
};
```

The SDK also provides predefined parsers and methods to interact with OriginByte's NFT protocol. The following methods can be used:

- `fetchAndParseObjectsById`
- `fetchAndParseObjectsForAddress`
- `getMintAuthoritiesById`
- `getMarketsByParams`
- `getCollectionsById`
- `getCollectionsForAddress`
- `getNftsById`
- `getNftsForAddress`
- `getNftCertificatesById`
- `getNftCertificatesForAddress`

For further examples can be found [here.](https://github.com/Origin-Byte/originbyte-js-sdk)

#### Examples

*Fetch Onchain Data: Collection and NFTs*

```typescript
import { NftClient } from '@originbyte/js-sdk';

const getNfts = async () => {
    const client = new NftClient();
    const collection = await client.getCollectionsById({ objectIds: ['0xfc18b65338d4bb906018e5f73b586a57b777d46d'] });
    const nfts = await client.getNftsForAddress('0x0ec841965c95866d38fa7bcd09047f4e0dfa0ed9');
    console.log('nfts', collection, nfts);
};

getNfts();
```

*Mint a New NFT*

```typescript
const mintToLaunchpad = async () => {
    const collections = await client.getCollectionsForAddress(`0x${keypair.getPublicKey().toSuiAddress()}`);

    const collectionsForWallet = (collections)
    .filter((_) => _.packageObjectId === PACKAGE_OBJECT_ID);

    console.log('collectionForWallet', collectionsForWallet);
    if (collectionsForWallet.length) {
        const collection = collectionsForWallet[0];
        const mintNftTransaction = NftClient.buildMintNftTx({
                mintAuthority: collection.mintAuthorityId,
                moduleName: 'suimarines',
                name: 'My First NFT',
                description: 'My First NFT',
                packageObjectId: collection.packageObjectId,
                url: 'https://i.imgur.com/D5yhcTC.png',
                attributes: {
                    Rarity: 'Ultra-rare',
                    Author: 'OriginByte',
                },
                launchpadId: LAUNCHPAD_ID,
            });
        const mintResult = await signer.executeMoveCall(mintNftTransaction);
        console.log('mintResult', mintResult);
    }
};
```

#### More Examples:

- Mint to launchpad
- [Enable sales on launchpad](/docs/frontend/prepare-nfts-for-sale)
- Buy from market
- Claim certificate

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
