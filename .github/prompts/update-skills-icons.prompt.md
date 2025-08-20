# Update Skills and Icons

You are helping to update the skills section of a React/Next.js portfolio website. When adding, removing, or updating skills, you MUST update exactly 3 files:

## Required Files to Update:
1. `src/components/skills-section.tsx` - Main skills array
2. `src/components/theme-aware-icon.tsx` - Icon mappings and brand colors  
3. `src/components/skill-card.tsx` - Brand colors for skill cards

## Pattern for Adding a New Skill:

### 1. skills-section.tsx
Add to appropriate section (Frontend, Mobile, Backend, etc.):
```typescript
{ name: "Technology Name" },
```

### 2. theme-aware-icon.tsx
Add icon mapping and brand color:
```typescript
// In skillIconMap
"Technology Name": "logos:technology-icon",

// In getBrandColor function
"Technology Name": "#HEX_COLOR",
```

### 3. skill-card.tsx
Add matching brand color:
```typescript
// In getBrandColor function  
"Technology Name": "#HEX_COLOR",
```

## Icon Selection Priority:
1. `logos:` - Official brand logos (preferred)
2. `simple-icons:` - Simple brand icons
3. `lucide:` - Generic icons for concepts

## Brand Colors:
- Use official hex colors from brand guidelines
- For theme-adaptive icons (like Vercel), use `#000000` 
- Popular examples: React `#61DAFB`, TypeScript `#3178C6`, AWS `#FF9900`

## Theme-Adaptive Icons:
For black/white logos that need theme adaptation, add CSS rule to `src/styles/theme-adaptive-icons.css`:
```css
.dark .theme-adaptive-icon[data-icon*="icon-name"] {
  --icon-filter: invert(1) brightness(0.9);
}
```

Always update all 3 files consistently with matching colors and proper icon names.
