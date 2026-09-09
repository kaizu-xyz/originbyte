export type DocsNavItem = {
  slug: string;
  title: string;
  children?: DocsNavItem[];
};

export const docsNav: DocsNavItem[] = [
  { slug: "overview", title: "Overview" },
  { slug: "about-sui", title: "About Sui" },
  { slug: "programs", title: "About our programs" },
  { slug: "program-library", title: "Program library" },
  {
    slug: "nft-protocol",
    title: "NFT Protocol",
    children: [
      {
        slug: "nft-protocol/standards",
        title: "Standards",
        children: [{ slug: "nft-protocol/standards/loose-nfts", title: "Loose NFTs" }],
      },
      {
        slug: "nft-protocol/domains",
        title: "Domains",
        children: [
          {
            slug: "nft-protocol/domains/data-driven",
            title: "Data-driven",
            children: [
              { slug: "nft-protocol/domains/data-driven/attributes", title: "Attributes" },
              { slug: "nft-protocol/domains/data-driven/creators", title: "Creators" },
              { slug: "nft-protocol/domains/data-driven/displayinfo", title: "DisplayInfo" },
              { slug: "nft-protocol/domains/data-driven/supply", title: "Supply" },
              { slug: "nft-protocol/domains/data-driven/svg", title: "SVG" },
              { slug: "nft-protocol/domains/data-driven/symbol", title: "Symbol" },
              { slug: "nft-protocol/domains/data-driven/tags", title: "Tags" },
            ],
          },
          { slug: "nft-protocol/domains/logic-driven", title: "Logic-driven" },
        ],
      },
      {
        slug: "nft-protocol/minting",
        title: "NFT minting",
        children: [
          { slug: "nft-protocol/minting/mintcap", title: "MintCap" },
          { slug: "nft-protocol/minting/mint-events", title: "Mint events" },
          { slug: "nft-protocol/minting/mint-passes", title: "Mint passes" },
        ],
      },
      { slug: "nft-protocol/kiosk", title: "OriginByte Kiosk" },
      {
        slug: "nft-protocol/permissions",
        title: "Permissions",
        children: [
          { slug: "nft-protocol/permissions/access-policies", title: "Access policies" },
          { slug: "nft-protocol/permissions/delegated-witness", title: "Delegated witness" },
          { slug: "nft-protocol/permissions/mutlocks", title: "Mutlocks" },
          { slug: "nft-protocol/permissions/quorum", title: "Quorum" },
        ],
      },
      { slug: "nft-protocol/royalty", title: "Royalty enforcement" },
    ],
  },
  {
    slug: "launchpad",
    title: "Launchpad",
    children: [
      { slug: "launchpad/fixed-price-sale", title: "Fixed-price sale" },
      { slug: "launchpad/dutch-auctions", title: "Dutch auctions" },
    ],
  },
  {
    slug: "liquidity-layer",
    title: "Liquidity layer",
    children: [
      { slug: "liquidity-layer/orderbook", title: "Orderbook" },
      { slug: "liquidity-layer/bidding", title: "Bidding contract" },
    ],
  },
  { slug: "endpoints", title: "Endpoints" },
  { slug: "cli", title: "CLI" },
  { slug: "schema", title: "Schema" },
  {
    slug: "for-creators",
    title: "For creators",
    children: [
      {
        slug: "for-creators/create-and-deploy-the-move-module",
        title: "Create and deploy a Move module",
      },
      {
        slug: "for-creators/deploy-pictures-to-off-chain-storage",
        title: "Off-chain storage",
      },
      {
        slug: "for-creators/mint-nfts-via-the-javascript-sdk",
        title: "Mint via the JS SDK",
      },
      {
        slug: "for-creators/prepare-primary-market-sale",
        title: "Prepare a primary sale",
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend",
    children: [
      { slug: "frontend/create-a-marketplace-launchpad", title: "Create a marketplace" },
      { slug: "frontend/create-an-nft-listing", title: "Create a listing" },
      { slug: "frontend/prepare-nfts-for-sale", title: "Prepare NFTs for sale" },
    ],
  },
  {
    slug: "game-developers",
    title: "Game developers",
    children: [
      { slug: "unity-sdk", title: "Unity SDK" },
      { slug: "unreal-sdk", title: "Unreal SDK" },
      { slug: "suiplay-unity", title: "SuiPlay for Unity" },
      { slug: "suiplay-unreal", title: "SuiPlay for Unreal" },
    ],
  },
  {
    slug: "partners",
    title: "Partners",
    children: [
      { slug: "partners/shinami", title: "Shinami" },
      { slug: "partners/clutchy", title: "Clutchy" },
      { slug: "partners/notifi", title: "Notifi" },
      { slug: "partners/mentaport", title: "Mentaport" },
    ],
  },
];

const files = import.meta.glob("./pages/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type DocPage = {
  slug: string;
  title: string;
  markdown: string;
};

function slugFromFile(path: string) {
  return path.replace(/^\.\/pages\//, "").replace(/\.md$/, "");
}

function parseRaw(raw: string, fallbackTitle: string): { title: string; markdown: string } {
  const match = raw.match(/^# (.+)\n+([\s\S]*)$/);
  if (match) return { title: match[1].trim(), markdown: match[2].trim() };
  return { title: fallbackTitle, markdown: raw.trim() };
}

export const docsPages: DocPage[] = Object.entries(files)
  .filter(([path]) => !path.endsWith("manifest.json"))
  .map(([path, raw]) => {
    const slug = slugFromFile(path);
    const parsed = parseRaw(raw, slug);
    return { slug, title: parsed.title, markdown: parsed.markdown };
  });

const bySlug = new Map(docsPages.map((p) => [p.slug, p]));

export function getDoc(slug: string) {
  return bySlug.get(slug);
}
