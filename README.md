# Tax Center Web

Tax Center Gunadarma web application built with Next.js (App Router), focused on content pages, public information, and SEO-friendly architecture.

## Overview

This project has been refactored to follow a cleaner structure:

- `app/**/page.tsx` is intentionally thin (route entry only).
- Page UI/logic lives in `components/main/**`.
- Reusable shared components live in `components/common/**`.
- Repeated logic/helpers are centralized in `lib/**`, `hooks/**`, and `data/**`.
- SEO metadata is standardized via `createPageMetadata()` in `src/lib/seo.ts`.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Zod + React Hook Form

## Project Structure

```text
src/
  app/
    layout.tsx
    robots.ts
    sitemap.ts
    (user)/
      ...routes
  components/
    common/                # shared/reusable components (navbar, footer, etc.)
    main/                  # page-level components grouped by route/feature
    ui/                    # base UI primitives
  hooks/                   # reusable API/query hooks
  lib/                     # utilities, api client, SEO helpers
  data/                    # static datasets
  providers/               # global providers
  styles/
public/
  assets/
```

## Naming & Architecture Conventions

- File names use **kebab-case**.
- Route files (`app/**/page.tsx`) should:
  - import one page component (usually `PageView`),
  - define metadata (`metadata` or `generateMetadata`),
  - return the imported component.
- New page components should be placed under `src/components/main/...`.
- Shared/reusable components should be placed under `src/components/common/...`.
- Keep client-only logic scoped to the smallest necessary component.

## SEO Setup

### 1) Global SEO helper

- File: `src/lib/seo.ts`
- Main utility: `createPageMetadata(...)`
- Includes:
  - canonical URL,
  - Open Graph,
  - Twitter cards,
  - robots (optional per-page),
  - keyword composition.

### 2) Root metadata

- File: `src/app/layout.tsx`
- Defines global defaults:
  - `metadataBase`,
  - site title template,
  - global Open Graph/Twitter,
  - default robots,
  - viewport.

### 3) Per-page metadata

- Static pages use:
  - `export const metadata = createPageMetadata(...)`
- Dynamic pages (`[id]`) use:
  - `export async function generateMetadata(...)`

### 4) Technical SEO files

- `src/app/robots.ts` -> generates `/robots.txt`
- `src/app/sitemap.ts` -> generates `/sitemap.xml`

### 5) OG image

Current placeholder OG image:

- `DEFAULT_OG_IMAGE = "/assets/images/header.jpeg"`

Replace this later with a dedicated OG asset (1200x630 recommended).

## Environment Variables

Set these in `.env.local` / Vercel environment variables:

- `NEXT_PUBLIC_SITE_URL`  
  Base canonical URL used by SEO helpers (example: `https://your-domain.com`).

## Scripts

Status: **on hold for now**.  
We will finalize script conventions later when the VPS workflow is introduced.

## Deployment

Current deployment target: **Vercel**.  
Detailed VPS deployment notes are intentionally postponed and will be added when infrastructure migration starts.

## Notes for Contributors

- Keep changes aligned with existing route/component separation.
- Do not put large page logic directly in `app/**/page.tsx`.
- Prefer updating SEO metadata whenever adding new routes.
