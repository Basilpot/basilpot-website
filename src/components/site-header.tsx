const links = [
  ["Home", "/"],
  ["Clients", "/clients"],
  ["Services", "/services"],
  ["Travel", "/travel"],
  ["Ecommerce", "/ecommerce"],
  ["Media & marketing", "/media-and-marketing"],
  ["About", "/about"],
  ["Quotes", "/quotes"],
  ["Contact", "/contact"],
] as const

export function SiteHeader() {
  return (
    <header className="global-header">
      <a href="/" aria-label="Basilpot home" className="global-logo">
        <img src="/basilpot-logo.svg" alt="" width={473} height={96} />
      </a>
    </header>
  )
}

export function SiteNavigation({ currentPath }: { currentPath?: string }) {
  return (
    <nav aria-label="Site navigation" className="site-navigation">
      {links.map(([label, href]) => (
        <a
          key={href}
          href={href}
          aria-current={currentPath === href ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

export function SiteFooter({
  currentPath,
  className = "site-footer",
}: {
  currentPath?: string
  className?: string
}) {
  return (
    <footer className={className}>
      <SiteNavigation currentPath={currentPath} />
      <div className="footer-contact">
        <p>© {new Date().getFullYear()} Basilpot</p>
        <p>seed@basilpot.com</p>
      </div>
    </footer>
  )
}
