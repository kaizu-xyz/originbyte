# Create a Marketplace Launchpad

Marketplaces can create an on-chain abstraction that allows them to host NFT listings and collects fees from sales.

The following is a two step process to create an on-chain Marketplace:

1. 1.Create a default fee policy for the Marketplace, in relation to fees charged on the NFT sales
2. 2.Create the Marketplace on-chain

**Create a default fee policy for the Marketplace, in relation to fees charged on the NFT sales:**

```typescript
import { NftClient } from '../src';
import { PACKAGE_OBJECT_ID, signer } from './common';

export const createFee = async () => {
    const transaction = NftClient.buildCreateFlatFee({
            packageObjectId: PACKAGE_OBJECT_ID,
            rate: 1000,
        });
    const createFeeResult = await signer.executeMoveCall(transaction);
    console.log('createFeeResult', JSON.stringify(createFeeResult));
};

createFee();
```

**Create the Marketplace:**

```typescript
import { NftClient } from '../src';
import { FEE_OBJECT_ID, PACKAGE_OBJECT_ID, signer } from './common';

export const initLaunchpad = async () => {
    const pubKey = await signer.getAddress();
    const transaction = NftClient.buildInitLaunchpad({
            packageObjectId: PACKAGE_OBJECT_ID,
            admin: `0x${pubKey}`, // launchpad admin,
            receiver: `0x${pubKey}`, // launchpad receiver
            defaultFee: FEE_OBJECT_ID,
            autoApprove: true,
        });
    const initLaunchpadResult = await signer.executeMoveCall(transaction);
    console.log('initLaunchpadResult', JSON.stringify(initLaunchpadResult));
};

initLaunchpad();
```
