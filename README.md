# Wedding Website

A beautiful, modern wedding website built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Features

- 🎨 Modern, elegant design with custom beige/brown color scheme
- 📱 Fully responsive for mobile, tablet, and desktop
- 🎭 Smooth animations and transitions
- 📸 Photo gallery with detailed views
- 📝 RSVP form with Google Apps Script integration
- ⚡ Fast loading with Vite
- 🎯 Section-based architecture for easy navigation

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool with HMR
- **Tailwind CSS v4** - Utility-first CSS with custom design tokens
- **React Router** - Client-side routing
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── sections/      # Full-page sections (Cover, OurStory, etc.)
│   ├── ui/           # Reusable shadcn/ui components
│   └── ...           # Shared components (Navigation, Logo)
├── constants/        # Configuration and data
├── pages/           # Page components (HomePage, GalleryDetailPage)
├── assets/          # Images and fonts
└── lib/            # Utility functions
```

## Deployment

The site is configured for deployment to GitHub Pages using GitHub Actions.

### Quick Deploy

1. Push to the `main` branch - deployment happens automatically
2. Or manually trigger deployment from the Actions tab

### Setup Instructions

For detailed deployment setup and configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md)

The site will be available at: `https://chai-un.github.io/hn-wedding/`

## Configuration

### RSVP Form

The RSVP form submits to a Google Apps Script webhook. Update the webhook URL in:

```typescript
// src/constants/config.ts
export const RSVP_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```

### Gallery Photos

Add gallery photos to `src/constants/galleryData.ts`:

```typescript
export const galleries = [
  {
    id: 'gallery-name',
    title: 'Gallery Title',
    images: ['image1.jpg', 'image2.jpg']
  }
];
```

### Styling

Custom colors are defined in the codebase:
- Primary beige: `#d4c5ad`
- Lighter beige: `#e8dcc8`
- Dark brown: `#2a2722`

## Development

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add it to `HomePage.tsx`
3. Update navigation links in `Navigation.tsx`

### shadcn/ui Components

This project uses shadcn/ui with the New York style variant. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## License

Private project - All rights reserved

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
