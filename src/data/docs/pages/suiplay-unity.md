# SuiPlay SDK for Unity

## ![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FUzq18sxZ215gnNaomgK0%2Fsuiplay-sdk-for-unity-button.png?alt=media&token=2b186835-5b55-4d5c-9238-88a2a2e7f5ea)

## Features

- For Rpc clients’ direct interaction with the Sui JSON-RPC [https://docs.sui.io/sui-jsonrpc](https://docs.sui.io/sui-jsonrpc)
  - Read API
  - Write API
  - Event Read API
  - Transaction Builder Api
  - Event streaming support
  - Helper methods to build and execute transactions
  - Typed move calls
- Wallet Management
  - Generate and Restore key pairs with Mnemonics (currently Ed25519 supported)
    - [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) : Universal private key derivation from master private key also supported
  - Sign transactions
  - Store key pair in PlayerPrefs
- Interact with Origin Byte Nft Protocol (v1.1.0) [https://github.com/Origin-Byte/nft-protocol](https://github.com/Origin-Byte/nft-protocol)
- Windows desktop and WebGL platforms tested
- Unity 2021.3.10f1 LTS or later supported
- Samples are using Sui v1.2.0 testnet
- **Please note, some of the samples and typings are being updated!**

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FzxwzNlyns83A0ha2jCs2%2Fimage.png?alt=media&token=e013ddfd-0ca1-4981-9505-10ce9cceb5f2)

## Getting Started

### To start, download the repository and open with Unity:

The Samples are in ./Assets/SuiUnitySDK/Samples Open a Scene from ./Assets/SuiUnitySDK/Samples/Scenes

### Installation

Choose one of the following methods:

#### 1. Using the [openupm registry](https://openupm.com/packages/com.originbyte.suiunitysdk), you can install it via openupm-cli:

```bash
openupm add com.originbyte.suiunitysdk
```

#### 2. Via 'Add package from git URL' in the Unity Package Manager:

```
https://github.com/Origin-Byte/sui-unity-sdk.git#upm
```

#### 3. Via git url by adding this entry in your **manifest.json:**

```json
"com.originbyte.suiunitysdk": "https://github.com/Origin-Byte/sui-unity-sdk.git#upm"
```

#### 4. Download the latest `sui-unity-sdk.unitypackage` from the releases: [https://github.com/Origin-Byte/sui-unity-sdk/releases](https://github.com/Origin-Byte/sui-unity-sdk/releases)

1. 1.Drag and drop the `sui-unity-sdk.unitypackage` to the Project window
2. 2.As soon as the Import Windows pop up, click the Import button

### Start using the SDK via SuiApi and SuiWallet classes. You can check out some samples below:

## Usage Samples

All samples can be found in SuiUnitySDK/Samples

### Wallet management

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/wallet_ui_1.png)

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/create_new_wallet.png)

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/import_wallet.png)

You can click on the `Create New Wallet` or `Import Wallet` buttons to initialize the currently active Wallet.

PlayerPrefs is currently used as a keystore. It saves the last active wallet and will be loaded from there on the next restart.

You are now ready to execute transactions that require signatures.

```csharp
var mnemonics = SuiWallet.CreateNewWallet();
...
SuiWallet.RestoreWalletFromMnemonics(mnemonics);
var activeAddress = SuiWallet.GetActiveAddress();
```

### RPC Read API

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/read_api.png)

Once entering an address, you'll be able to see the results as a formatted JSON.

var address = Input.text;var filter = ObjectDataFilterFactory.CreateMatchAllFilter( ObjectDataFilterFactory.CreateAddressOwnerFilter(address));var ownedObjectsResult = await SuiApi.Client.GetOwnedObjectsAsync(address, new ObjectResponseQuery() { Filter = filter }, null, null);Ouput.text = JsonConvert.SerializeObject(ownedObjectsResult.Result, Formatting.Indented);

### RPC Move Call and Execute Transaction Samples

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/transactions.png)

This sample code calls a function in a published Move Package that has a `counter` module with an `increment` function. It modifies a shared object, incrementing the counter by 1.

You can find out more about this [here](https://github.com/MystenLabs/sui/blob/main/sui_programmability/examples/basics/sources/counter.move).

```csharp
var signer = SuiWallet.GetActiveAddress();
var moveCallTx = new MoveCallTransaction()
{
    Signer = signer,
    PackageObjectId = PackageObjectId,
    Module = "counter",
    Function = "increment",
    TypeArguments = ArgumentBuilder.BuildTypeArguments(),
    Arguments = ArgumentBuilder.BuildArguments( SharedCounterObjectId ),
    Gas =null,
    GasBudget = 10000000,
    RequestType = ExecuteTransactionRequestType.WaitForLocalExecution
};

var moveCallResult = await SuiApi.Client.MoveCallAsync(moveCallTx);

var txBytes = moveCallResult.Result.TxBytes;
var rawSigner = new RawSigner(SuiWallet.GetActiveKeyPair());
var signature = rawSigner.SignData(Intent.GetMessageWithIntent(txBytes));

var txResponse = await SuiApi.Client.ExecuteTransactionBlockAsync(txBytes, new[] { signature.Value }, TransactionBlockResponseOptions.ShowAll(), ExecuteTransactionRequestType.WaitForLocalExecution);
```

### Mint An NFT using the OriginByte NFT Protocol

![](https://github.com/Origin-Byte/sui-unity-sdk/raw/main/imgs/nft_protocol_mint.png)

This sample demonstrates the minting of an NFT for a collection using the OriginByte NFT protocol with RPC calls. More information on the Protocol can be found [here](https://github.com/Origin-Byte/nft-protocol). In this sample we automatically query for 2 separate SUI coin type objects, as the Move call executes in a batch transaction and Sui does not allow the same coin object to be both used as gas and mutate in the Move call.

```csharp
var keypair = SuiWallet.GetActiveKeyPair();
var nftProtocolClient = new NftProtocolClient(SuiApi.Client, SuiWallet.GetActiveKeyPair());

var randomFaceIndex = Random.Range(1, 9);
var txParams = new MintSuitradersNft()
{
    Attributes = new Dictionary<string, object>()
    {
        { "nft_type", "face" },
    },
    Description = "You can use this as a face of your character in the game!",
    Recipient = TargetWalletAddressInputField.text,
    ModuleName = "suitraders",
    Function = "airdrop_nft",
    Name = $"Face {randomFaceIndex}",
    PackageObjectId = NFTPackageObjectIdField.text,
    Signer = keypair.PublicKeyAsSuiAddress,
    Url = $"https://suiunitysdksample.blob.core.windows.net/nfts/face{randomFaceIndex}.png"
};

// if we pass null, it will automatically select a gas object
var mintRpcResult = await nftProtocolClient.MintNftAsync(txParams, null);
if (mintRpcResult is { IsSuccess: true })
{
    // let's get the art nft, may have to skip the new coin created
    Debug.Log("mintRpcResult status: " + mintRpcResult.Result.Effects.Status.Status);

    Debug.Log("number of objects created: " + mintRpcResult.Result.Effects.Created.Count);
    foreach (var createdRef in mintRpcResult.Result.Effects.Created)
    {
        var nftId = createdRef.Reference.ObjectId;
        if (!string.IsNullOrWhiteSpace(nftId))
        {
            await Task.Delay(3000); // wait a bit... leave time to the blockchain to process the transaction
            var artNftResult = await SuiApi.NftProtocolClient.GetArtNftAsync(nftId);
            if (artNftResult.IsSuccess && artNftResult.Result != null)
            {
                Debug.Log("this might be good: " + nftId);

                await LoadNFT(artNftResult.Result.Url);
                NFTMintedText.gameObject.SetActive(true);
                NFTMintedReadonlyInputField.gameObject.SetActive(true);

                NFTMintedReadonlyInputField.text = "https://suiexplorer.com/object/" + nftId + "?network=testnet";
                return;
            }
            else
            {
                Debug.Log("skipping, this is not artnft: " + artNftResult.ErrorMessage);
            }
        }
        else
        {
            Debug.LogError("Something went wrong with the minting 2: " + mintRpcResult.RawRpcResponse);
        }
    }
}
else
{
    Debug.LogError("Something went wrong with the minting 1: " + mintRpcResult.ErrorMessage);
}
```

## Nft loaders

Check out the NftLoaders scene. Contains samples for using Nfts as UI Image sprite, main texture of material.

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FdiWP1IlYxezVVEG72Xsc%2Fimage.png?alt=media&token=f7ec70e4-01bf-4f41-a27c-2fd65ec55f97)

Change the Ids and Address to yours.

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2F536geDmyFMddKgXz1eRu%2Fimage.png?alt=media&token=6d795d16-b737-4c11-bc66-b98e0b006851)

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FwXKMDSK94PFJDI6e2jGO%2Fimage.png?alt=media&token=14b65d49-19fe-4133-b483-06f1b606a2f9)

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FPMdFs4RW9sRjznZHsvvb%2Fimage.png?alt=media&token=503d7d81-3def-409a-9ce3-d8a899627209)

## Capy Loader

You can also import Capys! This uses the experimental Vector Graphics package to render the SVG images as PNGs. Check out the CapyNftLoaders scene to see it in action!

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2FzxwzNlyns83A0ha2jCs2%2Fimage.png?alt=media&token=e013ddfd-0ca1-4981-9505-10ce9cceb5f2)

![](https://2297996727-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FSTnJXhf5rlE9fHcRm1AL%2Fuploads%2F8QFAHFGh5w2Eugskw5TF%2Fimage.png?alt=media&token=b9647b72-5d6f-442c-8d0d-36eba095b3af)

It can load the whole hierarchy of accessories for the Capy, or just the main Capy object.

## Dependencies

Every dependency used by the SDK can be found in `./Assets/SuiUnitySDK/Plugins`.

NuGet packages are in `./Assets/SuiUnitySDK/Plugins/NuGetPackages`.

- `suinet`, our internal C#/.NET Sui library. It will be regularly updated as features are added to the core library.
- `Chaos.NaCl.Standard`
- `Portable.BouncyCastle`
- `Newtonsoft.Json` (included in recent Unity versions by default)
- `com.unity.vectorgraphics``"com.unity.vectorgraphics": "2.0.0-preview.20"`
  - if you got compilation errors, you need to add this entry to your .Packages/manifest.json file's dependencies section:

### Samples Dependencies

Dependencies used by the Samples can be found in`./Assets/SuiUnitySDK/Samples/Plugins`

- `TextMesh Pro`
- `WebGLCopyAndPaste`

## Our Roadmap

- Mobile platform support (iOS, Android)
- WalletConnect
- Streaming RPC client, Event subscription
- More samples
- OriginByte NFT ecosystem access from Unity
- Higher level APIs, easy-to-use Prefabs
- Rust & Typescript SDK parity

### Our Community

- [Twitter](https://twitter.com/Origin_Byte)
- [Discord](https://discord.gg/5yxFc59azm)
- [GitHub](https://github.com/Origin-Byte)
