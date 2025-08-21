# GitHub Copilot Instructions

## Project Overview
This is a professional portfolio and consultation platform built with **Next.js 15.4.6** using the App Router, designed to showcase AI engineering and mobile development expertise. The project emphasizes performance, SEO optimization, and modern developer experience.

## Architecture & Tech Stack

### Core Framework
- **Next.js 15.4.6** with App Router (`src/app/` structure)
- **TypeScript** in strict mode with `@/*` path aliases
- **Tailwind CSS v4** with PostCSS for styling
- **shadcn/ui** component library (New York style) + **Magic UI** enhancements

### Key Technologies
- **Motion/Framer Motion** for animations (`motion` package, not `framer-motion`)
- **Lucide React** for icons (configured as primary icon library)
- **next-themes** for dark/light mode theming
- **cobe** for 3D globe visualizations

## Development Patterns

### Component Architecture
```typescript
// Use TypeScript interfaces for all component props
interface ComponentProps {
  title: string;
  description?: string;
}

// Follow shadcn/ui patterns with Magic UI enhancements
import { MagicCard } from "@/components/magicui/magic-card";
import { cn } from "@/lib/utils";
```

### Styling Conventions
- Use **Tailwind utility classes** with the `cn()` helper from `@/lib/utils`
- CSS variables enabled for theming (`components.json` configuration)
- Magic UI components use gradient effects with specific props:
  ```typescript
  <MagicCard
    gradientSize={300}
    gradientColor="rgba(59, 130, 246, 0.15)"
    gradientOpacity={0.8}
  />
  ```

### Data Management
- **Services pattern**: Centralized in `src/lib/services/` (e.g., `youtube.service.ts`)
- **Type definitions**: Located in `src/types/` directory
- **Configuration data**: Structured exports from `src/data/` (see `services.ts`)
- **Caching strategy**: Built-in cache service for API responses (`cache.service.ts`)

## File Organization

### Key Directories
- `src/components/`: React components with sub-folders for `ui/`, `magicui/`, and `customized/`
- `src/lib/`: Utilities, services, and shared logic
- `src/data/`: Static configuration and content (services, testimonials, etc.)
- `src/types/`: TypeScript type definitions
- `internal_docs/`: Project requirements and documentation

### Component Structure
```
src/components/
├── ui/              # shadcn/ui base components
├── magicui/         # Magic UI enhanced components
├── customized/      # Project-specific customizations
└── [feature].tsx    # Main feature components
```

## Development Workflows

### Essential Commands
```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run lint         # ESLint checks
npx shadcn@latest add <component>  # Add shadcn components
```

### Performance Requirements
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Image optimization**: Use `next/image` with `priority` for above-fold content
- **Font optimization**: Geist fonts with `display: "swap"` and preload
- **Resource hints**: DNS prefetch and preconnect for external resources

## API Integration Patterns

### Service Architecture
```typescript
// Services use singleton pattern with caching
export class YouTubeService {
  private readonly cache: CacheService;
  constructor() {
    this.cache = new CacheService('youtube', 15 * 60 * 1000);
  }
}
export const youtubeService = new YouTubeService();
```

### Error Handling
- **Graceful fallbacks**: Mock data when APIs fail
- **Development vs Production**: Different behavior based on `NODE_ENV`
- **Rate limiting awareness**: Built-in caching to reduce API calls

## SEO & Performance Optimizations

### Metadata Structure
- **Comprehensive metadata**: OpenGraph, Twitter cards, structured data
- **Dynamic metadata**: Page-specific SEO configuration
- **Schema markup**: JSON-LD structured data in `structured-data.tsx`

### Image Optimization
```typescript
// Standard pattern for optimized images
<Image
  src="/images/shajeel_afzal.png"
  alt="Descriptive alt text"
  fill or {width/height}
  priority={above-fold}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Magic UI Integration

### Common Components
- `MagicCard`: Enhanced cards with gradient effects
- `AnimatedGridPattern`: Background grid animations
- `AuroraText`: Text with aurora effects
- `TextAnimate`: Text animation utilities
- `NumberTicker`: Animated number counters

### Animation Principles
- Use `Motion` components sparingly for performance
- Prefer CSS animations over JavaScript where possible
- Implement loading states and skeleton screens

## Environment Configuration

### Required Environment Variables
```bash
YOUTUBE_API_KEY=         # For video content
YOUTUBE_CHANNEL_ID=      # Channel identification
YOUTUBE_CHANNEL_HANDLE=  # For social links
```

### Development Setup
- **Hot reload**: Turbopack for faster development builds
- **Type checking**: Continuous TypeScript validation
- **ESLint**: Code quality enforcement

## Common Gotchas

### Magic UI Dependencies
- Some components require specific peer dependencies (`cobe` for Globe)
- Check `internal_docs/magicui/components/` for implementation details

### Next.js App Router
- Use `"use client"` directive for client-side interactions
- Server components by default - optimize for SSR/SSG
- Dynamic imports for heavy client-side components

### Styling Conflicts
- Tailwind v4 syntax may differ from v3 (check PostCSS config)
- Use `cn()` utility to merge classes properly with `tailwind-merge`

## Project Goals
Focus on **performance**, **accessibility** (WCAG 2.1 AA), and **conversion optimization**. The platform serves three user types: tech entrepreneurs (primary), aspiring freelancers (secondary), and AI enthusiasts (tertiary). All features should support the core business objectives of client acquisition and knowledge monetization.
