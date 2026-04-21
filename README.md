# luigisimiani.com

Portfolio website for Amsterdam-based photographer Luigi Simiani. Built with Next.js 16, React 19, and Tailwind CSS.

<img width="1432" height="718" alt="Screenshot 2025-11-23 at 12 46 06" src="https://github.com/user-attachments/assets/8b633bea-3dda-4484-b7e8-a018448b1a05" />

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Runtime**: React 19
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion 12
- **Language**: TypeScript (strict mode)

## Features

- **Password-protected galleries** with secret flower bypass (5 clicks)
- **Downloadable galleries** - client-side ZIP export
- **Hero slideshow** with gallery references
- **Featured work section** with 2-column grid, quotes, and full-width hero items
- **Gallery tags** for layout control and utility functions
- **8-bit themed UI** components for contact form

## Project Structure

```
├── app/
│   ├── (routes)/           # Page routes
│   ├── components/         # App-specific components
│   │   ├── about-me/       # About page components
│   │   ├── contact/        # Contact form components
│   │   ├── gallery/        # Gallery view components
│   │   ├── header/         # Site header
│   │   ├── home/           # Homepage components
│   │   ├── menu/           # Navigation menu
│   │   └── work/           # Gallery/carousel components
│   ├── context/            # React Context
│   └── types/              # TypeScript types
├── components/ui/          # Reusable UI primitives (shadcn)
├── lib/                    # Utilities & animations
├── content/                # CMS JSON content
└── public/                 # Static assets
```

## Gallery Tags

| Tag | Effect |
|-----|--------|
| `hero` | Full-width in Featured Work |
| `hidden` | Excluded from gallery listings |
| `downloadable` | Adds ZIP download button |
| `protect` | Disables flower bypass on password page |

## Content Structure

```
content/
├── gallery/        # Gallery JSON files
├── bio.json        # About page content
├── contact.json    # Contact info
├── featured.json   # Hero slideshow galleries
├── quotes.json     # Featured work quotes
└── settings.json   # Homepage settings
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Run CMS locally
npx decap-server
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` for the CMS.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
RESEND_API_KEY=your-resend-api-key
GALLERY_PASSWORD=your-gallery-password
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed developer documentation including:
- File naming conventions
- Import order guidelines
- Component patterns
- How to add new content
