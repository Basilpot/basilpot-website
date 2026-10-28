import type { APIRoute } from "astro"

const paths = [
  "/",
  "/about/",
  "/clients/",
  "/contact/",
  "/ecommerce/",
  "/media-and-marketing/",
  "/quotes/",
  "/services/",
  "/travel/",
]

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
      .map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`)
      .join("\n")}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  )
