export type DocPage = {
  slug: string;
  title: string;
  body: { heading?: string; paragraphs: string[]; code?: string }[];
};

export const docsNav = [
  { slug: "overview", title: "Overview" },
  { slug: "token-launch", title: "Token Launch" },
  { slug: "secondary-market", title: "Secondary Market" },
  { slug: "unity-sdk", title: "Unity SDK" },
  { slug: "unreal-sdk", title: "Unreal SDK" },
  { slug: "originmate", title: "Originmate" },
  { slug: "suivm", title: "suivm" },
];

export const docsPages: DocPage[] = [
  {
    slug: "overview",
    title: "Composable trading layer on Sui",
    body: [
      {
        paragraphs: [
          "OriginByte is an ecosystem of standards and tooling for Sui. The goal is simple: you structure, issue, and trade digital assets — we make the chain part boring, correct, and free.",
          "The stack splits into three layers. A programmable NFT standard (collections, domains, royalties). Primary and secondary markets (scalable launchpads, a shared orderbook, auctions). Client SDKs for Unity and Unreal that talk Sui JSON-RPC without a Move specialist on payroll.",
        ],
      },
      {
        heading: "Public goods",
        paragraphs: [
          "token-launch, originmate, secondary-market, and both engine SDKs are open source and free to use. Fork them, compose on them, or drop them into an existing issuance.",
        ],
      },
    ],
  },
  {
    slug: "token-launch",
    title: "Token Launch",
    body: [
      {
        paragraphs: [
          "A developer framework for digital assets on Sui — not a single rigid NFT type. Collections and assets are modelled after entity-component systems: domains attach by type and can be acquired or lost over an object's lifetime.",
          "Core types cover Collection, MintCap, Kiosk, Listing, and launchpad primitives. Royalties are enforced in the transfer path so secondary sales cannot bypass issuers.",
        ],
      },
      {
        heading: "Scalable launchpads",
        paragraphs: [
          "Primary issuance is a first-class surface. Launchpads can manage whitelists with centralized accounting, start sales from an on-chain timestamp, and run multiple listings without a custom sale contract per drop. Size from one collection to a desk running many issuances on the same rails.",
        ],
      },
      {
        heading: "Add as a Move dependency",
        paragraphs: ["Pin the protocol from GitHub in your Move.toml."],
        code: `[dependencies.NftProtocol]
git = "https://github.com/Origin-Byte/nft-protocol.git"`,
      },
    ],
  },
  {
    slug: "secondary-market",
    title: "Secondary Market",
    body: [
      {
        paragraphs: [
          "We launched an on-chain orderbook for OriginByte assets. That is the point of secondary-market: a shared book where bids and asks rest, fill, and settle — not a set of isolated listing pages.",
          "Listings from different launchpads and venues meet on the same book, which is what actually produces liquidity. Auctions sit beside the orderbook for price discovery when a sale needs a clock instead of a limit.",
          "Permissionless marketplaces can attach to a listing. Sales can start from an on-chain timestamp so issuance does not depend on a bot clicking go. Royalties stay in the transfer path on the secondary.",
        ],
      },
    ],
  },
  {
    slug: "unity-sdk",
    title: "Sui Unity SDK",
    body: [
      {
        paragraphs: [
          "C# bindings for Sui JSON-RPC, transaction building, wallet management, and OriginByte mint and trade flows. Identity can start anonymous, graduate to email, then to a wallet — without you writing three auth stacks.",
          "The package is free. Treat it like any other Unity feature: import, call, ship — including interactive desks, showrooms, and client terminals.",
        ],
      },
    ],
  },
  {
    slug: "unreal-sdk",
    title: "Sui Unreal Engine SDK",
    body: [
      {
        paragraphs: [
          "The Unreal SDK mirrors the Unity surface: RPC, Move calls, transactions, and issuance against OriginByte collections. Built so Unreal teams never have to maintain a custom blockchain plugin to talk to the protocol or the orderbook.",
        ],
      },
    ],
  },
  {
    slug: "originmate",
    title: "Originmate",
    body: [
      {
        paragraphs: [
          "A Move library of module building blocks — permissions, critbit, utils — with a bias toward security and composability. The Token protocol and orderbook are built on it; your contracts can be too.",
        ],
        code: `[dependencies.Originmate]
git = "https://github.com/Origin-Byte/originmate.git"`,
      },
    ],
  },
  {
    slug: "suivm",
    title: "Sui Version Manager",
    body: [
      {
        paragraphs: [
          "suivm switches Sui CLI versions the way nvm switches Node. Keep a toolchain per repo, hop between network releases, and stop polluting a global install.",
        ],
        code: "cargo install suivm\nsuivm use <version>",
      },
    ],
  },
];

export function getDoc(slug: string) {
  return docsPages.find((d) => d.slug === slug);
}
