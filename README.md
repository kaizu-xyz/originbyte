# OriginByte

Public goods for Sui — a programmatic trading layer: `token-launch`, `secondary-market`, and client SDKs.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run typecheck
```

The production build is static (no Vercel / Node server). Output lives in `dist/client`.

## GitHub Pages

Push to `main` and GitHub Actions publishes `dist/client` to Pages.

Live URL: **https://originbyte.fi** (also `https://kaizu-xyz.github.io/originbyte/` until DNS is pointed).

The repo must be **public** (GitHub Pages on a private repo needs a paid plan). In the repo: **Settings → Pages → Source: GitHub Actions**, custom domain `originbyte.fi`, then **Enforce HTTPS** once DNS is valid.

### EuroDNS

Replace parking records. Leave MX alone if you use email.

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `kaizu-xyz.github.io.` |

Path: **DOMAINS → ACTIVE → originbyte.fi → Manage → EDIT DNS ZONE**. GitHub issues the SSL cert after those records resolve.
