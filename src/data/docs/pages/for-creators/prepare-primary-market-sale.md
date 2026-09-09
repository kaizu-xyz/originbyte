# Prepare Primary Market Sale

When gutenberg deploys the new module to the blockchain, it will issue `Listing` `ID`. Creators can then decide to host their own UI for the primary sale minting, or to launch their collection in a marketplace.

In order to perform the primary sale of your collection's NFTs using a Marketplace, you will have to go through the Launchpad application process provided by your chosen Marketplace.

Throughout the Launchpad Application process, you should share the Listing ID with the Marketplace, such that they can attach the `Listing` object to their respective `Marketplace` object.

To complete the process, you should sign the transaction `listing::request_to_join_marketplace`, and this part should be facilitated by the marketplace, once you have been accepted to join the Marketplace launchpad.
