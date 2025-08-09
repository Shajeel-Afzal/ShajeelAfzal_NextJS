# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio and consultation platform built with Next.js 15.4.6, designed for a Certified Mobile Apps Developer, ChatBots Developer, and AI Engineer. The platform serves as a comprehensive personal website to showcase expertise, attract clients, and monetize knowledge through digital products and consultations.

## Key Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production version  
npm start           # Start production server
npm run lint        # Run ESLint checks
```

### Package Management
```bash
npm install                    # Install dependencies
npx shadcn@latest add <component>  # Add shadcn/ui components
```

## Architecture & Tech Stack

### Frontend Stack
- **Next.js 15.4.6** with App Router (src/app/ structure)
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling with PostCSS
- **shadcn/ui** components (New York style, configured in components.json)
- **Magic UI** component library built on shadcn
- **Lucide React** for icons
- **Motion** (formerly Framer Motion) for animations

### Key Dependencies
- **cobe**: 3D globe visualization (used in Magic UI Globe component)
- **class-variance-authority & clsx**: Component styling utilities
- **tailwind-merge**: Tailwind class merging utility

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with Geist fonts
│   └── page.tsx           # Homepage component
├── components/
│   └── magicui/          # Magic UI components
│       └── globe.tsx     # Interactive 3D globe component
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## Configuration Files

- **components.json**: shadcn/ui configuration (New York style, CSS variables enabled)
- **tsconfig.json**: TypeScript config with strict mode and @/* path aliases
- **postcss.config.mjs**: PostCSS with @tailwindcss/postcss plugin
- **eslint.config.mjs**: ESLint configuration
- **next.config.ts**: Next.js configuration

## Development Guidelines

### Component Development
- Use TypeScript interfaces for all component props
- Follow shadcn/ui patterns for component structure
- Utilize the @/ path alias for imports (configured in tsconfig.json)
- Components should be responsive-first using Tailwind breakpoints

### Styling Approach
- Use Tailwind CSS utility classes
- Leverage CSS variables for theming (configured in components.json)
- Use the `cn()` utility from @/lib/utils for conditional classes
- Follow the established design system from Magic UI

### Key Features to Implement
Based on internal_docs/project_requirements.md, the platform will include:

1. **MVP Features (High Priority)**:
   - SEO-optimized landing page with portfolio showcase
   - Consultation booking system with calendar integration
   - Blog platform powered by Strapi CMS
   - WhatsApp channel integration
   - Contact forms with validation
   - Analytics integration (PostHog)

2. **Phase 2 Features**:
   - Digital marketplace with Stripe payments
   - AI assistant using Assistant-UI
   - Services catalog with detailed pricing
   - Testimonials system
   - Subscription management via RevenueCat

3. **Future Features**:
   - Premium content gating
   - Interactive AI demonstrations
   - Client portal for project tracking
   - Community forum

### Performance Requirements
- Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Mobile-first responsive design
- Image optimization using next/image
- SEO optimization with meta tags and structured data

### Integration Points
The platform is designed to integrate with:
- **Strapi CMS** for content management
- **Supabase** for database and authentication
- **Vercel** for hosting and deployment  
- **CloudFlare** for CDN and security
- **Stripe** for payments
- **PostHog** for analytics
- **WhatsApp Business API** for communication

### Development Notes
- The current implementation includes a demo Magic UI Globe component showcasing the interactive 3D globe
- Uses Turbopack for faster development builds
- Font optimization with Geist and Geist Mono from Google Fonts
- Dark mode support is configured in the component library

### Testing & Quality
- Run `npm run lint` before committing changes
- Ensure TypeScript compilation passes without errors
- Test responsive behavior on multiple screen sizes
- Verify accessibility compliance (target WCAG 2.1 AA)

## Target Audience
- **Primary**: Tech-savvy entrepreneurs seeking mobile/AI development services
- **Secondary**: Aspiring freelancers and agency owners
- **Tertiary**: AI technology enthusiasts and professionals

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
