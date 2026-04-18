# luigisimiani.com

Portfolio website for Amsterdam-based photographer Luigi Simiani. Built with Next.js 15, Sveltia CMS, and Tailwind CSS. Deployed on Vercel.

<img width="1432" height="718" alt="Screenshot 2025-11-23 at 12 46 06" src="https://github.com/user-attachments/assets/8b633bea-3dda-4484-b7e8-a018448b1a05" />

## Tech stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sveltia CMS (drop-in replacement for Netlify/Decap CMS, served at `/admin`)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deploy**: Vercel (production). A parallel `cloudflare` branch deploys to Cloudflare Workers via [vinext](https://github.com/cloudflare/vinext).
- **Language**: TypeScript / JavaScript

## Features

- **Password-protected galleries** — per-gallery password set in the CMS, with a secret flower bypass (click the corner flower 5 times, unless the gallery has the `protect` tag)
- **Per-photo gallery routes** — direct-linkable `/gallery/[id]/[photo]` URLs; the lightbox syncs the URL as you arrow through shots, so every image is shareable
- **Downloadable galleries** — client-side ZIP export for any gallery tagged `downloadable`
- **Hero slideshow** with separate portrait (desktop) and landscape (mobile) image slots per slide
- **Featured Work** on a 6-column grid driven by the computed `displaySize` per gallery (`full` / `half` / `third`), with quotes interleaved between rows
- **About-me scroll reveal** — word-by-word paragraph reveal timed against reading pace (`useScroll` + `useTransform` per word)
- **Image optimisation on upload** — Sveltia re-encodes JPEG/PNG/AVIF/GIF uploads to WebP (quality 82, max 2400 px) in the browser before committing, so the repo doesn't bloat with 10+ MB raws

## Gallery tags

| Tag | Effect |
|-----|--------|
| `hero` / `highlight` | Full-width cell in Featured Work (`displaySize: full`) |
| `editorial` / `pair` / `duo` | Half-width cell (`displaySize: half`) |
| `portrait` / `small` / `grid` | Third-width cell (`displaySize: third`) |
| `featured` / `homepage` | Includes the gallery in the Featured Work section — **not a size tag** |
| `hidden` | Excluded from all listings |
| `downloadable` | Adds ZIP download button on the gallery page |
| `protect` | Disables the flower-bypass on password-protected galleries |

## Content structure

```
content/
├── gallery/*.json   # One file per gallery (slug = filename)
├── about.json       # Bio paragraphs + film-strip sources
├── contact.json     # Contact info
└── home.json        # Hero slides (galleryId + desktop/mobile images) + quotes
```

Galleries are static JSON bundled at build time via `app/lib/content.ts` — no runtime fetch. Images live under `public/images/galleries/<Gallery Name>/`.

## Routes

| Path | Rendering |
|---|---|
| `/` | Home (hero slideshow + Featured Work) |
| `/gallery` | Gallery index |
| `/gallery/[id]` | Gallery detail with lightbox |
| `/gallery/[id]/[photo]` | Direct link to a specific photo in the lightbox (1-based) |
| `/about-me` | Bio with scrolling film strip + word-by-word quote reveal |
| `/contact` | Contact form (Resend) |
| `/admin` | Sveltia CMS (requires GitHub auth via `sveltia-cms-auth` Worker) |

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` for the CMS. Sveltia runs entirely in the browser — no CMS server to start. It commits straight to GitHub via `sveltia-cms-auth.leme.workers.dev`, so local `/admin` edits go into the production repo.

## Environment variables

Copy `.env.example` to `.env.local`:

```
GALLERY_PASSWORD_SALT=<salt used to hash gallery passwords>
RESEND_API_KEY=<for /contact form>
```

## Deployment

- **Production**: pushes to `main` auto-deploy on Vercel. `vercel.json` explicitly disables Vercel builds on the `cloudflare` branch so previews don't pile up there.
- **Cloudflare Workers variant**: the `cloudflare` branch uses [vinext](https://github.com/cloudflare/vinext) + `@cloudflare/vite-plugin` and deploys via GitHub Actions. Secrets required on the repo: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
