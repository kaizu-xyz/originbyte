# Create an NFT listing

To create and prepare an NFT listing, creators perform the following steps:

1. Create an on-chain Listing
2. Create an Inventory (which holds the NFTs)
3. Create a Market (market-making configuration)

**Create an on-chain Listing:**

```typescript
import { NftClient } from '../src';
import { LAUNCHPAD_ID, PACKAGE_OBJECT_ID, signer } from './common';

export const initLaunchpadSlot = async () => {
    const pubKey = await signer.getAddress();
    const transaction = NftClient.buildInitSlot({
            packageObjectId: PACKAGE_OBJECT_ID,
            slotAdmin: `0x${pubKey}`,
            receiver: `0x${pubKey}`,
            launchpad: LAUNCHPAD_ID,
        });
    const initLaunchpadSlotResult = await signer.executeMoveCall(transaction);
    console.log('initLaunchpadSlotResult', JSON.stringify(initLaunchpadSlotResult));
};

initLaunchpadSlot();
```

**Create an Inventory:**

```typescript
import { NftClient } from '../src';
import { PACKAGE_OBJECT_ID, signer } from './common';

export const createInventory = async () => {
    const transaction = NftClient.buildCreateInventoryTx({
            packageObjectId: PACKAGE_OBJECT_ID,
            isWhitelisted: false,
        });
    const createInventoryResult = await signer.executeMoveCall(transaction);
    console.log('createInventoryResult', JSON.stringify(createInventoryResult));
};

createInventory();
```

**Create a Market:**

```typescript
import { NftClient } from '../src';
import {
    INVENTORY_ID, LAUNCHPAD_SLOT_ID, PACKAGE_OBJECT_ID, signer
} from './common';

export const createMarket = async () => {
    const transaction = NftClient.buildCreateFixedPriceMarketWithInventory({
            packageObjectId: PACKAGE_OBJECT_ID,
            slot: LAUNCHPAD_SLOT_ID,
            inventoryId: INVENTORY_ID,
            price: 100,
        });
    const createMarketResult = await signer.executeMoveCall(transaction);
    console.log('createMarketResult', JSON.stringify(createMarketResult));
};

createMarket();
```
