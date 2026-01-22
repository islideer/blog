# GitHub Copilot Instructions

You are an expert AI programming assistant working on a Next.js 16 + React 19 + Tailwind CSS v4 blog project.

## Core Principles

1.  **Modernity First**: Use modern browser features and the latest Web standards.
2.  **Performance**: Prioritize performance with hybrid rendering (Static Generation + Dynamic API).
3.  **Content-Centric**: Focus on content presentation and writing experience.
4.  **Simplicity**: Keep code clean, readable, and maintainable.

## Tech Stack

### Core

- **Framework**: Next.js 16.1.1 (App Router, SSG + ISR)
- **Library**: React 19.3.0 (Server Components + React Compiler)
- **Language**: TypeScript 5.9.3 (Strict mode)

### Styling & Theming

- **Styling**: Tailwind CSS v4.1.18 (CSS-first config, OKLCH colors)
- **Theme**: next-themes 0.4.6 (light/dark/system modes)

### Content & Markdown

- **Format**: Markdown (`.md` files, NOT MDX)
- **Processing**: unified ecosystem
  - **remark** 15.0.1 + **remark-gfm** 4.0.1 (Markdown parsing)
  - **remark-breaks** 4.0.0 (Line break handling)
  - **rehype-slug** 6.0.0 + **rehype-autolink-headings** 7.1.0 (Heading anchors)
  - **@shikijs/rehype** 3.21.0 (Dual-theme code highlighting: `one-light` / `one-dark-pro`)
  - **rehype-external-links** 3.0.0 (External link processing)
  - Custom plugins: `remark-spoiler` (||text||), `rehype-zoom-image` (Image zoom)
- **Caching**: LRU cache (max 500 HTML outputs)

### Utilities

- **Time**: dayjs 1.11.19 (relative time, Chinese localization)
- **OG Images**: @vercel/og 0.8.6 (Dynamic OG image generation)
- **RSS**: feed 5.1.0 (RSS 2.0 generation)
- **Image Zoom**: medium-zoom 1.1.0 / react-medium-image-zoom 5.4.0
- **Typography**: pangu 7.2.0 (Chinese/English spacing)

### Development

- **Package Manager**: pnpm 10.25.0
- **Testing**: Vitest
- **Formatting**: Prettier (no semi, single quote, trailing comma)

## Design System

- **Style**: Flat design, minimalist.
- **Color Palette**: Strict Black/White/Gray scale for UI.
  - Avoid shadows (`box-shadow: none`).
  - Use borders and background colors for separation.
- **Typography**: System fonts stack with optimized reading experience.
- **Shapes**: Small border radius (2px - 6px).
  - `xs`: 2px
  - `sm`: 4px
  - `md`: 6px

## Code Style & Conventions

### Naming Conventions

- **Component Files**: `kebab-case` (e.g., `theme-toggle.tsx`, `about-intro.tsx`)
- **Exported Components**: `PascalCase` (e.g., `export function ThemeToggle`)
- **Utility Functions**: `camelCase` (e.g., `calculateReadingTime`, `formatDate`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_CACHE_SIZE`)
- **Pages**: Follow Next.js conventions (`page.tsx`, `layout.tsx`)

### TypeScript

- Use strict type checking.
- Prefer interfaces for object definitions.
- Avoid `any` type.
- Use type inference where obvious.

### Formatting (Prettier)

- Semi: `false`
- Single Quote: `true`
- Trailing Comma: `all`
- Tab Width: `2`
- Print Width: `100`

### Chinese Typography (Pangu)

- **Punctuation**: Use Chinese punctuation for Chinese text (`，。！？；：「」【】`).
- **Spacing**: Add a space between Chinese and English/Numbers (e.g., `使用 React 开发`, `距今 100 天`).

### Imports

- Use absolute imports with `@/` alias (e.g., `import { siteConfig } from '@/lib/config'`).
- Group imports: Built-in -> External -> Internal.

### ClassName Management

Always use `cn` utility (`lib/cn.ts`) for merging Tailwind classes, not template string concatenation.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: React components (kebab-case).
  - `icons/`: SVG icon components directory.
  - `icon-link.tsx`: Icon wrapper with link and tooltip.
  - `article-content.tsx`: Blog post Markdown rendering (Server Component).
  - `markdown-lite.tsx`: Lightweight Markdown rendering (Server Component).
  - `thought-card.tsx`: Thought/Mio-says card component.
  - `thoughts-list.tsx`: Thoughts list with CSS content-visibility optimization.
- `lib/`: Utility functions and configurations.
  - `lib/config.ts`: Site configuration (loads from `data/site.json`).
  - `lib/data.ts`: Static data exports (loads from `data/*.json`).
  - `lib/markdown.ts`: Markdown parser (unified + Shiki).
- `data/`: Static JSON data files (site config, pages metadata, etc.).
- `posts/`: Markdown content organized by year.

## Markdown Rendering

The project uses **unified ecosystem** (NOT MDX or next-mdx-remote):

### Two Processing Pipelines

**Short Content Processor** (for thoughts/mio-says):

- Enables `remark-breaks` - single newline becomes `<br>`
- Spoiler syntax support: `||spoiler text||`
- Dual-theme code highlighting (Shiki)

**Article Processor** (for blog posts):

- Auto-generates heading IDs (`rehype-slug`)
- Adds anchor links to headings (`rehype-autolink-headings`)
- Marks images as zoomable (`rehype-zoom-image`)
- Adds `target="_blank"` to external links

### Usage

```typescript
// For blog articles (with heading anchors)
import { ArticleContent } from '@/components/article-content'
<ArticleContent content={post.content} />

// For short content like thoughts (with line breaks)
import { MarkdownLite } from '@/components/markdown-lite'
<MarkdownLite content={thought.content} />
```

### Shiki Dual-Theme Configuration

```typescript
.use(rehypeShiki, {
  themes: {
    light: 'one-light',
    dark: 'one-dark-pro',
  },
  defaultColor: false,           // No default background
  cssVariablePrefix: '--shiki-', // CSS variable prefix
})
```

CSS automatically switches based on theme:

```css
/* Light mode */
.prose pre span {
  color: var(--shiki-light);
}

/* Dark mode */
html.dark .prose pre span {
  color: var(--shiki-dark);
}
```

### LRU Caching

- Maximum 500 cached HTML outputs in memory
- Automatically evicts oldest entries when full
- Significantly improves performance for repeated renders

### Key Files

- `lib/markdown.ts`: Core parsers (`parseMarkdown()`, `parseArticle()`)
- `lib/remark-spoiler.ts`: Custom spoiler syntax plugin
- `lib/rehype-zoom-image.ts`: Custom image zoom plugin

## Data Management

- **Static Data**: All static data (site config, author info, links) should be stored in `data/*.json`.
- **Access**: Access data via `lib/config.ts` or `lib/data.ts`.
- **Avoid Hardcoding**: Do not hardcode strings like URLs, author names, or site titles in components. Use `siteConfig` or relevant data exports instead.

## SVG Icons

### Organization

- **Centralized**: All SVG icons must be in `components/icons/` directory.
- **Individual Files**: Each icon is a separate component file (kebab-case, e.g., `moon.tsx`).
- **Type-Safe**: Every icon component has TypeScript interface.
- **Flexible**: Icons accept `className` prop for customization.

### Creating New Icons

```typescript
// components/icons/example.tsx
interface ExampleIconProps {
  className?: string
}

export function ExampleIcon({ className }: ExampleIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="..." />
    </svg>
  )
}
```

### Icon Guidelines

- ✅ Place new icons in `components/icons/`.
- ✅ Use `className` prop for styling flexibility.
- ✅ Use `currentColor` for theme compatibility.
- ❌ Do not inline SVGs in components unless single-use.
- ❌ Do not hardcode sizes or colors in icon components.

### Icon with Link

For icons with links, use the `icon-link.tsx` wrapper:

```typescript
import { IconLink } from './icon-link'
import { GitHubIcon } from './icons/github'

<IconLink href="..." tooltip="GitHub" icon={<GitHubIcon className="h-4 w-4" />} />
```

## Common Tasks

### Adding New Components

1.  Create file in `components/` using `kebab-case`.
2.  Use `'use client'` only if interactivity is needed.
3.  Export as named export.

### Adding New Icons

1.  Create file in `components/icons/` using `kebab-case`.
2.  Follow the icon template with `className` prop.
3.  Use `currentColor` for fill or stroke.

### Modifying Site Config

1.  Edit `data/site.json` for static values.
2.  Edit `lib/config.ts` for dynamic logic or computed values.

### Working with Dates

- Use the configured dayjs instance: `import { dayjs } from '@/lib/dayjs'`.

## Performance Optimization

### Rendering Strategy

- **Static Generation (SSG)**: Article pages pre-generated at build time
- **Incremental Static Regeneration (ISR)**: RSS feed with 1-hour cache
- **Server Components**: Most components server-rendered (reduces JavaScript)
- **Client Components**: Only interactive components (theme toggle, image zoom)

### Caching

- **HTML Cache**: LRU cache for 500 Markdown processing results
- **Build-time Pre-generation**: OG images fully generated at build (`force-static`)
- **CDN Cache**: RSS feed and static assets

### Network Optimization

```typescript
// Preconnect to critical domains
<link rel="preconnect" href="https://i.loli.net" />
<link rel="dns-prefetch" href="https://i.loli.net" />
```

### Image Optimization

- Use Next.js `Image` component with `priority` for above-the-fold images
- Responsive images with `sizes` attribute
- Lazy loading for below-the-fold images

## Smart Recommendations Algorithm

Multi-dimensional weighted scoring (`lib/posts.ts`):

```typescript
// 1. Tag Similarity (40%) - Jaccard similarity coefficient
// 2. Time Freshness (30%) - Decays to 0 over 1 year
// 3. Time Proximity (20%) - Decays to 0 over 1 year difference
// 4. Deterministic Random (10%) - Pseudo-random based on slug

const totalScore =
  tagSimilarity * 0.4 + freshnessScore * 0.3 + proximityScore * 0.2 + randomScore * 0.1
```

**Key Features:**

- Jaccard coefficient for tag set comparison
- Exponential time decay (365-day half-life)
- Deterministic randomness (same slug = same recommendations)

## Hydration Safety

When using client components with external state (theme, etc.), prevent hydration mismatches:

```typescript
'use client'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export function ClientComponent() {
  // Returns false on server, true on client
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,   // Client
    () => false,  // Server
  )

  if (!mounted) return null  // Avoid hydration mismatch

  return <div>{/* Interactive content */}</div>
}
```

## Copilot Specific Instructions

- **Refactoring**: When refactoring, ensure backward compatibility where possible or update all usages.
- **Edits**: Use `replace_string_in_file` for precise edits. Avoid `insert_edit_into_file` unless necessary.
- **Context**: Always check `lib/config.ts` and `data/` before hardcoding values.
- **Response**: Keep responses concise and focused on the task.
- **Performance**: Consider caching, SSG, and component boundaries (Server vs Client)
- **Typography**: Follow Pangu rules for Chinese/English spacing
