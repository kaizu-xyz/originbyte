export type Package = {
  slug: string;
  name: string;
  language: string;
  github: string;
  summary: string;
  details: string;
  install?: string;
};

export const packages: Package[] = [
  {
    slug: "token-launch",
    name: "token-launch",
    language: "Move",
    github: "https://github.com/Origin-Byte/nft-protocol",
    summary:
      "Token Protocol by Origin-Byte offers a fresh approach to digital assets, riding into core standards, scalable launchpads for primary issuance, and secondary markets wired for settlement.",
    details:
      "The protocol is a developer framework for programmable, interoperable digital assets on Sui. Collections, mint caps, kiosks, and launchpads live as composable on-chain primitives instead of a rigid wrapper. Stand up a launchpad that can scale from a single collection to many issuances — whitelist accounting, timed sales, and royalty-safe transfers included. Use it for funds, licenses, tokenised claims, or any non-divisible asset that needs a real lifecycle.",
    install: `git = "https://github.com/Origin-Byte/nft-protocol.git"`,
  },
  {
    slug: "secondary-market",
    name: "secondary-market",
    language: "Move",
    github: "https://github.com/Origin-Byte/nft-protocol",
    summary:
      "Liquidity Layer is the trading primitive we shipped for OriginByte assets: a shared, on-chain orderbook (plus auctions) so bids and asks actually meet.",
    details:
      "We launched a centralized on-chain orderbook so listings from different launchpads and venues settle against one book. Limit orders, fills, and auctions share the same liquidity surface. Marketplaces plug in without forking transfer logic, royalties stay enforced on the secondary, and price discovery is not a chat window.",
  },
  {
    slug: "unreal-sdk",
    name: "unreal-sdk",
    language: "C++",
    github: "https://github.com/Origin-Byte",
    summary:
      "Sui Unreal SDK links Unreal applications to Sui and Origin Byte's asset stack, supporting Sui JSON-RPC for Move contracts, transactions, and issuance.",
    details:
      "Drop Sui into Unreal the way you would any other subsystem: RPC, transaction building, wallet flows, and minting against OriginByte collections. Built so product teams ship market features instead of maintaining chain glue.",
  },
  {
    slug: "unity-sdk",
    name: "unity-sdk",
    language: "C#",
    github: "https://github.com/Origin-Byte/sui-unity-sdk",
    summary:
      "Sui Unity SDK lets Unity clients talk to Sui and Origin Byte's asset stack — JSON-RPC, transaction building, and wallet management without a custom stack.",
    details:
      "Identity from anonymous session through email into a wallet, sponsored transactions, and protocol calls from C#. The SDK is free to use and meant to feel like any other Unity package — useful for terminals, showrooms, and interactive desks as much as any other client.",
  },
  {
    slug: "originmate",
    name: "originmate",
    language: "Move",
    github: "https://github.com/Origin-Byte/originmate",
    summary:
      "Originmate, a Move library for Sui, offers essential module building blocks with a focus on security, efficiency, composability, and ease of implementation.",
    details:
      "Critbit trees, permissions, utils, and other primitives that the protocol and orderbook themselves are built on. Use them as a secure starting kit for custom Move modules without reinventing low-level data structures.",
    install: `git = "https://github.com/Origin-Byte/originmate.git"`,
  },
  {
    slug: "suivm",
    name: "suivm",
    language: "Rust",
    github: "https://github.com/Origin-Byte/suivm",
    summary:
      "Sui Version Manager (Suivm) is a command-line tool for streamlined version management of the Sui blockchain CLI, offering easy switching between different versions, akin to NVM for Node.js.",
    details:
      "Pin a Sui CLI per project, hop between testnet and mainnet toolchains, and stop fighting global installs. One binary, same muscle memory as nvm.",
    install: "cargo install suivm",
  },
];

export const values = [
  {
    slug: "open_source",
    name: "open_source",
    summary:
      "Engage with the transparency and collaborative spirit of our open-source projects, such as token-launch and originmate. Contribute to the Origin-Byte ecosystem and leverage the flexibility to tailor markets to your book.",
  },
  {
    slug: "free_to_use",
    name: "free_to_use",
    summary:
      "Embrace issuance and trading without a vendor tax on the primitives. Access unity-sdk and secondary-market at no cost, so desks and issuers can ship unencumbered by licensing.",
  },
  {
    slug: "no_headache",
    name: "no_headache",
    summary:
      "Experience streamlined development with our user-friendly solutions. Whether opting for a launchpad, the orderbook, or token-launch, enjoy a hassle-free integration process and focus on the market, not the plumbing.",
  },
  {
    slug: "evolutionary_creativity",
    name: "evolutionary_creativity",
    summary:
      "Foster a culture of continual innovation with packages like secondary-market and scalable launchpads. Stay at the forefront of on-chain markets, utilizing Origin-Byte's tools to structure, list, and trade digital assets.",
  },
];

export type Partner = {
  name: string;
  href: string;
  logo: string;
  display: "cover" | "wordmark";
  background?: string;
  invert?: boolean;
};

export const partners: Partner[] = [
  {
    name: "Mysten Labs",
    href: "https://mystenlabs.com",
    logo: "/logos/mysten.png",
    display: "cover",
  },
  {
    name: "Hyperspace",
    href: "https://hyperspace.xyz",
    logo: "/logos/hyperspace.jpeg",
    display: "cover",
  },
  {
    name: "Shinami",
    href: "https://www.shinami.com",
    logo: "/logos/shinami.svg",
    display: "wordmark",
    background: "#3D3652",
    invert: true,
  },
  {
    name: "DeepBook",
    href: "https://deepbook.tech",
    logo: "/logos/deepbook.png",
    display: "wordmark",
    background: "#0a0a0a",
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}
