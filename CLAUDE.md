# Luigi Simiani Photography Portfolio

## Project Overview

Next.js 16 photography portfolio with React 19, TypeScript, Framer Motion animations, and Decap CMS for content management.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom CSS
- **Animation**: Framer Motion 12
- **CMS**: Decap CMS (content in `/content/`)
- **UI Components**: shadcn/ui + 8-bit themed components

## Project Structure

```
├── app/
│   ├── (routes)/           # Page routes
│   │   ├── page.tsx        # Home
│   │   ├── about-me/
│   │   ├── contact/
│   │   └── gallery/[id]/
│   ├── components/         # App-specific components
│   │   ├── about-me/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── header/
│   │   ├── home/
│   │   ├── menu/
│   │   └── work/
│   ├── context/            # React Context (UIContext)
│   ├── actions/            # Server actions
│   ├── types/              # TypeScript types
│   └── styles/             # Global CSS
├── components/ui/          # Reusable UI primitives (shadcn)
├── lib/                    # Utilities
│   ├── animations.ts       # All Framer Motion configs
│   ├── constants.ts        # App constants
│   ├── content.ts          # CMS content fetching
│   ├── getBase64.ts        # Image blur placeholders
│   └── utils.ts            # cn() utility
├── content/                # CMS JSON content
│   ├── gallery/            # Gallery data
│   └── settings/           # Site settings
└── public/                 # Static assets
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase `.tsx` | `Header.tsx` |
| Utilities | camelCase `.ts` | `utils.ts` |
| Constants | camelCase `.ts` | `constants.ts` |
| Folders | kebab-case | `about-me/` |
| Route pages | `page.tsx` | `app/(routes)/gallery/page.tsx` |

## Import Order

1. React/Next.js (`react`, `next/*`)
2. External libraries (`framer-motion`, `rooks`, etc.)
3. `@/lib/*` utilities
4. `@/app/components/*`
5. `@/components/ui/*`
6. Relative imports (`./`, `../`)

## Component Patterns

### Props Interface
```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  // ...
}
```

### Conditional Classes
```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />
```

### Animations
Import from centralized animations file:
```tsx
import { fadeIn, carouselAnimationProps } from "@/lib/animations";

<motion.div {...fadeIn}>
```

### Context Usage
```tsx
import { useUI } from "@/app/context/UIContext";

const { isMenuVisible, toggleMenu } = useUI();
```

## Adding Content

### New Gallery
1. Add JSON file to `/content/gallery/[id].json`
2. Include required fields: `id`, `title`, `imageUrls`
3. Optional: `subTitle`, `description`, `coverPhoto`, `tags`

### Gallery JSON Schema
```json
{
  "id": "gallery-slug",
  "title": "Gallery Title",
  "subTitle": "Optional subtitle",
  "description": "Optional description",
  "coverPhoto": "/images/galleries/cover.jpg",
  "imageUrls": ["/images/galleries/img1.jpg"],
  "tags": ["featured", "fashion"]
}
```

## Key Files

| File | Purpose |
|------|---------|
| `app/context/UIContext.tsx` | Global UI state (menu visibility) |
| `lib/animations.ts` | All Framer Motion animation configs |
| `lib/content.ts` | CMS content fetching functions |
| `app/types/content.ts` | TypeScript types for content |

## Environment Variables

```bash
# .env.local
RESEND_API_KEY=       # For contact form emails
GALLERY_PASSWORD=     # For protected galleries
```

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
