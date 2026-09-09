# Deploy Pictures to Off-Chain Storage

Currently Gutenberg does not support the upload of NFT pictures to IPFS/Arweave, (we are actively working on this feature). Thus, creators will have to rely on deploying directly with platforms such as [Pinata](https://www.pinata.cloud/) or [NFT.Storage](https://nft.storage/). The below example uses Pinata as its platform, but these steps are applicable to other trusted platforms. **To the deploy the collection pictures with**[**Pinata**](https://www.pinata.cloud/)**:**

1. 1.Put all of your NFT items into a single folder named after the collection
2. 2.Ensure the pictures are named numerically in ascending order (e.g. from `1.jpeg` to `2000.jpeg` for a collection with 2000 NFTs)
3. 3.Creating an account with Pinata
4. 4.Go to `File` > `Upload` to upload a folder
5. 5.Name it after the name of your NFT collection
6. 6.Retrieve the `CID` of the upload.

Voila!

Your NFT urls will now be:

`https://gateway.pinata.cloud/ipfs/<CID>/<NFT-NUMBER>.jpeg`

Where `CID` is the identifier of the upload and `NFT-NUMBER` is the index number of each NFT.
