# Unreal SDK

## Features

For RPC clients’ direct interaction with the [Sui JSON-RPC](https://docs.sui.io/sui-jsonrpc):

- Get SUI objects
- Call Sui Move contracts
- Sign, Batch and Execute Transactions
- Transfer, Split and Merge SUI coins and objects
- Get Historical Event Data
- Restore `Ed25519` Keypairs from `BIP39` mnemonics and Create new Keypairs
- Tested on Windows desktop with Sui version `0.10.0`
- Works with Unreal Engine 5

## Getting Started

### Download the repository and open with Unreal Engine 5

Check the Sample Level and the Blueprint Nodes in the Level Blueprint. The `SuiUnrealSDKCore` module contains all the high level functionalities. Both C++ and Blueprints are supported.

### To Use in Projects

Install [VaRest](https://www.unrealengine.com/marketplace/en-US/product/varest-plugin) Plugin from the Marketplace, and copy all plugins found in the Plugins folder ( `Bip39UE, LibsodiumUE, SuiUnrealSDKCore` )

### Notice

Because of the limitations of Blueprints, Sui JSON API method signatures use signed integer types instead of unsigned counterparts (`int32` and `int64` types instead of `uint32` and `uint64`). For most use-cases we believe they provide sufficient range of values. If you run into problems, please open a query on GitHub.

## Usage Samples

### RPC Read API

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/read_api_nodes.png)

#### Get Object

Blueprint:

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/get_object.png)

C++:

```typescript
auto Client = RpcClient(Endpoint);
FRpcSuccessDelegate RpcSuccessDelegate;
RpcSuccessDelegate.BindLambda([OnResult](const FJsonRpcValidResponse& RpcResponse) {
        UE_LOG(LogTemp, Log, TEXT("Response received."));
    });
Client.GetObject(ObjectId, RpcSuccessDelegate);
```

### RPC Historical Event Read API

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/event_read_api_nodes.png)

### Transaction API

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/transaction_api_nodes.png)

Call Mint Devnet NFT move contract:

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/mint_devnet_nft.png)

Sign And Execute Transactions:

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/sign_execute_transaction.png)

### Crypto Helper API

![](https://github.com/Origin-Byte/sui-unreal-sdk/raw/main/imgs/crypto_helpers_nodes.png)

## Copy-Paste Ready Blueprint Nodes

you can copy-paste ready Blueprint Nodes [here](https://blueprintue.com/blueprint/wcm2f6op/).

## Dependencies

The SDK Plugin currently depends on the [VaRest](https://www.unrealengine.com/marketplace/en-US/product/varest-plugin) plugin available from the marketplace. All the other dependencies can be found in the `Plugins` folder.

## Roadmap

- More platform support (iOS, Android, Mac)
- Streaming RPC client, Event subscription
- More RPC APIs and type bindings
- WalletConnect support
- More samples
- Origin-Byte NFT ecosystem access from Unreal Engine
- Higher level APIs, easy-to-use Blueprint nodes

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
