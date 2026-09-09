# Create & Deploy the Move Module

In order to deploy an NFT collection you first will need to create a [Sui](https://docs.sui.io/build/move)[Move](https://docs.sui.io/build/move) contract, which plugs into our protocol.

To provide a smoother experience to this process, particularly for those who do not have a strong development background, we've build a software called Gutenberg, which will builds the module on behalf the creator. (*Note*: *ensure that*`git`*,*`sui`*and*`rust`*are installed as prerequisites*)

Once all appropriate dependencies are installed, your next steps are to:

**1. Clone our codebase from the terminal:**

`git clone https://github.com/Origin-Byte/nft-protocol.git`

**2. Move to the Gutenberg folder:**

`cd nft-protocol/gutenberg/`

3. In that folder you will find a configuration file `config.yaml` that Gutenberg uses to write the move module for your NFT collection. Follow this guide to learn how to fill it in.

**4. In the same folder, run the command to run Gutenberg:**

`cargo run`

This will generate a Move module in the folder `nft-protocol/examples/`**`<ADD-YOUR-NFT-PROJECT-NAME-HERE>`**`.move`

**5.** **Deploy this newly made module to the Sui Blockchain**. To complete this final step you will need to have a keypair setup locally; funded with `SUI` coins. To learn how to create and fund a keypair, see the Sui docs on [Sui Client CLI](https://docs.sui.io/references/cli/client).

**6. Once you have a wallet set up and funded, go back to the main folder with**`cd ..`**and run the following:**

`sui client gas`

This will display all the Coin objects owned by the keypair, along with its balance amount. Choose an Object ID with enough balance ("Gas Value") and add it to the following command to be ran:

`echo "GAS=`**`<ADD_YOUR_OBJECT_ID_HERE>`**`" >> .env`

**7. Finally, run**`./bin/publish.sh`**to deploy the module to the blockchain.**
