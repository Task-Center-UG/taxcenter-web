# Tax Center Web

Public-facing website for Tax Center Gunadarma. This repository is used for the main site, public information pages, publications, galleries, tax education content, and other SEO-oriented pages that are accessible to visitors.

## Overview

This project uses Next.js App Router with a fairly strict separation between routes and page implementations. Route files under `app/**/page.tsx` are kept thin, while page UI and logic live in `src/components/main/**`. Shared pieces such as the navbar, footer, accordion components, and common UI primitives live in `src/components/common/**` and `src/components/ui/**`.

A few important notes about the current setup:

- SEO metadata is centralized in `src/lib/seo.ts`
- `robots.txt` and `sitemap.xml` are generated from the app
- the main OG image now uses `public/og_image.png`
- several API and media-related paths still point to the staging environment

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Axios
- React Hook Form + Zod

## Project Structure

```text
src/
  app/
    layout.tsx
    robots.ts
    sitemap.ts
    (user)/
  components/
    common/
    main/
    ui/
  data/
  hooks/
  lib/
  providers/
  styles/
public/
  assets/
  og_image.png
```

Project conventions used here:

- keep route files thin
- place new page-level components in `src/components/main/**`
- place reusable components in `src/components/common/**`
- move reusable utilities out of components and into `src/lib/**` when possible

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run a production build locally:

```bash
npm run build
npm run start
```

## Environment Variable

The main environment variable currently used by this app is:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It is used for:

- canonical URLs
- Open Graph URLs
- Twitter card metadata
- `metadataBase` in Next.js

If it is not set, the SEO helper falls back to the default URL defined in code. Before deploying to a real server, make sure this value matches the active domain.

## API and Media Notes

This website has not fully moved away from staging services yet. Several API and media paths still point to the staging API domain, so when production endpoints are ready, these areas should be reviewed first:

- `src/lib/axios.ts`
- `src/lib/media-url.ts`
- components that still define `API_BASE_URL` inline
- `next.config.ts` for `images.remotePatterns`

If remote images fail to load in production, this is usually where the issue is.

## SEO and Metadata

The main SEO helper lives in `src/lib/seo.ts`.

It currently handles:

- title and description
- canonical URL
- Open Graph
- Twitter cards
- optional robots settings per page
- a shared base keyword set

Root metadata is defined in `src/app/layout.tsx`, and page-level metadata should ideally use `createPageMetadata(...)`.

The main OG image for the website is:

```text
public/og_image.png
```

## Deployment

This repository is now set up for VPS deployment on Hostinger using Docker and GitHub Actions, not Vercel.

Deployment-related files:

- `Dockerfile`
- `docker-compose.prod.yml`
- `.github/workflows/docker-deploy.yml`

The image is built in GitHub Actions, pushed to GHCR, and then pulled by the VPS before restarting the container.

On the server, the app runs with:

- deploy directory: `/opt/taxcenter-web`
- host port: `127.0.0.1:3000`

That means public traffic should still go through Nginx as a reverse proxy.

## GitHub Actions Secrets

This repo expects the following secrets:

- `VPS_HOST`
- `VPS_PORT`
- `VPS_USER`
- `VPS_SSH_KEY`
- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

## VPS Preparation

Run this once on the server:

```bash
sudo mkdir -p /opt/taxcenter-web
sudo chown -R <deploy-user>:<deploy-user> /opt/taxcenter-web
```

Also make sure:

- the deploy user can log in over SSH
- the deploy user can run Docker
- Nginx is available once the public domain is connected

## Post-Deploy Checks

On the VPS:

```bash
cd /opt/taxcenter-web
docker compose -f docker-compose.prod.yml ps
docker logs taxcenter-web --tail 100
curl http://127.0.0.1:3000
```

If the container is `Up` and `curl` returns HTML, the app is running correctly.

## Domain and Reverse Proxy

Once the domain points to the VPS, Nginx should proxy requests to:

```text
http://127.0.0.1:3000
```

SSL can be added afterward with Certbot.

## Notes for the Team

- avoid placing large page logic directly in `app/**/page.tsx`
- when adding a new page, review its metadata at the same time
- if the domain changes, update `NEXT_PUBLIC_SITE_URL`
- if the API moves from staging to production, review media URL helpers and image host configuration
