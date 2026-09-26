import { Menu, X } from "lucide-react"

import { products } from "../data/products"

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  const link = (label: string, href: string) => (
    <a href={href} aria-current={currentPath === href ? "page" : undefined}>
      {label}
    </a>
  )

  return (
    <header className="global-header">
      <a href="/" aria-label="Basilpot home" className="global-logo">
        <img src="/basilpot-logo.svg" alt="" width={473} height={96} />
      </a>
      <details className="global-menu">
        <summary>
          <Menu
            className="menu-open-icon"
            aria-hidden="true"
            size={24}
            strokeWidth={2}
          />
          <X
            className="menu-close-icon"
            aria-hidden="true"
            size={24}
            strokeWidth={2}
          />
          <span className="sr-only">Navigation menu</span>
        </summary>
        <nav aria-label="Site navigation" className="global-menu-panel">
          {link("Home", "/")}
          {link("Clients", "/clients")}
          {link("Services", "/services")}
          {products.map((product) => (
            <a
              key={product.url}
              href={product.url}
              target="_blank"
              rel="noreferrer"
            >
              {product.name}
            </a>
          ))}
          {link("Travel", "/travel")}
          {link("Ecommerce", "/ecommerce")}
          {link("Products", "/products")}
          {link("Media & marketing", "/media-and-marketing")}
          {link("About", "/about")}
          {link("Contact", "/contact")}
        </nav>
      </details>
    </header>
  )
}
