# GitHub Copilot Instructions

You are an expert AI programming assistant working on a Next.js 16 + React 19 + Tailwind CSS v4 blog project.

## Core Principles

1.  **Modernity First**: Use modern browser features and the latest Web standards.
2.  **Performance**: Prioritize performance with hybrid rendering (Static Generation + Dynamic API).
3.  **Content-Centric**: Focus on content presentation and writing experience.
4.  **Simplicity**: Keep code clean, readable, and maintainable.

## Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Library**: React 19 (Server Components + React Compiler)
-   **Styling**: Tailwind CSS v4 (CSS-first config, OKLCH colors)
-   **Language**: TypeScript 5.9+
-   **Content**: Markdown (`.md` files)
-   **Package Manager**: pnpm 10.22.0+
-   **Utilities**: dayjs (Time manipulation)

## Design System

-   **Style**: Flat design, minimalist.
-   **Color Palette**: Strict Black/White/Gray scale for UI.
    -   Avoid shadows (`box-shadow: none`).
    -   Use borders and background colors for separation.
-   **Typography**: System fonts stack with optimized reading experience.
-   **Shapes**: Small border radius (2px - 6px).
    -   `xs`: 2px
    -   `sm`: 4px
    -   `md`: 6px

## Code Style & Conventions

### File Naming
-   **Components**: Must use `kebab-case` (e.g., `theme-toggle.tsx`, `about-intro.tsx`).
-   **Pages**: Follow Next.js App Router conventions (`page.tsx`, `layout.tsx`).

### TypeScript
-   Use strict type checking.
-   Prefer interfaces for object definitions.
-   Avoid `any` type.

### Formatting (Prettier)
-   Semi: `false`
-   Single Quote: `true`
-   Trailing Comma: `all`
-   Tab Width: `2`
-   Print Width: `100`

### Chinese Typography (Pangu)
-   **Punctuation**: Use Chinese punctuation for Chinese text (`，。！？；：「」【】`).
-   **Spacing**: Add a space between Chinese and English/Numbers (e.g., `使用 React 开发`, `距今 100 天`).

### Imports
-   Use absolute imports with `@/` alias (e.g., `import { siteConfig } from '@/lib/config'`).
-   Group imports: Built-in -> External -> Internal.

## Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `components/`: React components (kebab-case).
-   `lib/`: Utility functions and configurations.
    -   `lib/config.ts`: Site configuration (loads from `data/site.json`).
    -   `lib/data.ts`: Static data exports (loads from `data/*.json`).
-   `data/`: Static JSON data files (site config, pages metadata, etc.).
-   `posts/`: Markdown content organized by year.

## Data Management

-   **Static Data**: All static data (site config, author info, links) should be stored in `data/*.json`.
-   **Access**: Access data via `lib/config.ts` or `lib/data.ts`.
-   **Avoid Hardcoding**: Do not hardcode strings like URLs, author names, or site titles in components. Use `siteConfig` or relevant data exports instead.

## Common Tasks

### Adding New Components
1.  Create file in `components/` using `kebab-case`.
2.  Use `'use client'` only if interactivity is needed.
3.  Export as named export.

### Modifying Site Config
1.  Edit `data/site.json` for static values.
2.  Edit `lib/config.ts` for dynamic logic or computed values.

### Working with Dates
-   Use the configured dayjs instance: `import { dayjs } from '@/lib/dayjs'`.

## Copilot Specific Instructions

-   **Refactoring**: When refactoring, ensure backward compatibility where possible or update all usages.
-   **Edits**: Use `replace_string_in_file` for precise edits. Avoid `insert_edit_into_file` unless necessary.
-   **Context**: Always check `lib/config.ts` and `data/` before hardcoding values.
-   **Response**: Keep responses concise and focused on the task.
