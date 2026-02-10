# Wedding Website - Copilot Instructions

## Project Overview

This is a single-page wedding website built with React 19, TypeScript, Vite, and Tailwind CSS v4. It uses React Router for navigation (home page and gallery detail pages) and integrates with Google Apps Script for RSVP form submissions.

## Build, Test, and Lint Commands

```bash
# Development server (HMR enabled)
npm run dev

# Production build (runs TypeScript compiler first)
npm run build

# Preview production build locally
npm run preview

# Lint all files
npm run lint
```

**Note:** There are no test scripts configured in this project.

## Architecture

### Component Structure

The app follows a **section-based architecture** for the home page:

- **`src/pages/`** - Top-level page components (HomePage, GalleryDetailPage)
- **`src/components/sections/`** - Full-page sections that are composed together in HomePage
  - Each section (Cover, OurStory, CeremonyDetails, Schedule, Venue, RSVPForm, Gallery, GiftRegistry) is a self-contained module
  - Sections are rendered sequentially on the home page
- **`src/components/ui/`** - Reusable shadcn/ui components (Button, Card, Carousel, etc.)
- **`src/components/`** - Shared components like Navigation and Logo

### Data Management

- **`src/constants/config.ts`** - Application configuration (RSVP webhook URL)
- **`src/constants/galleryData.ts`** - Gallery photo data structure

### Routing

Simple two-page structure:
- `/` - Home page with all sections
- `/gallery/:galleryId` - Gallery detail page

## Key Conventions

### Import Aliases

Use the `@/` alias for all imports from `src/`:

```typescript
import Logo from '@/components/Logo'
import { RSVP_WEBHOOK_URL } from '@/constants/config'
```

Configured in both `vite.config.ts` and `tsconfig.json`.

### shadcn/ui Integration

This project uses shadcn/ui with the **New York** style variant. Component configuration is in `components.json`:

- Base color: neutral
- CSS variables: enabled
- Icon library: lucide-react
- Components are in `src/components/ui/`

When adding new shadcn components, they should follow this existing configuration.

### Styling

- **Tailwind CSS v4** with the Vite plugin
- Custom brand colors used throughout:
  - Primary beige: `#d4c5ad`
  - Lighter beige: `#eee5d5`
  - Dark brown: `#2a2722`
- Background images are imported from `@/assets/images/` and used inline with the `style` prop

### Form Submissions

RSVP form submissions are sent to a Google Apps Script webhook URL defined in `src/constants/config.ts`. The webhook URL should be updated after deploying the Apps Script.

### Section Navigation

The Navigation component uses hash-based anchor links (`#home`, `#our-story`, etc.) to navigate to sections on the home page. Each section in `src/components/sections/` should have a corresponding `id` attribute.

## Skills to Apply

This project has additional skill definitions in `.github/skills/` that should be applied when relevant:

- **`vercel-react-best-practices/`** - React performance optimization patterns (avoid barrel imports, use Promise.all(), minimize waterfalls, optimize bundle size)
- **`frontend-design/`** - Creative UI/UX guidelines (distinctive typography, bold aesthetics, avoid generic AI patterns like Inter font or purple gradients)
- **`web-artifacts-builder/`** - Complex React artifact creation workflow with shadcn/ui

**Important:** When making suggestions or modifications, proactively read and apply the relevant skill definitions from `.github/skills/` to ensure best practices are followed.
