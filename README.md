# Basilpot

Basilpot is a web design and development studio in Nepal. This repository contains the public Basilpot website, built with Astro and React.

The site explains Basilpot's services, shows client work, links to Basilpot products, and gives prospective clients a way to start a project.

## What is here

- Service pages for business, travel, ecommerce, migration, maintenance, media, and marketing work
- Client portfolio covering travel, wellness, healthcare, adventure, and nonprofit projects
- Contact enquiry form that prepares an email in the visitor's mail app
- Product links for Launch Bunch, TravelFast, Tasche, Reviewpot, Fullbleed, and LINKS
- Static SEO assets: canonical metadata, Open Graph cards, JSON-LD, `robots.txt`, and `sitemap.xml`

## Stack

- Astro 7 with static output
- React 19 components with Astro integration
- TypeScript
- Tailwind CSS 4 through Vite
- Turborepo for workspace scripts
- Lucide React for icons

## Requirements

- Node.js 22.12 or newer
- Bun 1.2.19, as declared in `package.json`

## Run locally

```bash
git clone https://github.com/Basilpot/basilpot-website.git
cd basilpot
bun install
cd apps/web
bun run dev
```

Open `http://localhost:4321`.

## Commands

Run workspace checks from the repository root:

```bash
bun run build
bun run typecheck
bun run lint
bun run format
```

Run the web app directly from `apps/web`:

```bash
bun run dev
bun run build
bun run preview
```

The production build writes static files to `apps/web/dist`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Studio overview and product links |
| `/services` | Website design, development, migration, maintenance, media, and marketing |
| `/travel` | Travel website system and project pricing ranges |
| `/ecommerce` | Custom ecommerce website development and Tasche |
| `/clients` | Client portfolio |
| `/media-and-marketing` | Selected brand work |
| `/about` | Team and studio information |
| `/contact` | Project enquiry form |

`/work` redirects to `/clients`. `/travel/pricing` redirects to `/travel`.

## SEO

`apps/web/src/layouts/main.astro` owns shared page metadata. Each page supplies a unique title and description. The layout emits canonical URLs, robots directives, Open Graph tags, Twitter cards, and JSON-LD.

The homepage emits `Organization` and `WebSite` structured data. Service pages emit `Service` data. The site also publishes `/robots.txt` and `/sitemap.xml` from source routes.

If the production domain changes, update `site` in `apps/web/astro.config.mjs` and the sitemap and canonical URLs will follow it.

## Project layout

```text
apps/web/
├── public/         # images, logo, favicon, and social card
├── src/components/ # shared Astro and React components
├── src/data/       # client and product content
├── src/layouts/    # document shell and metadata
├── src/pages/      # public routes and generated SEO files
└── src/styles/     # site styles
packages/ui/        # shared UI package
```

## Contributing

Keep page content in `src/pages` or `src/data`, reuse shared components, and keep browser-only code at React leaves. Before opening a pull request, run `bun run build`, `bun run typecheck`, and `bun run lint`.

## License

This repository does not currently include a license file. All rights remain with Basilpot; ask before reusing code, content, or assets.
